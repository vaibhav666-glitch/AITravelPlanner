import express from "express";
import {
    regenerateDay
} from "../controllers/ai.controller"
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", verifyToken, regenerateDay);


export default router;