"use client"
import { Button } from "@/components/ui/button";
import { useGetBucketInfo } from "@/lib/api/hooks/bucket";
import toast from "react-hot-toast";

// Type definition for bucket
interface Bucket {
  id: number;
  name: string;
  length: number;
}

export default function Home() {
  const { data, isLoading, isError, error } = useGetBucketInfo();

  const calculateFullness = (length: number, maxEmpty: number = 12) => {
    const fullness = ((maxEmpty - length) / maxEmpty) * 100;
    return Math.max(0, Math.min(100, fullness));
  };

  // Get color based on fullness percentage
  const getFullnessColor = (percentage: number) => {
    if (percentage >= 80) return "bg-red-500";
    if (percentage >= 60) return "bg-orange-500";
    if (percentage >= 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Get text color for percentage display
  const getTextColor = (percentage: number) => {
    if (percentage >= 50) return "text-white";
    return "text-gray-800";
  };

  // Get status text
  const getStatus = (percentage: number) => {
    if (percentage >= 90) return "Critical - Needs Emptying!";
    if (percentage >= 75) return "Nearly Full";
    if (percentage >= 50) return "Half Full";
    if (percentage >= 25) return "Quarter Full";
    return "Empty";
  };

  // Get icon for waste type
  const getWasteIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "organic":
        return "🍃";
      case "plastic":
        return "♻️";
      case "metal":
        return "🔩";
      case "paper":
        return "📄";
      case "glass":
        return "🍶";
      default:
        return "🗑️";
    }
  };

  if (isLoading) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center bg-linear-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading bin status...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center bg-linear-to-br from-red-50 to-red-100">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">Error Loading Data</h2>
          <p className="text-red-600 mb-4">
            {error?.message || "Unable to fetch bin information"}
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  let buckets = null;

  if (data?.json?.data) {
    buckets = data.json.data;
  } else if (data?.data?.data) {
    buckets = data.data.data;
  } else if (data?.data) {
    buckets = data.data;
  }

  console.log("Extracted buckets:", buckets);

  if (!buckets || !Array.isArray(buckets)) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-2">No bin data available</p>
          <p className="text-sm text-gray-500">Check console for data structure</p>
        </div>
      </div>
    );
  }
  const criticalBins = buckets.filter((b: Bucket) => calculateFullness(b.length) >= 80);
  const warningBins = buckets.filter((b: Bucket) => {
    const f = calculateFullness(b.length);
    return f >= 50 && f < 80;
  });
  const okBins = buckets.filter((b: Bucket) => calculateFullness(b.length) < 50);

  return (
    <div className="flex flex-col w-full min-h-screen items-center p-4 sm:p-8 bg-linear-to-br from-blue-50 to-green-50">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">
            Automatic Waste Segregation System
          </h1>
          <p className="text-lg text-gray-600">
            Real-time monitoring of waste bins
          </p>
        </div>

        {/* Alert Banner for Critical Bins */}
        {criticalBins.length > 0 && (
          <div className="mb-6 bg-red-100 border-l-4 border-red-500 p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <span className="text-3xl mr-3">🚨</span>
              <div>
                <p className="font-bold text-red-800">Urgent Action Required!</p>
                <p className="text-red-700">
                  {criticalBins.length} bin{criticalBins.length > 1 ? 's' : ''} {criticalBins.length > 1 ? 'are' : 'is'} critically full: {criticalBins.map(b => b.name).join(', ')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bins Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {buckets.map((bucket: Bucket) => {
            const fullness = calculateFullness(bucket.length);
            const color = getFullnessColor(fullness);
            const status = getStatus(fullness);
            const textColor = getTextColor(fullness);
            const icon = getWasteIcon(bucket.name);

            return (
              <div
                key={bucket.id}
                className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center transition-all duration-300 transform ${fullness >= 80 ? 'ring-2 ring-red-500 animate-pulse' : ''
                  }`}
              >
                {/* Icon and Name */}
                <div className="text-4xl mb-2">{icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{bucket.name}</h3>

                {/* Bin Visualization */}
                <div className="relative w-32 h-48 border-4 border-gray-800 rounded-b-xl mb-4 bg-linear-to-b from-gray-50 to-gray-100 overflow-hidden shadow-inner">
                  {/* Fill Level */}
                  <div
                    className={`absolute bottom-0 w-full transition-all duration-700 ease-out ${color}`}
                    style={{ height: `${fullness}%` }}
                  >
                    <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent"></div>
                  </div>

                  {/* Percentage Display */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`text-3xl font-bold ${textColor} drop-shadow-lg`}>
                      {fullness.toFixed(0)}%
                    </div>
                  </div>

                  {/* Warning Icon for Critical Bins */}
                  {fullness >= 80 && (
                    <div className="absolute top-2 right-2 text-2xl animate-bounce">
                      ⚠️
                    </div>
                  )}
                </div>

                {/* Status Info */}
                <div className="text-center space-y-2 w-full">
                  <div className={`text-sm font-semibold px-3 py-1 rounded-full ${fullness >= 80 ? 'bg-red-100 text-red-800' :
                      fullness >= 60 ? 'bg-orange-100 text-orange-800' :
                        fullness >= 40 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                    }`}>
                    {status}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Dashboard */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>📊</span> System Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-xl border-2 border-green-200">
              <div className="text-4xl font-bold text-green-600 mb-1">
                {okBins.length}
              </div>
              <p className="text-sm font-medium text-green-700">Bins OK</p>
              <p className="text-xs text-green-600 mt-1">&lt; 50% full</p>
            </div>

            <div className="text-center p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200">
              <div className="text-4xl font-bold text-yellow-600 mb-1">
                {warningBins.length}
              </div>
              <p className="text-sm font-medium text-yellow-700">Bins Warning</p>
              <p className="text-xs text-yellow-600 mt-1">50-80% full</p>
            </div>

            <div className="text-center p-4 bg-red-50 rounded-xl border-2 border-red-200">
              <div className="text-4xl font-bold text-red-600 mb-1">
                {criticalBins.length}
              </div>
              <p className="text-sm font-medium text-red-700">Bins Critical</p>
              <p className="text-xs text-red-600 mt-1">&gt; 80% full</p>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
              <div className="text-4xl font-bold text-blue-600 mb-1">
                {buckets.length}
              </div>
              <p className="text-sm font-medium text-blue-700">Total Bins</p>
              <p className="text-xs text-blue-600 mt-1">Active monitoring</p>
            </div>
          </div>
        </div>

        {/* Overall System Status */}
        <div className={`text-center p-4 rounded-xl ${criticalBins.length > 0 ? 'bg-red-100 border-2 border-red-300' :
            warningBins.length > 0 ? 'bg-yellow-100 border-2 border-yellow-300' :
              'bg-green-100 border-2 border-green-300'
          }`}>
          <p className={`font-semibold ${criticalBins.length > 0 ? 'text-red-800' :
              warningBins.length > 0 ? 'text-yellow-800' :
                'text-green-800'
            }`}>
            System Status: {
              criticalBins.length > 0 ? '🔴 Critical - Immediate Action Required' :
                warningBins.length > 0 ? '🟡 Warning - Monitor Closely' :
                  '🟢 All Systems Normal'
            }
          </p>
        </div>
      </div>
    </div>
  );
}