import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
//import jwt from "jsonwebtoken";
import User from "../models/user";
import { IUser } from "../interfaces/user";

interface Handler {
  setNext(handler: Handler): Handler;
  handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;
}

abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    if (this.nextHandler) {
      return this.nextHandler.handle(req, res, next);
    }
  }
}

class ValidationHandler extends AbstractHandler {
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(errors.array());
    }
    return super.handle(req, res, next);
  }
}

class ExistingUserHandler extends AbstractHandler {
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { username, email } = req.body;
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });
    if (existingUser || existingEmail) {
      return res
        .status(400)
        .json({ message: "Username or Email already in use" });
    }
    return super.handle(req, res, next);
  }
}

class CreateUserHandler extends AbstractHandler {
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { username, email, password, role } = req.body;
    const user = new User({
      username,
      email,
      password,
      role,
    });
    await user.save();
    return res.status(201).json({ message: "User created successfully" });
  }
}

/**
 * Handle User Registration
 * @param { Request }  req
 * @param {Response} res
 * return {Promise<Response>}
 */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validationHandler = new ValidationHandler();
    const existingUserHandler = new ExistingUserHandler();
    const createUserHandler = new CreateUserHandler();

    validationHandler.setNext(existingUserHandler).setNext(createUserHandler);

    await validationHandler.handle(req, res, next);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};

// create a profile controller with name getUserProfile
export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const username = req.body.username as IUser;
    const userProfile = await User.findOne({ username: username }).select(
      "-password"
    );

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(userProfile);
  } catch (error) {
    next(error);
  }
};
