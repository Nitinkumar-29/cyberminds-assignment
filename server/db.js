require("dotenv").config();
const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URL; // Should now be defined

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Database connected successfully!");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connectToMongo;
