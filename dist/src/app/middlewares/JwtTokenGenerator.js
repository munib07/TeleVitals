"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtTokenGenerator = void 0;
// src/strategies/jwtTokenGenerator.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//import { TokenGenerator } from "./tokenGenerator";
class JwtTokenGenerator {
    generate(payload, secretKey, refreshSecretKey, options) {
        return [
            jsonwebtoken_1.default.sign(payload, secretKey, {
                expiresIn: options.authExpiresIn || "1m",
            }),
            jsonwebtoken_1.default.sign(payload, refreshSecretKey, {
                expiresIn: options.refreshExpiresIn || "1m",
            }),
        ];
    }
}
exports.JwtTokenGenerator = JwtTokenGenerator;
