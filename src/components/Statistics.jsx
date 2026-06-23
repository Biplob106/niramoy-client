"use client";
import { useEffect, useState } from "react";
import { axiosPublic } from "@/lib/axios";

export default function Statistics() {
  const [stats, setStats] = useState({ doctors: 0, patients: 0, appointments: 0, reviews: 0 });

  useEffect(() => {
    axiosPublic.get("/stats").then((res) => setStats(res.data)).catch(console.error);
  }, []);

  const items = [
    { label: "Doctors", value: stats.doctors, icon: "🩺" },
    { label: "Patients", value: stats.patients, icon: "👥" },
    { label: "Appointments", value: stats.appointments, icon: "📅" },
    { label: "Reviews", value: stats.reviews, icon: "⭐" },
  ];

  return (
    <section className="py-16 px-4 bg-primary/5">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">আমাদের পরিসংখ্যান</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((it) => (
            <div key={it.label} className="card bg-base-100 shadow-md text-center p-6">
              <div className="text-4xl mb-2">{it.icon}</div>
              <div className="text-3xl font-bold text-primary">{it.value}+</div>
              <div className="opacity-70">{it.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}