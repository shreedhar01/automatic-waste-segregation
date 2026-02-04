import type { Request, Response } from "express"
import type { PostLength } from "../../types/bucket.js"
import { getStatusOfBucketService, postLengthService } from "../../services/bucket.service.js"

export const patchLength = async (req: Request<{}, {}, PostLength>, res: Response) => {
    const { name, length } = req.body
    try {
        const isUpdated = await postLengthService(name, length);
        if (!isUpdated) {
            res.status(500).json({ message: "Failed to edit volume" });
        }
        res.status(202).json({ message: "Volume edited successfully" });
    } catch (error) {
        // console.error("Error updating volume:", error);
        res.status(500).json({ message: "Failed to edit volume" });
    }
}

export const getStatusOfBucket = async (_: Request, res: Response) => {
    try {
        const isBucketGet = await getStatusOfBucketService()
        if (isBucketGet.length === 0) {
            res.status(500).json({ message: "Failed to get bucket status" });
        }
        res.status(200).json({ message: "Successfully get bucket status", data: isBucketGet });
    } catch (error) {
        res.status(500).json({ message: "Failed to get bucket status" });
    }

}