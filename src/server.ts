// Import the 'express' module
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import userRoutes from "./app/routes/userRoutes";
import mongoose, { ConnectOptions } from "mongoose";
import errorHandler from "./app/middlewares/ErrorHandler";
import authRoutes from "./app/routes/authRoutes";
import path from "path";

// Create an Express application
const app = express();

// Enable CORS
var corsOptions = {
  origin: "http://localhost:3000",
};

// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Define a route for the root path ('/')
app.get("/api", (req, res) => {
  // Send a response to the client
  res.send("Hello, TypeScript + Node.js + Express!");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use(express.static("./frontend/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
});
// Error-handling middleware should be registered after all other middleware and routes
app.use(errorHandler);

const mongoUri = process.env.MONGODBURI || "";

mongoose
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
      `Initial Distribution API Database connection error occurred - ${err}`
    );
  });
