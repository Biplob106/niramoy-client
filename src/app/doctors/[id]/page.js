"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { axiosPublic } from "@/lib/axios";
import useTitle from "@/hooks/useTitle";

export default function DoctorDetailsPage() {
  useTitle("ডাক্তারের বিবরণ");
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

  const InfoRow = ({ label, value }) => (
    <div className="flex justify-between gap-4 py-2 border-b border-base-200 last:border-0">
      <span className="opacity-60">{label}</span>
      <span className="font-medium text-right">{value || "—"}</span>
    </div>
  );

  return (
    <div className="min-h-screen py-12 px-4 max-w-5xl mx-auto">
      <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
        {/* গ্রেডিয়েন্ট হেডার */}
        <div className="h-28 bg-primary"></div>

        <div className="px-6 md:px-10 pb-8 -mt-16">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-end">
            <img
              src={doctor.profileImage}
              alt={doctor.doctorName}
              className="rounded-2xl w-36 h-36 object-cover ring-4 ring-base-100 shadow-lg"
            />
            <div className="text-center md:text-left mb-2">
              <h1 className="text-3xl font-bold">{doctor.doctorName}</h1>
              <div className="badge badge-primary badge-outline mt-2">
                {doctor.specialization}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {/* তথ্য */}
            <div className="md:col-span-2 card bg-base-200/40 p-6">
              <h2 className="font-bold text-lg mb-2">পরিচিতি</h2>
              <InfoRow label="যোগ্যতা" value={doctor.qualifications} />
              <InfoRow label="অভিজ্ঞতা" value={`${doctor.experience} বছর`} />
              <InfoRow label="হাসপাতাল" value={doctor.hospitalName} />
              <InfoRow label="উপলব্ধ দিন" value={doctor.availableDays?.join(", ")} />
              <InfoRow label="সময় স্লট" value={doctor.availableSlots?.join(", ")} />
            </div>

            {/* বুকিং কার্ড */}
            <div className="card bg-base-100 border-2 border-primary/20 p-6 text-center h-fit">
              <p className="opacity-60 text-sm">কনসালটেশন ফি</p>
              <p className="text-3xl font-extrabold text-primary my-1">
                ৳{doctor.consultationFee}
              </p>
              <button
                onClick={() => router.push(`/doctors/${doctor._id}/book`)}
                className="btn btn-primary btn-block mt-4 shadow-lg shadow-primary/30"
              >
                অ্যাপয়েন্টমেন্ট নিন
              </button>
              <p className="text-xs opacity-50 mt-3">নিরাপদ অনলাইন পেমেন্ট</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}