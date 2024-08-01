import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import auth from "./auth";
import router from "./routes";

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware to parse JSON
app.use(express.json());

// CORS middleware
app.use(
  cors({
    origin: "http://localhost:8080", // TODO: update before deployment
    optionsSuccessStatus: 200,
  }),
);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Request headers:", req.headers);
  next();
});

// Use routes
app.use("/", router);

// Google OAuth
app.use(auth);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
