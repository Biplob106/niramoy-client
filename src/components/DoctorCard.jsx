"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DoctorCard({ doctor, index = 0 }) {
  const isVerified = doctor.verificationStatus === "verified";

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
          {doctor.profileImage ? (
            <img
              src={doctor.profileImage}
              alt={doctor.doctorName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="grid h-full w-full place-items-center text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 opacity-40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0v.75H4.5v-.75Z"
                />
              </svg>
            </div>
          )}

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
