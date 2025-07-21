import express from "express";
import dotenv from "dotenv";
import { ErrorHandler, NotFound } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import path from "path";
import { fileURLToPath } from "url"; // For __dirname compatibility in ES modules
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";

const port = process.env.PORT || 3000;
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "https://your-frontend-domain.com", credentials: true }));
app.use("/api/users", userRoutes);

// Handle production environment
if (process.env.NODE_ENV === "production") {
  const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Resolve __dirname
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Server is ready"));
}

app.use(NotFound);
app.use(ErrorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
