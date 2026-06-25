"use client";
import { useEffect, useState } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Link from "next/link";
import useRole from "@/hooks/useRole";
import DashboardLayout from "@/components/DashboardLayout";
import useTitle from "@/hooks/useTitle";

export default function DashboardPage() {
  useTitle("ড্যাশবোর্ড");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/appointments/patient/${user.email}`)
        .then((res) => setAppointments(res.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user]);

  // status অনুযায়ী রঙ
  const statusBadge = (status) => {
    const map = {
      pending: "badge-warning",
      confirmed: "badge-info",
      completed: "badge-success",
      cancelled: "badge-error",
      rejected: "badge-error",
    };
    return map[status] || "badge-ghost";
  };

  const { role } = useRole();

  return (
    <PrivateRoute>
    <DashboardLayout>
      <div className="min-h-screen py-10 px-4 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">
          স্বাগতম, {user?.displayName} 👋
        </h1>
        <p className="opacity-70 mb-8">
          আপনার অ্যাপয়েন্টমেন্টগুলো এখানে দেখুন।
        </p>
        <p className="badge badge-secondary mb-4">Role: {role}</p>
        {/* ছোট পরিসংখ্যান */}
        <div className="stats shadow mb-8 w-full">
          <div className="stat">
            <div className="stat-title">Total Appointments</div>
            <div className="stat-value text-primary">{appointments.length}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Completed</div>
            <div className="stat-value text-success">
              {
                appointments.filter((a) => a.appointmentStatus === "completed")
                  .length
              }
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4">My Appointments</h2>

        {loading ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : appointments.length === 0 ? (
          <p className="opacity-60">এখনো কোনো অ্যাপয়েন্টমেন্ট নেই।</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a._id}>
                    <td>{a.doctorName}</td>
                    <td>{a.appointmentDate}</td>
                    <td>{a.appointmentTime}</td>
                    <td>
                      <span
                        className={`badge ${statusBadge(a.appointmentStatus)}`}
                      >
                        {a.appointmentStatus}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${a.paymentStatus === "paid" ? "badge-success" : "badge-warning"}`}
                      >
                        {a.paymentStatus}
                      </span>
                    </td>
                    <td>
                      {a.paymentStatus === "unpaid" ? (
                        <Link
                          href={`/dashboard/payment/${a._id}`}
                          className="btn btn-primary btn-xs"
                        >
                          Pay
                        </Link>
                      ) : (
                        <span className="text-success text-sm">✓ Paid</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
    </PrivateRoute>
  );
}
