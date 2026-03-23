"use client";

import { useRouter } from "next/navigation";
import { LogOut, LayoutDashboard } from "lucide-react";

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-xl bg-[lab(18_1.46_-21.3)] border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1
          onClick={() => router.push("/")}
          className="text-xl font-bold text-white cursor-pointer hover:opacity-80 transition"
        >
          🌍ITINERA
        </h1>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Dashboard */}
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-sm text-gray-200 hover:text-white transition"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/90 text-white px-4 py-2 rounded-xl text-sm hover:bg-red-600 transition shadow-md"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;