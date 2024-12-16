import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
import dotenv from "dotenv";
dotenv.config();
app.use(cookieParser());
app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(bodyParser.json());

// routes declaration
import userRouter from "./routes/user.route.js";
import jobRouter from "./routes/job.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/jobs", jobRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
console.log("path", path.resolve(__dirname));

export default app;
