import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator"

export const register = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.send({ errors: result.array() });
  }


  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required"
      })
    }
    const hasedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      password: hasedPassword
    });
    return res.status(201).json({
      success: true,
      message: "User Created Successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Creating User"
    })
  }
}

export const login = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array()[0].msg });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'These fields are required',
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const id = user._id;
      const payload = { id };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1hr' });


      return res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000,
      }).status(200).json({
        success: true,
        message: 'User logged in successfully',
        token,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Password does not match',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while logging in the user',
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
};
