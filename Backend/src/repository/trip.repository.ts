import { Trip } from "../models/trip.model";

export const createTrip=async(data:any)=>{
 
    return await Trip.create(data);
}

export const getTripByUser=async(userId:string)=>{
    return await Trip.find({userId});
}

export const getTripById=async(tripId:string,userId:string)=>{
    return await Trip.findOne({_id:tripId,userId})
}

export const updateTripById = async (
  data: any,
  userId: string,
  tripId: string
) => {
    console.log("am data paji",data)
  return await Trip.findOneAndUpdate(
    { _id: tripId, userId },
    {
      $set: {
        itinerary: data.itinerary,
      },
    },
    { new: true }
  );
};