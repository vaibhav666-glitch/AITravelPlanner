import * as tripRepo from "../repository/trip.repository"

import { generateItinerary } from "./ai.service";

export const createTripService = async (data: any) => {
  try{  
  const aiData = await generateItinerary(data);
  
  const tripData = {
    ...data,
    itinerary: aiData.itinerary,
    budgetBreakdown: aiData.budgetBreakdown,
    hotels: aiData.hotels,
    weather:aiData.weather
  };

  return await tripRepo.createTrip(tripData);
}
catch(err){
    console.error("saving to db error",err)
    throw new Error("Saving to DB Error")
}
};
export const getTripsService = async (userId: string) => {
  return await tripRepo.getTripByUser(userId);
};

export const getTripByIdService = async (
  tripId: string,
  userId: string
) => {
  const trip = await tripRepo.getTripById(tripId, userId);

  if (!trip) {
    throw new Error("Trip not found or unauthorized");
  }

  return trip;
};

export const updateTripByIdService = async (
  data:any,
  userId: string,
  tripId: string,
 
) => {
  const trip = await tripRepo.updateTripById(data, userId,tripId);

  if (!trip) {
    throw new Error("Trip not found or unauthorized");
  }

  return trip;
};