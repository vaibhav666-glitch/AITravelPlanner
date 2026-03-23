"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TravelForm from "@/components/trip/TravelForm";
import TripEditor from "@/components/trip/TripEditor";
import { createTrip, getTripById } from "@/services/trips.service";
import Loader from "@/components/common/Loader";

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
if(loading)
  return <Loader/>

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-indigo-900 relative overflow-hidden">

    
      <div className="absolute w-[500px] h-[500px] bg-blue-500 opacity-20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-purple-500 opacity-20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

     
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

export default TripPage;