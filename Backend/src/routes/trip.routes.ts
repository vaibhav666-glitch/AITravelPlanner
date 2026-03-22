import express from "express";
import {
  createTrip,
  getTrips,
  getTripById,
  updateTripById
} from "../controllers/trip.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", verifyToken, createTrip);
router.get("/", verifyToken, getTrips);
router.get("/:id", verifyToken, getTripById);
router.put("/:id", verifyToken, updateTripById);

export default router;