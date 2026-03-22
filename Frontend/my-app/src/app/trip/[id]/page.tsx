"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TravelForm from "@/components/trip/TravelForm";
import TripEditor from "@/components/trip/TripEditor";
import { createTrip, getTripById } from "@/services/trips.service";

const TripPage = () => {
  const params = useParams();
  const tripId = params?.id as string;

  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!tripId) return;

    const fetchTrip = async () => {
      try {
        setLoading(true);
        const data = await getTripById(tripId);
        setTrip(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [tripId]);

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

export default TripPage;