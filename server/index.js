import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewares.js";
import routes from "./routes/index.js";
import { dbConnection } from "./utils/index.js";

dotenv.config();

dbConnection();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: process.env.NODE_ENV === "production"
      ? process.env.PROD_FRONTEND_URL  // Use production frontend URL
      : process.env.CORS_ORIGIN,       // Use local development frontend URL
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,  // Allow credentials like cookies or authorization headers
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

// Root Route to Display Message on Server
app.get("/", (req, res) => {
  res.send(`<h1 style="text-align: center; color: green;">🚀 Server is Running on Port ${PORT}</h1>`);
});

app.use("/api", routes);

app.use(routeNotFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
