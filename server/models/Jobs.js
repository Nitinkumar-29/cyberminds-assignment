const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobSchema = new Schema({
  photo: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  jobTitle: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  salaryRange: {
    min: {
      type: String,
      required: true,
    },
    max: {
      type: String,
      required: true,
    },
  },
  applicationDeadline: {
    type: Date,
  },
  jobCreatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Jobs = mongoose.model("Jobs", jobSchema);
module.exports = Jobs;
