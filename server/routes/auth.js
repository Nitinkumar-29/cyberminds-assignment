const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const fetchUser = require("../middleware/fetchUser");

// create account
router.post(
  "/createAccount",
  [
    body("name", "Enter a valid name").isString(),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 8 characters long").isLength({
      min: 8,
      max: 20,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;

      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(403)
          .json({ error: "User already exists with this email" });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10); // Use lower salt rounds for performance
      const secPass = await bcrypt.hash(password, salt);

      // Create the new user
      user = await User.create({
        name,
        email,
        password: secPass,
      });

      // Create the JWT payload
      const data = {
        user: {
          id: user.id,
          name: user.name,
        },
      };

      // Sign JWT and send the response
      const authToken = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(200).json({ authToken, success: true });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// login functionality
router.post(
  "/login",
  [
    body("email", "Enter your email").isEmail(),
    body("password", "Enter your password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      //   check whether the user exists or not
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json("Invalid credentials");
      }
      //   compare password
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res.status(401).json("Invalid credentials");
      }

      const data = {
        user: {
          id: user.id,
          name: user.name,
        },
      };

      //   create token
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      res.status(200).json({ authToken, success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  }
);

// get user data
router.get("/getUser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    // check user
    const user = await User.findById(userId).select("+password");
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
});

module.exports = router;
