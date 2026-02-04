import { Router, type Router as ExpressRouter } from "express";
import { getStatusOfBucket, patchLength } from "../controller/bucket.controller.js";

const router: ExpressRouter = Router();

router.route("/edit-volume").patch(patchLength)
router.route("/all-bucket").get(getStatusOfBucket)


export default router