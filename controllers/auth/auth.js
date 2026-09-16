import { User } from "../../schemas/user-schema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SALT_ROUND = 10;

const JWT_SECRET = "testing";

const signAuthToken = (user) => {
  console.log(user);
  return jwt.sign({ email: user.email, password: user.password }, JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const loginController = async (request, response) => {
  try {
    const { email, password } = request.body;
    console.log(email, password);
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
      .json({ message: "user found", user: user, token: token });
  } catch (err) {
    response.status(500).json({ message: "Internal Server Error", error: err });
  }
};

export const signUpController = async (request, response) => {
  try {
    const { email, password } = request.body;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
    const user = await User.create({ email, password: hashedPassword });
    const token = signAuthToken(user);

    response
      .status(201)
      .json({ message: "user created", user: user, token: token });
  } catch (err) {
    response.status(500).json({ message: "Internal Server Error", error: err });
  }
};
