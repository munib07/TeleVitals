"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ValidationHandler_1 = __importDefault(require("../middlewares/ValidationHandler"));
const AuthenticationMiddleware_1 = __importDefault(require("../middlewares/AuthenticationMiddleware"));
const router = (0, express_1.Router)();
//controller
const user_controller_1 = require("../controllers/user.controller");
const express_validator_1 = require("express-validator");
router.post("/register", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Email is invalid"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    ValidationHandler_1.default,
], user_controller_1.register);
router.post("/profile", AuthenticationMiddleware_1.default, user_controller_1.getUserProfile);
exports.default = router;
