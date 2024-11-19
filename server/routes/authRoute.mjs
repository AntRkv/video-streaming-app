import express from "express";
import auth from "../middleware/auth.mjs";
import User from "../models/User.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// @route:   GET /api/auth
// @desc:    Get user info if authenticated
// @access:  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ errors: [{ msg: "User not found" }] });
    }

    res.json(user);
  } catch (err) {
    console.error("Server Error:", err.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
});

// @route:   POST /api/auth/register
// @desc:    Register new user
// @access:  Public
router.post(
  "/register",
  [
    check("username", "Username is required").not().isEmpty(), 
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Проверяем, существует ли пользователь
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // Создаем нового пользователя
      user = new User({
        username, // Передаем username
        email,
        password: await bcrypt.hash(password, 10),
      });

      await user.save();

      // Генерируем JWT
      const payload = { user: { id: user.id } };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          res.status(201).json({ token });
        }
      );
    } catch (err) {
      console.error("Server Error:", err.message);
      res.status(500).json({ errors: [{ msg: "Server error" }] });
    }
  }
);


// @route:   POST /api/auth
// @desc:    Login user and return JWT
// @access:  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Generate JWT
      const payload = { user: { id: user.id } };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error("Server Error:", err.message);
      res.status(500).json({ errors: [{ msg: "Server error" }] });
    }
  }
);

// @route   DELETE /api/auth
// @desc    Delete user account
// @access  Private
router.delete("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ errors: [{ msg: "User not found" }] });
    }

    await user.deleteOne();
    res.json({ msg: "User account deleted successfully" });
  } catch (err) {
    console.error("Server Error:", err.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
});

export default router;
