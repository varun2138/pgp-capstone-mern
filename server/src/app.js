import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

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

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// routes declaration
import userRouter from "./routes/user.route.js";
import jobRouter from "./routes/job.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/jobs", jobRouter);

export default app;
