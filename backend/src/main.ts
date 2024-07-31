import express, { Request, Response, NextFunction } from "express";
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// CORS middleware
import cors from "cors";
app.use(
  cors({
    origin: "http://localhost:8080", // Allow only this origin
    optionsSuccessStatus: 200,
  }),
);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Request headers:", req.headers);
  next();
});

// Import routes
const indexRouter = require("./routes/index");

// Use routes
app.use("/", indexRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
