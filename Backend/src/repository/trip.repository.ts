import { Trip } from "../models/trip.model";

export const createTrip=async(data:any)=>{
   console.log(
  "HOTEL SCHEMA TYPE:",
  Trip.schema.path("hotels").instance
);
console.log(
  "HOTEL SCHEMA:",
  Trip.schema.path("hotels")
);
    return await Trip.create(data);
}

export const getTripByUser=async(userId:string)=>{
    return await Trip.find({userId});
}

export const getTripById=async(tripId:string,userId:string)=>{
    return await Trip.findOne({_id:tripId,userId})
}