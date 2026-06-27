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
    <section className="py-16 px-4 bg-base-200/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          রোগীদের অভিজ্ঞতা
        </h2>
        <p className="text-center opacity-60 mb-10">
          যাদের আস্থা আমাদের অনুপ্রেরণা
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r._id}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card bg-base-100 shadow-md border border-base-200 p-6 relative"
            >
              <span className="absolute top-4 right-5 text-5xl text-primary/15 font-serif leading-none">
                &rdquo;
              </span>
              <div className="text-primary text-lg mb-3">
                {"★".repeat(r.rating)}
                <span className="text-base-300">{"★".repeat(5 - r.rating)}</span>
              </div>
              <p className="opacity-80 text-sm mb-5">{r.reviewText}</p>
              <div className="flex items-center gap-3 mt-auto">
                <img
                  src={r.patientPhoto}
                  alt={r.patientName}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <h4 className="font-semibold">{r.patientName}</h4>
                  <p className="text-xs opacity-60">যাচাইকৃত রোগী</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
