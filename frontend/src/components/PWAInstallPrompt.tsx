"use client"
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function PWAInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);

    useEffect(() => {
        // Register service worker
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                        console.log('SW registered:', registration);
                    })
                    .catch((error) => {
                        console.log('SW registration failed:', error);
                    });
            });
        }

        // Listen for install prompt
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstallPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        console.log(`User response: ${outcome}`);
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
    };

    const handleDismiss = () => {
        setShowInstallPrompt(false);
    };

    if (!showInstallPrompt) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white rounded-lg shadow-2xl p-4 border-2 border-blue-500 z-50 animate-slide-up">
            <div className="flex items-start gap-3">
                <div className="text-3xl">📱</div>
                <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-1">Install App</h3>
                    <p className="text-sm text-gray-600 mb-3">
                        Add Waste Monitor to your home screen for quick access and offline use!
                    </p>
                    <div className="flex gap-2">
                        <Button
                            onClick={handleInstallClick}
                            className="bg-blue-600 hover:bg-blue-700 flex-1"
                        >
                            Install
                        </Button>
                        <Button
                            onClick={handleDismiss}
                            variant="outline"
                            className="flex-1"
                        >
                            Not Now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}