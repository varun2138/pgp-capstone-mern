import mongoose from "mongoose";

const jobSchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "company name is required"],
    },
    jobPosition: {
      type: String,
      required: [true, "position is required"],
    },
    salary: {
      type: Number,
      required: [true, "pay-check is required"],
    },
    jobType: {
      type: String,
      required: [true, "job type is required"],
      enum: ["full-time", "part-time", "contract", "internship", "freelance"],
    },

    location: {
      type: String,
      required: [true, "location is required"],
    },
    work: {
      type: String,
      required: true,
      enum: ["office", "remote"],
    },
    description: {
      type: String,
    },
    companyInfo: {
      type: String,
    },
    logo: {
      type: String,
    },
    skills: {
      type: [String],
      required: [true, "skills are required"],
      validate: {
        validator: function (val) {
          return val && val.length > 0;
        },
        message: "At least one skill is required",
      },
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
