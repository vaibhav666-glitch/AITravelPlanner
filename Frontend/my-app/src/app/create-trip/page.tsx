"use client";

import {  useState } from "react";

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
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-6">

        {!trip ? (
          <>
            <h1 className="text-2xl font-bold mb-6 text-center">
              Create Your Trip
            </h1>
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