import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ||
    (typeof window !== "undefined"
        ? `${window.location.origin}/api`
        : "http://localhost:8000/api");

if (typeof window !== "undefined" && !process.env.NEXT_PUBLIC_API_URL) {
    console.warn(
        "NEXT_PUBLIC_API_URL is not defined — using window.location.origin + '/api' as fallback. Restart dev server if you expect NEXT_PUBLIC_API_URL to be injected."
    );
}

export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type":"application/json",
    }
})