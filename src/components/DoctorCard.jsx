"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DoctorCard({ doctor, index = 0 }) {
  const isVerified = doctor.verificationStatus === "verified";
  const [imgError, setImgError] = useState(false);

  // মূল ছবি না থাকলে / লোড না হলে — নামের আদ্যক্ষর দিয়ে টিল অ্যাভাটার
  const fallbackImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    doctor.doctorName || "Doctor"
  )}&background=0e7c7b&color=ffffff&size=400&bold=true`;
  const imageSrc =
    doctor.profileImage && !imgError ? doctor.profileImage : fallbackImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="h-full"
    >
      <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10">
        {/* টপ teal ব্যান্ড + গোল অ্যাভাটার */}
        <div className="relative h-20 bg-gradient-to-r from-primary to-accent">
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
            <div className="relative">
              <img
                src={imageSrc}
                alt={doctor.doctorName}
                className="h-24 w-24 rounded-full object-cover object-top ring-4 ring-base-100 bg-base-200 shadow-md transition duration-300 group-hover:scale-105"
                onError={() => setImgError(true)}
              />
              {isVerified && (
                <span
                  title="যাচাইকৃত ডাক্তার"
                  className="absolute -bottom-0.5 -right-0.5 grid h-7 w-7 place-items-center rounded-full bg-primary text-sm text-white shadow-sm ring-2 ring-base-100"
                >
                  ✓
                </span>
              )}
            </div>
          </div>
        </div>

        {/* বডি */}
        <div className="flex flex-1 flex-col items-center gap-1 px-5 pb-5 pt-16 text-center">
          <h3 className="text-lg font-semibold text-base-content">
            {doctor.doctorName}
          </h3>

          <span className="badge badge-sm border-0 bg-primary/10 font-medium text-primary">
            {doctor.specialization}
          </span>

          {/* info row */}
          <div className="my-4 grid w-full grid-cols-2 divide-x divide-base-300 rounded-2xl bg-base-200/60 py-3">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-base-content">
                {doctor.experience}+
              </span>
              <span className="text-xs opacity-60">বছর অভিজ্ঞতা</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-primary">
                ৳{doctor.consultationFee}
              </span>
              <span className="text-xs opacity-60">কনসাল্টেশন ফি</span>
            </div>
          </div>

          <Link
            href={`/doctors/${doctor._id}`}
            className="btn btn-primary btn-block mt-auto rounded-xl"
          >
            বিস্তারিত দেখুন
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
