// src/controllers/authRoutes.ts
import { Request, Response } from "express";
import { BcryptPasswordValidator } from "../middlewares/BcryptPasswordValidator";
import { JwtTokenGenerator } from "../middlewares/JwtTokenGenerator";
import User from "../models/user";
import "dotenv/config";

const secretKey = process.env.JWT_SECRET || "";
const refreshSecretKey = process.env.REFRESH_JWT_SECRET || "";
const passwordValidator = new BcryptPasswordValidator();
const tokenGenerator = new JwtTokenGenerator();

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      res.status(401).json({ message: "Authentication Failed" });
      return;
    }

    const isPasswordValid = await passwordValidator.validate(
      password,
      user.password
    );

    if (!isPasswordValid) {
      res.status(401).json({ message: "Authentication failed" });
      return;
    }

    const token: string[] = tokenGenerator.generate(
      { userId: user._id },
      secretKey,
      refreshSecretKey,
      {
        authExpiresIn: "3m",
        refreshExpiresIn: "30m",
      }
    );
    res
      .cookie("refreshToken", token[1], {
        httpOnly: true,
        sameSite: "strict",
      })
      .header("Authorization", token[0]);

    res.status(200).json({ Status: "Authentication successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
