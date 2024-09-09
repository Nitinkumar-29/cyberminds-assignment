const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db");
require("dotenv").config(); // Make sure to load environment variables

connectToMongo();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Fix for express.urlencoded

app.use(cors());

app.get("/", (req, res) => {
  // Fix for req, res
  return res.json("Hello World!");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/jobs", require("./routes/jobs"));

app.listen(process.env.PORT, () => {
  // Fix for listen
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
