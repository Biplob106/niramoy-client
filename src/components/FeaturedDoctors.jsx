"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { axiosPublic } from "@/lib/axios";
import DoctorCard from "@/components/DoctorCard";

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctors.slice(0, 6).map((doc, i) => (
              <DoctorCard key={doc._id} doctor={doc} index={i} />
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
