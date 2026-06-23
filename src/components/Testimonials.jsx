"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { axiosPublic } from "@/lib/axios";

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axiosPublic.get("/reviews").then((res) => setReviews(res.data)).catch(console.error);
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-primary/5">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">রোগীদের অভিজ্ঞতা</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card bg-base-100 shadow-md p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <img src={r.patientPhoto} alt={r.patientName} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-semibold">{r.patientName}</h4>
                  <div className="text-warning text-sm">{"★".repeat(r.rating)}</div>
                </div>
              </div>
              <p className="opacity-80 text-sm">{r.reviewText}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}