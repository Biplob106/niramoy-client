"use client";
import { useEffect, useState } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import DashboardLayout from "@/components/DashboardLayout";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useTitle from "@/hooks/useTitle";

export default function AdminPaymentsPage() {
  useTitle("পেমেন্ট ম্যানেজমেন্ট");
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/payments")
      .then((res) => setPayments(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalRevenue = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <PrivateRoute>
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-2">Payment Management</h1>
        <p className="opacity-70 mb-6">সব লেনদেনের তালিকা।</p>

        {/* সারসংক্ষেপ */}
        <div className="stats shadow mb-8 w-full">
          <div className="stat">
            <div className="stat-title">Total Payments</div>
            <div className="stat-value text-primary">{payments.length}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Revenue</div>
            <div className="stat-value text-success">৳{totalRevenue}</div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : payments.length === 0 ? (
          <p className="opacity-60">কোনো পেমেন্ট পাওয়া যায়নি।</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Amount</th>
                  <th>Transaction ID</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p._id}>
                    <td>{p.patientId}</td>
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
