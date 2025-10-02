// routes/adminRoutes.js
import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

// Get all users (admin only)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude password
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
