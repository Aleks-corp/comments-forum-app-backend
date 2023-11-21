import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { Err } from "../types/error.type";

import commentsRouter from "../routes/comments.route";

const app = express();
app.use(cors());

// Express configuration
app.set("port", process.env.PORT || 4200);
app.use(express.json());
app.use("/comments", commentsRouter);

app.use((_: Request, res: Response) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error: Err, _: Request, res: Response, next: NextFunction): void => {
  if (!error.status) {
    error.status = 500;
  }
  const { status, message } = error;
  res.status(status).json({ message });
});

export default app;
