import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewaves.js";
import routes from "./routes/index.js";
import { dbConnection } from "./utils/index.js";

// Load environment variables
dotenv.config();

// Establish database connection
dbConnection();

// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 8800;

const app = express();

// Enable CORS with specific origins and credentials
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // Allowed origins
    methods: ["GET", "POST", "DELETE", "PUT"], // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, etc.)
  })
);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware for HTTP request logging in development mode
app.use(morgan("dev"));

// API routes
app.use("/api", routes);

// Middleware for handling undefined routes
app.use(routeNotFound);

// Middleware for global error handling
app.use(errorHandler);

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
