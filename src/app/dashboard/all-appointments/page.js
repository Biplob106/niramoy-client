"use client";
import { useEffect, useState } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import DashboardLayout from "@/components/DashboardLayout";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useTitle from "@/hooks/useTitle";

export default function AllAppointmentsPage() {
  useTitle("সব অ্যাপয়েন্টমেন্ট");
  const axiosSecure = useAxiosSecure();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/appointments")
      .then((res) => setAppointments(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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

  return (
    <PrivateRoute>
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-2">All Appointments</h1>
        <p className="opacity-70 mb-6">মোট অ্যাপয়েন্টমেন্ট: {appointments.length}</p>

        {loading ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : appointments.length === 0 ? (
          <p className="opacity-60">কোনো অ্যাপয়েন্টমেন্ট নেই।</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a._id}>
                    <td>{a.patientName}</td>
                    <td>{a.doctorName}</td>
                    <td>{a.appointmentDate}</td>
                    <td>{a.appointmentTime}</td>
                    <td>
                      <span className={`badge ${statusBadge(a.appointmentStatus)}`}>
                        {a.appointmentStatus}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          a.paymentStatus === "paid" ? "badge-success" : "badge-warning"
                        }`}
                      >
                        {a.paymentStatus}
                      </span>
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
