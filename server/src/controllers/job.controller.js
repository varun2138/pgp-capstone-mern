import Job from "../models/job.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const createJob = asyncHandler(async (req, res) => {
  const {
    companyName,
    jobPosition,
    salary,
    jobType,
    location,
    skills,
    work,
    description,
    companyInfo,
    logo,
  } = req.body;

  const user = req.user;
  console.log(user.id);
  const job = await Job.create({
    companyName,
    jobPosition,
    jobType,
    salary,
    location,
    skills,
    work,
    description,
    companyInfo,
    logo,
    user: user.id,
  });
  if (!job) {
    console.log("error while creating job");
    return res.status(500).json({ message: "server error" });
  }
  res.status(201).json({ job });
});
const getJobs = asyncHandler(async (req, res) => {
  console.log("authenticated user", req.user);
  const { limit, offset, salary, name, type, location, work, skills } =
    req.query;
  const query = {
    ...(salary && { salary: { $gte: salary, $lte: salary } }),
    ...(name && { companyName: { $regex: name, $options: "i" } }),
    ...(type && { jobType: type }),
    ...(location && { location: { $regex: location, $options: "i" } }),
    ...(work && { work }),
    ...(skills && {
      skills: { $in: skills.split(",").map((skill) => new RegExp(skill, "i")) },
    }),
  };

  const jobs = await Job.find(query)
    .skip(offset || 0)
    .limit(limit || 50);
  const count = await Job.countDocuments(query);
  if (jobs.length === 0) {
    return res.status(404).json({ message: "no jobs available" });
  }
  res.status(200).json({ jobs, count });
});

const getJob = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({ message: "job not found" });
  }
  res.status(200).json({ job });
});

const deleteJob = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  const userId = req.user.id;
  if (!job) {
    return res.status(404).json({ message: "job not found" });
  }
  if (userId !== job.user.toString()) {
    return res
      .status(401)
      .json({ message: "not authorized to delete this job" });
  }
  await Job.deleteOne({ _id: id });
  res.status(200).json({ message: "job deleted" });
});

const updateJob = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    companyName,
    jobPosition,
    salary,
    jobType,
    location,
    skills,
    work,
    description,
    companyInfo,
    logo,
  } = req.body;
  const job = await Job.findById(id);
  const userId = req.user.id;
  if (!job) {
    return res.status(404).json({ message: "job not found" });
  }
  if (userId !== job.user.toString()) {
    return res
      .status(401)
      .json({ message: "not authorized to delete this job" });
  }

  const updatedJob = await Job.findByIdAndUpdate(id, {
    companyName,
    jobPosition,
    salary,
    jobType,
    location,
    skills,
    work,
    description,
    companyInfo,
    logo,
  });
  if (!updatedJob) {
    console.log("error while updating job");
    return res.status(500).json({ message: "server error" });
  }
  res.status(200).json({ message: "Job updated" });
});

export { createJob, deleteJob, updateJob, getJob, getJobs };
