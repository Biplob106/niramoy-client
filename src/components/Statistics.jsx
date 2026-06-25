"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-[2rem] bg-gradient-to-br from-primary to-secondary p-1 shadow-xl">
          <div className="rounded-[1.9rem] bg-base-100 px-6 py-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              আমাদের পরিসংখ্যান
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {items.map((it, i) => (
                <motion.div
                  key={it.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="grid place-items-center w-16 h-16 mx-auto rounded-2xl bg-primary/10 text-3xl mb-3">
                    {it.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold text-gradient">
                    {it.value}+
                  </div>
                  <div className="opacity-70 mt-1">{it.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
