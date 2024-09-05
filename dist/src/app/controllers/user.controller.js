"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.register = void 0;
const express_validator_1 = require("express-validator");
//import jwt from "jsonwebtoken";
const user_1 = __importDefault(require("../models/user"));
class AbstractHandler {
    constructor() {
        this.nextHandler = null;
    }
    setNext(handler) {
        this.nextHandler = handler;
        return handler;
    }
    handle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.nextHandler) {
                return this.nextHandler.handle(req, res, next);
            }
        });
    }
}
class ValidationHandler extends AbstractHandler {
    handle(req, res, next) {
        const _super = Object.create(null, {
            handle: { get: () => super.handle }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                next(errors.array());
            }
            return _super.handle.call(this, req, res, next);
        });
    }
}
class ExistingUserHandler extends AbstractHandler {
    handle(req, res, next) {
        const _super = Object.create(null, {
            handle: { get: () => super.handle }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email } = req.body;
            const existingUser = yield user_1.default.findOne({ username });
            const existingEmail = yield user_1.default.findOne({ email });
            if (existingUser || existingEmail) {
                return res
                    .status(400)
                    .json({ message: "Username or Email already in use" });
            }
            return _super.handle.call(this, req, res, next);
        });
    }
}
class CreateUserHandler extends AbstractHandler {
    handle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, role } = req.body;
            const user = new user_1.default({
                username,
                email,
                password,
                role,
            });
            yield user.save();
            return res.status(201).json({ message: "User created successfully" });
        });
    }
}
/**
 * Handle User Registration
 * @param { Request }  req
 * @param {Response} res
 * return {Promise<Response>}
 */
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validationHandler = new ValidationHandler();
        const existingUserHandler = new ExistingUserHandler();
        const createUserHandler = new CreateUserHandler();
        validationHandler.setNext(existingUserHandler).setNext(createUserHandler);
        yield validationHandler.handle(req, res, next);
    }
    catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
});
exports.register = register;
// create a profile controller with name getUserProfile
const getUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const userProfile = yield user_1.default.findOne({ username: username }).select("-password");
        if (!userProfile) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(userProfile);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserProfile = getUserProfile;
