import { User } from "../../schemas/user-schema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SALT_ROUND = 10;
const JWT_SECRET = "testing";

// ТОХИРГОО: Аюулгүй байдлын үүднээс JWT токен руу нууц үг биш, хэрэглэгчийн ID болон email-ийг дамжуулдаг болгов.
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
      return response.status(404).json({ message: "user not found" });
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      return response.status(401).json({ message: "Password didn't match" });
    }
    const token = signAuthToken(user);
    response
      .status(200)
      .json({
        message: "user found",
        user: publicUser(user),
        token: signAuthToken(token),
      });
  } catch (err) {
    response.status(500).json({ message: "Internal Server Error", error: err });
  }
};

// 2. БҮРТГҮҮЛЭХ ХЭСЭГ (Шинэ талбаруудыг нэмсэн)
export const signUpController = async (request, response) => {
  try {
    // Frontend-ээс ирж буй шинэ талбаруудыг хүлээн авч байна
    const { name, email, password, phone, address } = request.body;

    // Бүх талбар бөглөгдсөн эсэхийг шалгах код
    if (!name || !email || !password || !phone || !address) {
      return response.status(400).json({ message: "All fields are required" });
    }

    // Имэйл өмнө нь бүртгэгдсэн эсэхийг давхар шалгах (Скемийн unique: true-г дэмжих)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(400).json({ message: "Email already registered" });
    }

    // Нууц үгийг кодлох
    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

    // Өгөгдлийн санд бүх мэдээллийг хадгалах
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
      token: signAuthToken(token),
    });
  } catch (err) {
    response.status(500).json({ message: "Internal Server Error", error: err });
  }
};
