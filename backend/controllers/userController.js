import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";
const TOKEN_EXPIRES = "24h";

// TOKEN
const createToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES });
};

// REGISTER FUNCTION
export async function registerUser(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid Email" });
  }
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be Atleast 8 characters.",
    });
  }

  try {
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name: username,
      email,
      password: hashedPassword,
    });

    const token = createToken(user._id);
    res.status(201).json({
      success: true,
      message: "Account Created Successfully.",
      token,
      user: {
        id: user._id,
        username: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration Error", error);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
}

// LOGIN FUNCTION
export async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or Password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or Password",
      });
    }

    const token = createToken(user._id);
    res.status(200).json({
      success: true,
      message: "Login Successfull.",
      token,
      user: {
        id: user._id,
        username: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error", error);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
}
