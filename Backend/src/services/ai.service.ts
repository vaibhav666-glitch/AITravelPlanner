import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

// ✅ define schema (same as mongoose)
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

// ✅ attach structured output
const structuredModel = model.withStructuredOutput(schema);

export const generateItinerary = async (data: any) => {
  try {
    const { destination, days, budgetType, interests } = data;

    const prompt = `
Generate a travel itinerary.

Destination: ${destination}
Days: ${days}
Budget: ${budgetType}
Interests: ${interests.join(", ")}
`;

    console.log("🚀 calling AI...");

    // ✅ NO parsing needed
    const result = await structuredModel.invoke(prompt);

    console.log("✅ STRUCTURED RESULT:", result);

    return result;
  } catch (error: any) {
    console.error("❌ ERROR:", error);
    throw error;
  }
};