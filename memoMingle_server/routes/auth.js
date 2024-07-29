const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchuser');

const JWT_SECRET = 'Shaunisacunnigo#$%ne';

// Route 1: Create user POST "/api/auth/createUser" No login required
router.post(
  "/createUser",
  [
    body("username", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password is too short").isLength({ min: 6 }),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      // If user with email already exists then
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success, message: "Sorry! User already exists" });
      }

      // Secure password hash using bcrypt
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      const newUser = await User.create({
        name: req.body.username, // Ensure the field matches the client-side field name
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: newUser.id
        }
      }

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
  }
);


// Route 2: Authenticate user POST "/api/auth/login" No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {

    // If there are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        let success = false;
        return res.status(400).json({ success, error: 'Please enter valid credentials' });
      }

      const passwordCmp = await bcrypt.compare(password, user.password);
      if (!passwordCmp) {
        success = false;
        return res.status(400).json({ success, error: 'Please enter valid credentials' });
      }

      const data = {
        user: {
          id: user.id
        }
      }

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
  }
);

// Route 3: Get Logged in User Details POST "/api/auth/getUser" login required
router.post(
  "/getUser", fetchUser, async (req, res) => {
    try {
      const userId = req.user.id;
      let user = await User.findById(userId).select('-password').lean(); // Convert Mongoose document to plain JavaScript object
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
  }
);

module.exports = router;
