// src/strategies/tokenGenerator.ts
export interface TokenGenerator {
  generate(
    payload: object,
    secretKey: string,
    refreshSecretKey: string,
    options: object
  ): string[];
}

// src/strategies/jwtTokenGenerator.ts
import jwt from "jsonwebtoken";
//import { TokenGenerator } from "./tokenGenerator";

export class JwtTokenGenerator implements TokenGenerator {
  generate(
    payload: object,
    secretKey: string,
    refreshSecretKey: string,
    options: { authExpiresIn: string; refreshExpiresIn: string }
  ): string[] {
    return [
      jwt.sign(payload, secretKey, {
        expiresIn: options.authExpiresIn || "1m",
      }),
      jwt.sign(payload, refreshSecretKey, {
        expiresIn: options.refreshExpiresIn || "1m",
      }),
    ];
  }
}
