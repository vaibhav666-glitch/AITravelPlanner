"use client";

import { useState } from "react";
import TravelForm from "@/components/trip/TravelForm";
import TripEditor from "@/components/trip/TripEditor";
import { createTrip } from "@/services/trips.service";

const CreateTripPage = () => {
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTrip = async (form: any) => {
    try {
      setLoading(true);
      const resp = await createTrip(form);
      setTrip(resp);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-indigo-900 relative overflow-hidden">

      {/* 🔥 Glow background (same as login) */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500 opacity-20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-purple-500 opacity-20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      {/* 🔥 Glass Card */}
      <div
  className={`backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 w-full z-10 transition-all ${
    trip ? "max-w-7xl" : "max-w-xl"
  }`}
>
        {!trip ? (
          <>
            <h1 className="text-2xl font-bold mb-2 text-center text-white">
              Create Your Trip ✈️
            </h1>

            <p className="text-center text-gray-300 mb-6 text-sm">
              Let AI craft your perfect journey
            </p>

            <TravelForm onSubmit={handleTrip} />
          </>
        ) : (
          <TripEditor trip={trip} setTrip={setTrip} />
        )}

      </div>
    </div>
  );
};

export default CreateTripPage;