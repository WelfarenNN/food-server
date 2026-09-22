import { User } from "../../schemas/user-schema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SALT_ROUND = 10;
const JWT_SECRET = process.env.JWT_SECRET;

const signAuthToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

const publicUser = (user) => ({ _id: user._id, email: user.email });
// 1. ЛОГИН ХЭСЭГ (Хэвээрээ үлдсэн)
export const loginController = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return response.status(401).json({ message: "Wrong email or username" });
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      return response.status(401).json({ message: "Incorrect password" });
    }
    const token = signAuthToken(user);
    response.status(200).json({
      message: "user found",
      user: publicUser(user),
      token: token,
    });
  } catch (err) {
    response.status(500).json({ message: "Internal Server Error", error: err });
  }
};

export const signUpController = async (request, response) => {
  try {
    const { name, email, password, phone, address, role } = request.body;

    if (!name || !email || !password || !phone || !address) {
      return response.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

    const user = await User.create({
      name,
      email,
      role,
      password: hashedPassword,
      phone,
      address,
    });
    const token = signAuthToken(user);

    response.status(201).json({
      message: "user created",
      user: publicUser(user),
      token: token,
    });
  } catch (err) {
    console.error("Error in signUpController:", err);
    response.status(500).json({ message: "Internal Server Error", error: err });
  }
};
