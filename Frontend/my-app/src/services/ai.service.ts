import axiosInstance from "@/lib/axios";


export const regenerateDayService = async (data: any) => {
    try{
    const res = await axiosInstance.post(`/ai`, data);
  return res.data;
    }
  
  catch(err){
    console.error(err)
  }
};