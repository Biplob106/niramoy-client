"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import PrivateRoute from "@/components/PrivateRoute";
import CheckoutForm from "@/components/CheckoutForm";
import { stripePromise } from "@/lib/stripe";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useTitle from "@/hooks/useTitle";

export default function PaymentPage() {
  useTitle("পেমেন্ট");
  const { id } = useParams();           // appointment id
  const router = useRouter();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/appointments/patient/${user.email}`)
        .then((res) => {
          const found = res.data.find((a) => a._id === id);
          setAppointment(found);
        })
        .catch(console.error);
    }
  }, [user, id]);

  return (
    <PrivateRoute>
      <div className="min-h-screen py-12 px-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Payment</h1>

        {!appointment ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : appointment.paymentStatus === "paid" ||
          ["completed", "cancelled", "rejected"].includes(
            appointment.appointmentStatus
          ) ? (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <p className="text-lg font-semibold">
                {appointment.paymentStatus === "paid"
                  ? "এই অ্যাপয়েন্টমেন্টের পেমেন্ট ইতিমধ্যে সম্পন্ন হয়েছে।"
                  : "এই অ্যাপয়েন্টমেন্টের জন্য পেমেন্ট করা যাবে না।"}
              </p>
              <p className="text-sm opacity-60">
                স্ট্যাটাস: {appointment.appointmentStatus} / {appointment.paymentStatus}
              </p>
              <Link href="/dashboard/appointments" className="btn btn-primary btn-sm mt-2">
                আমার অ্যাপয়েন্টমেন্টে ফিরে যান
              </Link>
            </div>
          </div>
        ) : (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <p><span className="font-semibold">Doctor:</span> {appointment.doctorName}</p>
              <p><span className="font-semibold">Date:</span> {appointment.appointmentDate} at {appointment.appointmentTime}</p>
              <p className="text-lg font-bold text-primary mb-4">
                Fee: ৳{appointment.consultationFee}
              </p>

              <Elements stripe={stripePromise}>
                <CheckoutForm
                  appointment={appointment}
                  onSuccess={() => router.push("/dashboard")}
                />
              </Elements>
            </div>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}