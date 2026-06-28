"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { axiosPublic } from "@/lib/axios";
import useTitle from "@/hooks/useTitle";

export default function BookPage() {
  useTitle("অ্যাপয়েন্টমেন্ট বুকিং");
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [symptoms, setSymptoms] = useState("");

  // আজকের তারিখ (YYYY-MM-DD) — এর আগের কোনো দিন বুক করা যাবে না
  const today = new Date().toLocaleDateString("en-CA");

  useEffect(() => {
    axiosPublic.get(`/doctors/${id}`).then((res) => setDoctor(res.data));
  }, [id]);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!date || !time) {
      return toast.error("দয়া করে দিন ও সময় নির্বাচন করুন");
    }
    if (date < today) {
      return toast.error("অতীতের তারিখ নির্বাচন করা যাবে না");
    }
    try {
      await axiosSecure.post("/appointments", {
        patientId: user.email,
        patientName: user.displayName,
        doctorEmail: doctor?.email,
        doctorId: id,
        doctorName: doctor?.doctorName,
        doctorEmail: doctor?.email,
        consultationFee: doctor?.consultationFee,
        appointmentDate: date,
        appointmentTime: time,
        symptoms,
      });
      toast.success("Appointment booked! (payment pending)");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Booking failed");
      console.error(error);
    }
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen py-12 px-4 max-w-xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="text-2xl font-bold text-center">
              Book Appointment {doctor && `with ${doctor.doctorName}`}
            </h1>
            {doctor && (
              <p className="text-center text-primary font-semibold">
                Fee: ৳{doctor.consultationFee}
              </p>
            )}

            <form onSubmit={handleBook} className="space-y-3 mt-4">
              <div>
                <label className="label">Date</label>
                <input type="date" value={date} min={today} onChange={(e) => setDate(e.target.value)}
                  className="input input-bordered w-full" />
              </div>

              <div>
                <label className="label">Time Slot</label>
                <select value={time} onChange={(e) => setTime(e.target.value)}
                  className="select select-bordered w-full">
                  <option value="">সময় নির্বাচন করুন</option>
                  {doctor?.availableSlots?.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Symptoms (optional)</label>
                <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)}
                  className="textarea textarea-bordered w-full"
                  placeholder="আপনার সমস্যা সংক্ষেপে লিখুন"></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}