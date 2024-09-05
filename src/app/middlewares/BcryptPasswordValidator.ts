// src/strategies/passwordValidator.ts
export interface PasswordValidator {
  validate(password: string, hashedPassword: string): Promise<boolean>;
}

// src/strategies/bcryptPasswordValidator.ts
import bcrypt from "bcrypt";

export class BcryptPasswordValidator implements PasswordValidator {
  async validate(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
