// /services/auth.service.ts
import axiosInstance from "@/lib/axios";

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
    try{
  const res = await axiosInstance.post("/auth/login", data);
if(res?.data?.token)
  localStorage.setItem('token',res.data.token)
  return res.data;
    }
    catch(err){
        console.error(err)
    }
};

export const signupUser = async (data: {
  email: string;
  password: string;
}) => {
    try{
  const res = await axiosInstance.post("/auth/register", data);
   if(res?.data?.message=== "User created")
    await loginUser(data)
  return res.data;
  }
    catch(err){
        console.error(err)
    }
};