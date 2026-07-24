import express from "express";
import videoRoutes from "./routes/video.route.js";

const app = express()

// Video routes
app.use("/api/v1/video", videoRoutes);

export default app;
