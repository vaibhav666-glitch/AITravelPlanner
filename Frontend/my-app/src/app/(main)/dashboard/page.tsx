"use client";

import { getTrips } from "@/services/trips.service";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const getWeatherIcon = (type: string) => {
  if (!type) return "🌤️";
  if (type.toLowerCase().includes("rain")) return "🌧️";
  if (type.toLowerCase().includes("cloud")) return "☁️";
  if (type.toLowerCase().includes("sun")) return "☀️";
  return "🌤️";
};

const DashboardPage = () => {
  const [trips, setTrips] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTrips();
      setTrips(res);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-900 p-6">

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">
        {/* About Itinera */}
<div className="max-w-7xl mx-auto mb-12">
  <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl overflow-hidden">

    {/* subtle glow */}
    <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500 opacity-20 blur-2xl rounded-full" />
    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500 opacity-20 blur-2xl rounded-full" />

    <h2 className="text-2xl font-bold text-white mb-3 relative z-10">
      ✨ Meet Itinera
    </h2>

    <p className="text-gray-300 text-sm leading-relaxed relative z-10">
      <span className="text-white font-semibold">Itinera</span> is your AI-powered travel companion that builds intelligent, personalized trips in seconds. 
      It leverages <span className="text-blue-300">real-time weather insights</span> (up to 15 days, with highest accuracy for 10 days) to design the perfect itinerary for you.
    </p>

    {/* Features */}
    <div className="grid md:grid-cols-3 gap-4 mt-6 relative z-10">

      <div className="bg-white/10 rounded-xl p-4 hover:scale-105 transition">
        <h3 className="font-semibold text-white mb-1">🌦️ Smart Planning</h3>
        <p className="text-gray-300 text-xs">
          Weather-aware itineraries that adapt automatically.
        </p>
      </div>

      <div className="bg-white/10 rounded-xl p-4 hover:scale-105 transition">
        <h3 className="font-semibold text-white mb-1">🧠 AI Control</h3>
        <p className="text-gray-300 text-xs">
          Regenerate days, customize plans, refine instantly.
        </p>
      </div>

      <div className="bg-white/10 rounded-xl p-4 hover:scale-105 transition">
        <h3 className="font-semibold text-white mb-1">⚡ Full Flexibility</h3>
        <p className="text-gray-300 text-xs">
          Add, remove, and shape your journey your way.
        </p>
      </div>

    </div>

    {/* tagline */}
    <p className="mt-6 text-center text-blue-300 font-medium relative z-10">
      Plan smarter. Travel better. ✈️
    </p>
  </div>
</div>
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 flex justify-between items-center shadow-xl">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Plan your next adventure ✈️
            </h1>
            <p className="text-gray-300 mt-1 text-sm">
              AI-powered travel planning
            </p>
          </div>

          <Link href="/create-trip">
            <button className="bg-white text-blue-600 px-4 py-2 rounded-xl flex items-center gap-2 font-semibold shadow hover:scale-105 transition">
              <Plus size={18} />
              New Trip
            </button>
          </Link>
        </div>
      </div>

      {/* Trips */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-semibold mb-6 text-white">
          Your Trips
        </h2>

        {trips.length === 0 ? (
          <div className="text-center py-20 border border-white/20 rounded-xl bg-white/10 backdrop-blur">
            <p className="text-gray-300">
              No trips yet. Start your first journey 🚀
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {trips.map((trip) => {
              const weather = trip.weather?.[0]; // Day 1

              return (
                <div
                  key={trip._id}
                  onClick={() => router.push(`/trip/${trip._id}`)}
                  className="cursor-pointer backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-5 shadow-xl hover:scale-[1.03] hover:shadow-2xl transition"
                >
                  {/* Weather Hero */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {trip.destination}
                      </h3>
                      <p className="text-xs text-gray-300">
                        {trip.days} days • {trip.budgetType}
                      </p>
                    </div>

                    <div className="text-3xl">
                      {getWeatherIcon(weather?.weather)}
                    </div>
                  </div>

                  {/* Weather Info */}
                  {weather && (
                    <div className="bg-white/20 rounded-xl p-3 text-center mb-4">
                      <p className="text-sm text-gray-200">
                        Day 1
                      </p>
                      <p className="text-xl font-bold text-white">
                        {weather.temp}°C
                      </p>
                      <p className="text-xs text-gray-300">
                        {weather.weather}
                      </p>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="text-blue-300 text-sm font-medium">
                    View Plan →
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;