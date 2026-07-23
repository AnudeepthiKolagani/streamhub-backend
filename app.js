import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to stream hub",
  });
});

export default app
