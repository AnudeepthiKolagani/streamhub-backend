import express from "express";
import { streamVideo } from "../controllers/video.controller.js";

const router = express();

router.get("/:id/stream", streamVideo);

export default router;
