import type { Request, Response } from "express"
import type { PostLength } from "../../types/bucket.js"
import { postLengthService } from "../../services/bucket.service.js"

export const patchLength = async (req: Request<{}, {}, PostLength>, res: Response) => {
    const { name, length } = req.body
    try {
        const isUpdated = await postLengthService(name, length);
        if (!isUpdated) {
            res.status(500).json({ message: "Failed to edit volume" });
        }
        res.status(202).json({ message: "Volume edited successfully" });
    } catch (error) {
        console.error("Error updating volume:", error);
        res.status(500).json({ message: "Failed to edit volume" });
    }
}