const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Jobs = require("../models/Jobs");
const fetchUser = require("../middleware/fetchUser");
const User = require("../models/User");
const upload = require("../utils/upload");
require("dotenv").config();

// Create a job
router.post(
  "/createJob",
  upload.single("photo"),
  fetchUser,
  [
    body("jobTitle", "Enter job title").isString(),
    body("companyName", "Enter company name").isString(),
    body("Location", "Enter job location").isString(),
    body("jobType", "Enter job type").isString(),
    body("jobDescription", "Enter job description").isString(),
    body("salaryRange.min", "Enter minimum salary").isNumeric(), // Changed to `isNumeric()` to validate numbers
    body("salaryRange.max", "Enter maximum salary").isNumeric(), // Changed to `isNumeric()` to validate numbers
    body(
      "applicationDeadline",
      "Enter a valid application deadline"
    ).isISO8601(), // Changed to `isISO8601()` for date validation
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json("Unauthorized access!");
      }
      const {
        jobTitle,
        companyName,
        Location,
        jobType,
        salaryRange,
        applicationDeadline,
        jobDescription,
      } = req.body;

      const companyPhoto = req.file ? req.file.path : undefined;

      // Create a new job entry
      const job = new Jobs({
        user: userId,
        jobTitle,
        companyName,
        Location,
        jobType,
        salaryRange,
        jobDescription,
        applicationDeadline,
        photo: companyPhoto,
      });

      // Save the job to the database
      await job.save();

      // Respond with the created job
      res.status(201).json({ job, success: true });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// delete a job
router.delete("/deleteJob/:id", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const jobId = req.params.id;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(403).json("Unauthorized access");
    }

    // Check if the job exists and is created by this user
    const job = await Jobs.findById(jobId);
    if (!job) {
      return res.status(404).json("this job doesn't exist");
    }

    // Ensure that the job belongs to the current user
    if (job.user.toString() !== userId) {
      return res.status(403).json("Unauthorized access");
    }

    // Delete the job
    await job.deleteOne();
    res.json({ message: "Job deleted!", jobId });
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
});

// fetch all jobs
router.get("/fetchJobs", async (req, res) => {
  try {
    const jobs = await Jobs.find();
    res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
});

module.exports = router;
