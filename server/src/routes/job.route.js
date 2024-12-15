import { Router } from "express";
import protectAuth from "../middlewares/auth.middleware.js";
import {
  createJob,
  deleteJob,
  getJob,
  getJobs,
  updateJob,
} from "../controllers/job.controller.js";
const jobRouter = Router();
jobRouter.route("/create").post(protectAuth, createJob);
jobRouter.get("/", protectAuth, getJobs);
jobRouter.route("/:id").get(protectAuth, getJob);
jobRouter.route("/:id").put(protectAuth, updateJob);
jobRouter.route("/:id").delete(protectAuth, deleteJob);

export default jobRouter;
