"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the 'express' module
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./app/routes/userRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const ErrorHandler_1 = __importDefault(require("./app/middlewares/ErrorHandler"));
const authRoutes_1 = __importDefault(require("./app/routes/authRoutes"));
// Create an Express application
const app = (0, express_1.default)();
// Enable CORS
var corsOptions = {
    origin: "http://localhost:3000",
};
// Middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)(corsOptions));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express_1.default.urlencoded({ extended: true }));
// Define a route for the root path ('/')
app.get("/api", (req, res) => {
    // Send a response to the client
    res.send("Hello, TypeScript + Node.js + Express!");
});
app.use("/api/user", userRoutes_1.default);
app.use("/api/auth", authRoutes_1.default);
app.use(express_1.static("./frontend/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
});
// Error-handling middleware should be registered after all other middleware and routes
app.use(ErrorHandler_1.default);
const mongoUri = process.env.MONGODBURI || "";
mongoose_1.default
    .connect(mongoUri)
    .then((res) => {
    console.log(`Connected to MongoDB ${res.connection.name}`);
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
    .catch((err) => {
    console.log(
    // eslint-disable-next-line comma-dangle
    `Initial Distribution API Database connection error occurred - ${err}`);
});
