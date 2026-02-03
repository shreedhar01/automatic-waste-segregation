import { Router, type Router as ExpressRouter } from "express";
import { patchLength } from "../controller/bucket.controller.js";

const router: ExpressRouter = Router();

router.route("/edit-volume").patch(patchLength)


export default router