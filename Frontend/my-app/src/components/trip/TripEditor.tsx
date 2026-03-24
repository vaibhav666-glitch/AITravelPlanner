"use client";
import { regenerateDayService } from "@/services/ai.service";
import { updateTrip } from "@/services/trips.service";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";

const TripEditor = ({ trip, setTrip }: any) => {
  const [activityInputs, setActivityInputs] = useState<any>({});
  const [instructions, setInstructions] = useState<any>({});
  const [loadingDay, setLoadingDay] = useState<number | null>(null);
  const [originalTrip, setOriginalTrip] = useState<any>(null);
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    setOriginalTrip(JSON.stringify(trip.itinerary));
  }, []);


  const isDirty =
    JSON.stringify(trip.itinerary) !== originalTrip;

  
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

  
  const handleUpdateTrip = async () => {
    try {
        setLoading(true)
      await updateTrip({itinerary:trip.itinerary}, trip._id);

      // reset dirty state
      setOriginalTrip(JSON.stringify(trip.itinerary));
    } catch (err) {
      console.error(err);
    }
    finally{
        setLoading(false)
    }
  };

  const formatPriceRange = (priceRange:string) => {
  if (!priceRange) return "N/A";

  const length = priceRange.length;

  switch (length) {
    case 1:
      return "Moderate";
    case 2:
      return "Expensive";
    case 3:
      return "Luxury";
    default:
      return priceRange;
  }
};
if(loading)
    return <Loader/>
  return (
    <div className="max-w-6xl mx-auto space-y-10 px-4">

  {/* Header */}
  <h1 className="text-4xl font-bold text-center text-white">
    ✈️ {trip.destination} Trip
  </h1>

  {/* Weather Overview Strip */}
  <div className="flex gap-3 overflow-x-auto pb-2">
    {trip.weather?.map((w: any) => (
      <div
        key={w.day}
        className="min-w-[120px] bg-white/90 backdrop-blur p-3 rounded-xl shadow text-center"
      >
        <p className="text-xs font-medium">Day {w.day}</p>
        <p className="text-lg font-bold">{w.temp}°C</p>
        <p className="text-xs text-gray-500">{w.weather}</p>
      </div>
    ))}
  </div>

  {/* Budget */}
  <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-xl">
    <h2 className="text-lg font-semibold mb-4">💰 Budget</h2>
    <div className="grid grid-cols-2 gap-4 text-sm">
      {Object.entries(trip.budgetBreakdown || {}).map(
        ([key, value]: any) =>
          key !== "total" && (
            <div key={key} className="flex justify-between">
              <span>{key}</span>
              <span>${value}</span>
            </div>
          )
      )}
    </div>

    <div className="mt-4 border-t pt-3 flex justify-between font-bold">
      <span>Total</span>
      <span>${trip.budgetBreakdown?.total}</span>
    </div>
  </div>

  {/* Itinerary */}
  {trip.itinerary.map((day: any, dayIndex: number) => {
    const weather = trip.weather?.find((w: any) => w.day === day.day);

    return (
      <div
        key={day.day}
        className="bg-white/95 backdrop-blur p-6 rounded-2xl shadow-xl border border-gray-200"
      >
        {/* Day Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">
              🌍 Day {day.day}
            </h2>

            {/* Weather */}
            {weather && (
              <p className="text-sm text-gray-500">
                {weather.date} • {weather.weather} • {weather.temp}°C
              </p>
            )}
          </div>

          <button
            onClick={() => regenerateDay(day.day)}
            className="bg-black text-white px-4 py-1 rounded-lg hover:scale-105 transition"
          >
            {loadingDay === day.day ? "..." : "⚡ Regenerate"}
          </button>
        </div>

        {/* Timeline Activities */}
        <div className="space-y-3">
          {day.activities.map((act: string, i: number) => (
            <div
              key={i}
              className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl"
            >
              <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>

              <div className="flex-1 flex justify-between">
                <span>{act}</span>

                <button
                  onClick={() => removeActivity(dayIndex, i)}
                  className="text-red-500 hover:scale-110"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Activity */}
        <div className="flex gap-2 mt-4">
          <input
            value={activityInputs[dayIndex] || ""}
            onChange={(e) =>
              setActivityInputs({
                ...activityInputs,
                [dayIndex]: e.target.value,
              })
            }
            placeholder="Add activity..."
            className="border p-2 flex-1 rounded-xl"
          />
          <button
            onClick={() => addActivity(dayIndex)}
            className="bg-green-600 text-white px-4 rounded-xl"
          >
            +
          </button>
        </div>

        {/* AI Instruction */}
        <input
          value={instructions[day.day] || ""}
          onChange={(e) =>
            setInstructions({
              ...instructions,
              [day.day]: e.target.value,
            })
          }
          placeholder="✨ e.g. more outdoor, less walking"
          className="border p-2 w-full rounded-xl mt-3"
        />
      </div>
    );
  })}

  {/* Hotels */}
  <div className="p-6 bg-white rounded-2xl shadow-xl">
    <h2 className="text-lg font-semibold mb-3">🏨 Stay</h2>
    {trip.hotels.map((hotel: any, i: number) => (
      <div
        key={i}
        className="p-3 border rounded-xl mb-2 flex justify-between"
      >
        <span>{hotel.name}</span>
        <span className="text-gray-500">{formatPriceRange(hotel.priceRange)}</span>
      </div>
    ))}
  </div>

  {/* Save Button */}
  {isDirty && (
    <div className="fixed bottom-6 right-6">
      <button
        onClick={handleUpdateTrip}
        className="bg-black text-white px-6 py-3 rounded-full shadow-xl hover:scale-110"
      >
        💾 Save
      </button>
    </div>
  )}
</div>
  );
};

export default TripEditor;