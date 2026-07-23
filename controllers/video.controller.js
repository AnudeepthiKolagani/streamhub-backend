import fs from "node:fs/promises";
import { createReadStream } from "node:fs";
const videoPath = "./videos/sample-3.mp4";

const CHUNK_SIZE = 10 ** 6;

export const streamVideo = async (req, res) => {

    // Read file stats to know the file size
    const stat = await fs.stat(videoPath);
    const videoSize = stat.size;

    // Read range from request headers
    const range = req.headers.range;
    if(!range){
        res.status(400).send("Requires Range header")
    }

    // Calculate start and end bytes to stream
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE - 1, videoSize - 1);

    const contentLength = end - start + 1;

    // Set the headers required by browser
    const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4"
    }
    res.writeHead(206, headers)


    // Use createReadStream to only read particular mentioned bytes instead of entire video file
    const videoStream = createReadStream(videoPath, { start, end });

    videoStream.pipe(res)
};
