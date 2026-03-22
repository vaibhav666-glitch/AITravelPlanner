
import axiosInstance from "@/lib/axios";


export const createTrip = async (data: any) => {
    try{
    const res = await axiosInstance.post("/trips", data);
  return res.data;
    }
  
  catch(err){
    console.error(err)
  }
};

export const updateTrip = async (data: any,id:string) => {
    try{
    const res = await axiosInstance.put(`/trips/${id}`, data);
  return res.data;
    }
  
  catch(err){
    console.error(err)
  }
};


export const getTrips = async () => {
      try{
 const res = await axiosInstance.get("/trips");
  return res.data;
    }
  
  catch(err){
    console.error(err)
  }
 
};


export const getTripById = async (id: string) => {
      try{
    const res = await axiosInstance.get(`/trips/${id}`);
  return res.data;
    }
  
  catch(err){
    console.error(err)
  }
  
};