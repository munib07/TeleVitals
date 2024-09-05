"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    if (err.message.startsWith("Authentication failed")) {
        return res.status(401).json({ message: err.message });
    }
    if (err.message === "Validation failed") {
        return res.status(400).json({ message: err.message, errors: err.errors });
    }
    console.error(err.stack);
    res.status(500).json({ message: err.message || "An unknown error occurred" });
};
exports.default = errorHandler;
