const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const { swaggerUi, swaggerSpecs } = require("./swagger/swagger");
const connectDB = require("./config/db"); // MongoDB connection
const logger = require("./config/logger"); // Logger
const { requestLogger, ipLogger } = require("./middlewares/requestLogger"); // Middleware
const http = require("http");
const dotenv = require("dotenv");

dotenv.config();

const assistantRoute = require("./routes/assistantRoute");

const app = express();
const PORT = process.env.PORT || 5001;
const server = http.createServer(app);

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors()); // Enable preflight requests for all routes

app.use(express.json({ limit: "100mb" })); // Adjust the size as needed
app.use(express.urlencoded({ extended: false, limit: "100mb" }));

connectDB();

// Request logging middleware
app.use(requestLogger);
app.use(ipLogger);

// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes

app.use("/api/assistants", assistantRoute);

// Start the server
server.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});

// Log unhandled promise rejections
process.on("unhandledRejection", (error) => {
  logger.error(`Unhandled Rejection: ${error.message}`);
});

// Log uncaught exceptionssocket.io
process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
});
