import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDb } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

// initialize dotenv processing
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json()); // middleware to parse JSON bodies: req.body
app.use(rateLimiter);

// simple custom middleware example
// app.use((req, _, next) => {
//   try {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
//   } catch (error) {
//     console.log("Error in getAllNotes controller: ", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

app.use("/api/notes", notesRoutes);

// connect to database first before starting server
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
