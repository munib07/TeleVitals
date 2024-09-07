const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const { specs, swaggerUi } = require("./libs/swagger.js");

//dotenv config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//sample endpoint
app.get("/api", (req, res) => {
  // Send a response to the client
  res.send("Hello, TeleVitals!");
});

// Health check endpoint
app.get("/api/healthcheck", (req, res) => {
  // Send a response to the client
  res.send("TeleVitals seems healthy");
});

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//middlewares
app.use(bodyParser.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));
app.use("/api/v1/vital", require("./routes/vitalRoutes"));

// Serve static assets if in production
app.use(express.static("./frontend/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
});

//port
const port = process.env.PORT || 1137;
//listen port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;