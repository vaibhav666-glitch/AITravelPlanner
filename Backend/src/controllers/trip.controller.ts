import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import * as tripService from "../services/trip.service";

// CREATE TRIP
export const createTrip = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;

    const trip = await tripService.createTripService({
      ...req.body,
      userId,
    });

    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: "Error creating trip" });
  }
};

// GET ALL TRIPS (USER-SPECIFIC)
export const getTrips = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;

    const trips = await tripService.getTripsService(userId);

    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trips" });
  }
};

// GET SINGLE TRIP
export const getTripById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const trip = await tripService.getTripByIdService(id, userId);

    res.json(trip);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateTripById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const trip = await tripService.updateTripByIdService({...req.body},userId,id );

    res.json(trip);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};