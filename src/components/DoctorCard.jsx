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
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100 transition hover:-translate-y-1 hover:shadow-xl">
        {/* বড় ইমেজ — কার্ডের মূল ফোকাস */}
        <div className="relative h-48 w-full bg-base-200">
          <img
            src={imageSrc}
            alt={doctor.doctorName}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />

          {isVerified && (
            <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[0.7rem] font-medium text-white shadow-sm">
              ✓ যাচাইকৃত
            </span>
          )}
        </div>

        {/* বডি */}
        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="text-base font-medium text-base-content">
            {doctor.doctorName}
          </h3>

          <div className="badge badge-outline border-primary text-primary">
            {doctor.specialization}
          </div>

          <div className="mt-1 flex items-center justify-between text-sm">
            <span className="opacity-60">{doctor.experience} বছর</span>
            <span className="font-medium text-primary">
              ৳{doctor.consultationFee}
            </span>
          </div>

          <Link
            href={`/doctors/${doctor._id}`}
            className="btn btn-primary btn-block mt-auto"
          >
            বিস্তারিত দেখুন
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
