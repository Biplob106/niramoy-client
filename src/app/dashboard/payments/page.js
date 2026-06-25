"use client";
import { useEffect, useState } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import DashboardLayout from "@/components/DashboardLayout";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";

export default function PaymentHistoryPage() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/payments/patient/${user.email}`)
        .then((res) => setPayments(res.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user]);

  const totalPaid = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <PrivateRoute>
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-2">Payment History</h1>
        <p className="opacity-70 mb-6">আপনার সব লেনদেন এখানে।</p>

        <div className="stats shadow mb-8 w-full">
          <div className="stat">
            <div className="stat-title">Total Payments</div>
            <div className="stat-value text-primary">{payments.length}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Paid</div>
            <div className="stat-value text-success">৳{totalPaid}</div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : payments.length === 0 ? (
          <p className="opacity-60">এখনো কোনো পেমেন্ট করেননি।</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Transaction ID</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p._id}>
                    <td className="font-semibold text-primary">৳{p.amount}</td>
                    <td className="font-mono text-xs">{p.transactionId}</td>
                    <td>
                      {p.paymentDate
                        ? new Date(p.paymentDate).toLocaleDateString("en-GB")
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </DashboardLayout>
    </PrivateRoute>
  );
}
