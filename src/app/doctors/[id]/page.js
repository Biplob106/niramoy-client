"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { axiosPublic } from "@/lib/axios";

export default function DoctorDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic
      .get(`/doctors/${id}`)
      .then((res) => setDoctor(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!doctor) {
    return <p className="text-center py-20 opacity-60">ডাক্তার পাওয়া যায়নি।</p>;
  }

  return (
    <div className="min-h-screen py-12 px-4 max-w-4xl mx-auto">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className="lg:w-1/3 p-6">
          <img
            src={doctor.profileImage}
            alt={doctor.doctorName}
            className="rounded-xl w-48 h-48 object-cover"
          />
        </figure>
        <div className="card-body lg:w-2/3">
          <h1 className="text-3xl font-bold text-primary">{doctor.doctorName}</h1>
          <div className="badge badge-primary badge-outline">{doctor.specialization}</div>

          <div className="space-y-1 mt-3 text-sm">
            <p><span className="font-semibold">Qualifications:</span> {doctor.qualifications}</p>
            <p><span className="font-semibold">Experience:</span> {doctor.experience} years</p>
            <p><span className="font-semibold">Hospital:</span> {doctor.hospitalName}</p>
            <p><span className="font-semibold">Available Days:</span> {doctor.availableDays?.join(", ")}</p>
            <p><span className="font-semibold">Available Slots:</span> {doctor.availableSlots?.join(", ")}</p>
            <p className="text-lg font-bold text-primary mt-2">
              Consultation Fee: ৳{doctor.consultationFee}
            </p>
          </div>

          <button
            onClick={() => router.push(`/doctors/${doctor._id}/book`)}
            className="btn btn-primary mt-4 w-full md:w-auto"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}