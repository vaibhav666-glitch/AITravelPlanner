import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
import { z } from "zod";
import { getWeatherForecast } from "./weather.service";

dotenv.config();


const itinerarySchema = z.object({
  day: z.number(),
  activities: z.array(z.string()),
});

const schema = z.object({
  itinerary: z.array(itinerarySchema),
  budgetBreakdown: z.object({
    flights: z.number(),
    accommodation: z.number(),
    food: z.number(),
    activities: z.number(),
    total: z.number(),
  }),
  hotels: z.array(
    z.object({
      name: z.string(),
      type: z.string(),
      priceRange: z.string(),
    })
  ),
});

const model = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0.7,
  apiKey: process.env.GROQ_API_KEY,
});


const structuredModel = model.withStructuredOutput(schema);


export const generateItinerary = async (data: any) => {
  try {
    const { destination, days, budgetType, interests } = data;

 
    const weather = await getWeatherForecast(destination, days);
console.log("am weather",weather)
    const weatherText = weather
      .map(
        (w) =>
          `Day ${w.day}: ${w.weather}, ${w.temp}°C `
      )
      .join("\n");

    const prompt = `
You are an expert AI travel planner.

Generate a complete itinerary.

Destination: ${destination}
Days: ${days}
Budget: ${budgetType}
Interests: ${interests.join(", ")}

---

### Weather Forecast:
${weatherText}

---

### Rules:
- Plan activities according to weather
- Rain → indoor (museum, cafes, shopping)
- Sunny → outdoor (walking, sightseeing)
- Suggest BEST transport:
  - Rain → metro / cab
  - Sunny → walking
- Keep realistic travel flow

---

### Output:
Return structured JSON with itinerary, budget, hotels
`;

    const result = await structuredModel.invoke(prompt);

     return {
      ...result,
      weather, // 👈 IMPORTANT
    };
  } catch (error: any) {
    throw error;
  }
};

const itineraryModel = model.withStructuredOutput(itinerarySchema);

export const regenerateDayService = async (data: any) => {
  try {
    const {
      destination,
      days,
      budgetType,
      interests,
      specificDay, 
      itinerary,
      customInstruction,
    } = data;

    const currentDay = itinerary.find(
      (d: any) => d.day === specificDay
    );

    if (!currentDay) {
      throw new Error("Invalid day selected");
    }

   
    const otherActivities = itinerary
      .filter((d: any) => d.day !== specificDay)
      .flatMap((d: any) => d.activities);

    const prompt = `
You are a professional travel planner AI.

Your task is to regenerate ONLY ONE DAY of an itinerary.

---

### Trip Details:
- Destination: ${destination}
- Total Days: ${days}
- Budget: ${budgetType}
- Interests: ${interests.join(", ")}

---

### Current Day (${specificDay}):
${currentDay.activities
  .map((a: string, i: number) => `${i + 1}. ${a}`)
  .join("\n")}

---

### Activities already planned on OTHER DAYS (DO NOT REPEAT):
${otherActivities.map((a: string) => `- ${a}`).join("\n")}

---

### User Instruction:
${customInstruction || "No special instruction"}

---

### Rules:
- Keep the same day number: ${specificDay}
- Generate 3 to 5 activities
- DO NOT repeat activities from other days
- DO NOT repeat same places
- Make it realistic (time, flow, travel distance)
- Maintain variety (food, experience, sightseeing)
- Improve quality over current plan

---

### Output:
Return ONLY valid JSON:
{
  "day": ${specificDay},
  "activities": ["activity1", "activity2", "activity3"]
}
`;

    const result = await itineraryModel.invoke([
      {
        role: "system",
        content:
          "You generate structured travel itinerary JSON. No explanations.",
      },
      {
        role: "user",
        content: prompt,
      },
    ]);

    return result;
  } catch (error: any) {
    console.error("Regenerate Error:", error);
    throw error;
  }
};