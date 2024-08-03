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
const SERVER_URL = process.env.CORS_ORIGIN;
const app = express();

// Middleware to parse JSON
app.use(express.json());

const allowedOrigins = [CORS_ORIGIN, SERVER_URL];

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allowed: boolean) => void,
  ) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
};
// CORS middleware
app.use(cors(corsOptions));

// Google session middleware
app.use(
  session({
    secret: getEnvVar("ANY_TABLE_SESSION_SECRET"), // Use a separate strong secret
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false, // TODO Switch to https and set to true
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", auth);

app.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

// Use routes
app.use("/", router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
