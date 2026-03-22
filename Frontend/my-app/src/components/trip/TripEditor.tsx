"use client";
import { regenerateDayService } from "@/services/ai.service";
import { updateTrip } from "@/services/trips.service";
import { useEffect, useState } from "react";

const TripEditor = ({ trip, setTrip }: any) => {
  const [activityInputs, setActivityInputs] = useState<any>({});
  const [instructions, setInstructions] = useState<any>({});
  const [loadingDay, setLoadingDay] = useState<number | null>(null);
  const [originalTrip, setOriginalTrip] = useState<any>(null);

  // ✅ Track original state
  useEffect(() => {
    setOriginalTrip(JSON.stringify(trip.itinerary));
  }, []);

  // ✅ Detect changes
  const isDirty =
    JSON.stringify(trip.itinerary) !== originalTrip;

  // ✅ Remove
  const removeActivity = (dayIndex: number, actIndex: number) => {
    const updated = {
      ...trip,
      itinerary: trip.itinerary.map((d: any, i: number) =>
        i === dayIndex
          ? {
              ...d,
              activities: d.activities.filter(
                (_: any, idx: number) => idx !== actIndex
              ),
            }
          : d
      ),
    };
    setTrip(updated);
  };

  // ✅ Add
  const addActivity = (dayIndex: number) => {
    const value = activityInputs[dayIndex];
    if (!value) return;

    const updated = {
      ...trip,
      itinerary: trip.itinerary.map((d: any, i: number) =>
        i === dayIndex
          ? { ...d, activities: [...d.activities, value] }
          : d
      ),
    };

    setTrip(updated);
    setActivityInputs({ ...activityInputs, [dayIndex]: "" });
  };

  // ✅ Regenerate
  const regenerateDay = async (day: number) => {
    try {
      setLoadingDay(day);

      const data = {
        destination: trip.destination,
        days: trip.days,
        budgetType: trip.budgetType,
        interests: trip.interests,
        specificDay: day,
        itinerary: trip.itinerary,
        customInstruction: instructions[day] || "",
      };

      const newDay = await regenerateDayService(data);

      const updated = {
        ...trip,
        itinerary: trip.itinerary.map((d: any) =>
          d.day === day ? newDay : d
        ),
      };

      setTrip(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDay(null);
    }
  };

  // ✅ Save
  const handleUpdateTrip = async () => {
    try {
      await updateTrip({itinerary:trip.itinerary}, trip._id);

      // reset dirty state
      setOriginalTrip(JSON.stringify(trip.itinerary));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center">
        ✈️ {trip.destination} Trip
      </h1>

      {/* Budget */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border shadow-sm">
        <h2 className="font-semibold mb-4 text-lg">💰 Budget Breakdown</h2>

        <div className="grid grid-cols-2 gap-3 text-sm">
          {Object.entries(trip.budgetBreakdown || {}).map(
            ([key, value]: any) =>
              key !== "total" && (
                <div key={key} className="flex justify-between">
                  <span className="capitalize">{key}</span>
                  <span className="font-medium">${value}</span>
                </div>
              )
          )}
        </div>

        <div className="mt-4 pt-3 border-t flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span className="text-blue-600">
            ${trip.budgetBreakdown?.total}
          </span>
        </div>
      </div>

      {/* Itinerary */}
      {trip.itinerary.map((day: any, dayIndex: number) => (
        <div
          key={day.day}
          className="p-6 rounded-2xl border shadow-md bg-white hover:shadow-lg transition"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Day {day.day}
            </h2>

            <button
              onClick={() => regenerateDay(day.day)}
              className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition"
            >
              {loadingDay === day.day
                ? "Regenerating..."
                : "Regenerate"}
            </button>
          </div>

          {/* Activities */}
          <ul className="space-y-2">
            {day.activities.map((act: string, i: number) => (
              <li
                key={i}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
              >
                <span>{act}</span>
                <button
                  onClick={() => removeActivity(dayIndex, i)}
                  className="text-red-500 hover:scale-110 transition"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>

          {/* Add */}
          <div className="flex gap-2 mt-4">
            <input
              value={activityInputs[dayIndex] || ""}
              onChange={(e) =>
                setActivityInputs({
                  ...activityInputs,
                  [dayIndex]: e.target.value,
                })
              }
              placeholder="Add new activity"
              className="border p-2 flex-1 rounded-lg"
            />
            <button
              onClick={() => addActivity(dayIndex)}
              className="bg-green-600 text-white px-4 rounded-lg"
            >
              Add
            </button>
          </div>

          {/* Instruction */}
          <input
            value={instructions[day.day] || ""}
            onChange={(e) =>
              setInstructions({
                ...instructions,
                [day.day]: e.target.value,
              })
            }
            placeholder="✨ e.g. more food places, less walking"
            className="border p-2 w-full rounded-lg mt-3"
          />
        </div>
      ))}

      {/* Hotels */}
      <div className="p-6 border rounded-2xl shadow-sm">
        <h2 className="font-semibold mb-3 text-lg">🏨 Hotels</h2>
        {trip.hotels.map((hotel: any, i: number) => (
          <div
            key={i}
            className="p-3 border rounded-lg mb-2 bg-gray-50"
          >
            <p className="font-medium">{hotel.name}</p>
            <p className="text-sm text-gray-500">
              {hotel.priceRange}
            </p>
          </div>
        ))}
      </div>

      {/* 🔥 Sticky Update Button */}
      {isDirty && (
        <div className="fixed bottom-5 right-5">
          <button
            onClick={handleUpdateTrip}
            className="bg-black text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition"
          >
            💾 Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default TripEditor;