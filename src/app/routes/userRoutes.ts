import { Router } from "express";
import validateRequest from "../middlewares/ValidationHandler";
import authenticate from "../middlewares/AuthenticationMiddleware";
const router = Router();

//controller
import { register, getUserProfile } from "../controllers/user.controller";
import { body } from "express-validator";

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Email is invalid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    validateRequest,
  ],
  register
);

router.post("/profile", authenticate, getUserProfile);

export default router;
