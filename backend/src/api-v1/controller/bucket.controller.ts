import type { Request, Response } from "express"
import type { PostLength } from "../../types/bucket.js"
import { postLengthService } from "../../services/bucket.service.js"

export const patchLength = async (req: Request<{}, {}, PostLength>, res: Response) => {
    const { name, length } = req.body
    try {
        await postLengthService(name, length);
        res.json({ message: "Volume edited successfully" });
    } catch (error) {
        console.error("Error updating volume:", error);
        res.status(500).json({ message: "Failed to edit volume" });
    }
}