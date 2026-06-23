"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { axiosPublic } from "@/lib/axios";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axiosPublic
      .get(`/doctors?search=${search}`)
      .then((res) => setDoctors(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <div className="min-h-screen py-12 px-4 max-w-6xl mx-auto">
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="নাম বা বিশেষত্ব দিয়ে খুঁজুন..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
      </div>
      <h1 className="text-3xl font-bold text-center mb-10">ডাক্তার খুঁজুন</h1>

      {loading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="card bg-base-100 shadow-md hover:shadow-xl transition"
            >
              <figure className="px-6 pt-6">
                <img
                  src={doc.profileImage}
                  alt={doc.doctorName}
                  className="rounded-full w-24 h-24 object-cover"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="card-title">{doc.doctorName}</h3>
                <div className="badge badge-primary badge-outline">
                  {doc.specialization}
                </div>
                <p className="text-sm opacity-70">
                  {doc.experience} years • {doc.hospitalName}
                </p>
                <p className="font-semibold text-primary">
                  Fee: ৳{doc.consultationFee}
                </p>
                <Link
                  href={`/doctors/${doc._id}`}
                  className="btn btn-primary btn-sm mt-2"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
