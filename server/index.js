import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewaves.js";
import routes from "./routes/index.js";
import { dbConnection } from "./utils/index.js";

// Load environment variables
dotenv.config();

// Establish database connection
dbConnection();

const PORT = process.env.PORT || 8800;
const app = express();

// CORS Configuration
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:3000", 
  "http://localhost:3001"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for parsing cookies
app.use(cookieParser());

// Logging Middleware
if (process.env.NODE_ENV === "production") {
  const logDirectory = path.join(__dirname, "logs");
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }
  const logStream = fs.createWriteStream(path.join(logDirectory, "access.log"), { flags: "a" });
  app.use(morgan("combined", { stream: logStream }));
} else {
  app.use(morgan("dev"));
}

// ✅ **Root Route for Displaying a Message on Browser**
app.get("/", (req, res) => {
  res.send(`<h1 style="text-align: center; color: blue;">🚀 Server is Running on Port ${PORT}</h1>`);
});

// API Routes
app.use("/api", routes);

// Middleware for handling undefined routes
app.use(routeNotFound);

// Middleware for global error handling
app.use(errorHandler);

// Start the server
const server = app.listen(PORT, () =>
  console.log(`🚀 Server is running on port ${PORT}`)
);

// Graceful Shutdown for Database Cleanup
process.on("SIGINT", async () => {
  console.log("👋 Shutting down server...");
  await dbConnection.close();
  server.close(() => console.log("🛑 Server closed successfully."));
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("🔴 SIGTERM received. Closing server...");
  await dbConnection.close();
  server.close(() => console.log("✅ Server shut down gracefully."));
  process.exit(0);
});
