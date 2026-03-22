import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import * as aiService from "../services/ai.service"
export const regenerateDay=async(req:AuthRequest,res:Response) =>{
    try{
        console.log("hello",req.body)
      const activity=await aiService.regenerateDayService(req.body)
     res.status(201).json(activity);
    }
    catch(err){
         res.status(500).json({ message: "Error regenerating day" });
    }
}