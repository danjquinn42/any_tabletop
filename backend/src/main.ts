import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import auth from "./auth";
import router from "./routes";
import { getEnvVar } from "./util/util";

const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const app = express();

// Middleware to parse JSON
app.use(express.json());

// CORS middleware
app.use(
  cors({
    origin: CORS_ORIGIN,
    optionsSuccessStatus: 200,
  }),
);

// Google session middleware
app.use(
  session({
    secret: getEnvVar("ANY_TABLE_SESSION_SECRET"), // Use a separate strong secret
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", auth);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Request headers:", req.headers);
  next();
});

// Use routes
app.use("/", router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
