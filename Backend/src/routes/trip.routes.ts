import express from "express";
import {
  createTrip,
  getTrips,
  getTripById,
} from "../controllers/trip.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", verifyToken, createTrip);
router.get("/", verifyToken, getTrips);
router.get("/:id", verifyToken, getTripById);

export default router;