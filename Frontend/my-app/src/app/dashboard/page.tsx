"use client";

import { getTrips } from "@/services/trips.service";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



const DashboardPage = () => {
    const [trips,setTrips]=useState([]);
    const router=useRouter()
    useEffect(()=>{
        const fetchData=async()=>{
            const res=await getTrips()
            console.log(res)
            setTrips(res)
        }
        fetchData()
    },[])
  return (
    <div className="p-6 max-w-6xl mx-auto">
 
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-6 flex justify-between items-center shadow-md">
        <div>
          <h1 className="text-2xl font-bold">
            Plan your next adventure ✈️
          </h1>
          <p className="text-sm opacity-90 mt-1">
            Create personalized trips with AI in seconds
          </p>
        </div>

       import Link from "next/link";

<Link href="/create-trip">
  <button className="bg-white text-blue-600 px-4 py-2 rounded-xl flex items-center gap-2 font-semibold shadow hover:scale-105 transition">
    <Plus size={18} />
    New Trip
  </button>
</Link>
      </div>

     
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Trips</h2>

        {trips.length === 0 ? (
          <div className="text-center py-16 border rounded-xl bg-gray-50">
            <p className="text-gray-500">
              No trips yet. Start your first journey 🚀
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <div
                key={trip._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
              >
                <img
                  src={trip.image}
                  alt={trip.destination}
                  className="h-40 w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="text-lg font-semibold">
                    {trip.destination}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {trip.days} days • {trip.budget} budget
                  </p>

                  <button 
                 onClick={() => router.push(`/trip/${trip._id}`)}
                  className="mt-4 text-blue-600 text-sm font-medium">
                    View Plan →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;