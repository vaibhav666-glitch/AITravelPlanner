import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// route
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running 🚀");
});

// server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});