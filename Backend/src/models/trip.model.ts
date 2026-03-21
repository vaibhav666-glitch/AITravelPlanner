import mongoose from "mongoose";

if (mongoose.models.Trip) {
  delete mongoose.models.Trip;
}
const itinerarySchema = new mongoose.Schema({
  day: Number,
  activities: [String],
});

const hotelSchema = new mongoose.Schema({
  name: String,
  type: String,
  priceRange: String,
});


const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    destination: String,
    days: Number,
    budgetType: {
      type: String,
      enum: ["Low", "Medium", "High"],
    },
    interests: [String],

    itinerary: [itinerarySchema],

    budgetBreakdown: {
      flights: Number,
      accommodation: Number,
      food: Number,
      activities: Number,
      total: Number,
    },

     hotels: [hotelSchema],
  },
  { timestamps: true }
);

export const Trip = mongoose.model("Trip", tripSchema);