"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { axiosPublic } from "@/lib/axios";

export default function FeaturedDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic
      .get("/doctors/featured")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 px-4 bg-base-200/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          আমাদের ডাক্তারগণ
        </h2>
        <p className="text-center opacity-60 mb-10">
          যাচাইকৃত ও অভিজ্ঞ বিশেষজ্ঞদের সাথে পরামর্শ নিন
        </p>

        {loading ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doc, i) => (
              <motion.div
                key={doc._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="card-hover card h-full bg-base-100 shadow-md hover:shadow-xl border border-base-300 rounded-2xl overflow-hidden"
              >
                {/* গ্রেডিয়েন্ট টপ */}
                <div className="h-16 bg-gradient-to-r from-primary to-secondary"></div>
                <div className="card-body items-center text-center -mt-12 pt-0">
                  <img
                    src={doc.profileImage}
                    alt={doc.doctorName}
                    className="rounded-full w-24 h-24 object-cover ring-4 ring-base-100 shadow-lg"
                  />
                  <h3 className="card-title mt-2">{doc.doctorName}</h3>
                  <div className="badge badge-primary badge-outline">
                    {doc.specialization}
                  </div>
                  <p className="text-sm opacity-70">{doc.experience} years experience</p>
                  <p className="font-bold text-primary text-lg">৳{doc.consultationFee}</p>
                  <Link
                    href={`/doctors/${doc._id}`}
                    className="btn btn-primary btn-sm btn-block mt-auto transition"
                  >
                    বিস্তারিত দেখুন
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/doctors" className="btn btn-outline btn-primary">
            সব ডাক্তার দেখুন →
          </Link>
        </div>
      </div>
    </section>
  );
}
