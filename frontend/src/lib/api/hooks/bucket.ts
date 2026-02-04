import { useQuery } from "@tanstack/react-query";
import { api } from "../axios";

export function useGetBucketInfo() {
    return useQuery({
        queryKey: ["get-bucket-info"],
        queryFn: async () => {
            const { data } = await api.get("/v1/bucket/all-bucket")
            return data
        }
    })
}