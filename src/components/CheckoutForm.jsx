"use client";
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";

export default function CheckoutForm({ appointment, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);

    try {
      // ১. server থেকে clientSecret আনো
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amount: appointment.consultationFee,
      });

      // ২. card দিয়ে confirm করো
      const card = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card, billing_details: { email: user.email } },
      });

      if (result.error) {
        toast.error(result.error.message);
        setProcessing(false);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        // ৩. payment record save + appointment paid
        await axiosSecure.post("/payments", {
          appointmentId: appointment._id,
          patientId: user.email,
          doctorId: appointment.doctorId,
          amount: appointment.consultationFee,
          transactionId: result.paymentIntent.id,
        });
        toast.success("Payment successful!");
        onSuccess();
      }
    } catch (err) {
      toast.error("Payment failed");
      console.error(err);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border p-3 rounded-lg">
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </div>
      <button type="submit" disabled={!stripe || processing} className="btn btn-primary w-full">
        {processing ? "Processing..." : `Pay ৳${appointment.consultationFee}`}
      </button>
    </form>
  );
}