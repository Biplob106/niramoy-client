"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import DashboardLayout from "@/components/DashboardLayout";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useRouter } from "next/navigation";
import useTitle from "@/hooks/useTitle";

export default function RequestsPage() {
  useTitle("অ্যাপয়েন্টমেন্ট রিকোয়েস্ট");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
const router = useRouter();
  const loadData = () => {
    if (user?.email) {
      axiosSecure
        .get(`/appointments/doctor/${user.email}`)
        .then((res) => setAppointments(res.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => { loadData(); }, [user]);


  const updateStatus = async (id, status) => {
  try {
    await axiosSecure.patch(`/appointments/status/${id}`, { status });
    toast.success(`Appointment ${status}`);
    if (status === "completed") {
      router.push(`/dashboard/prescription/${id}`);   // complete → prescription
    } else {
      loadData();
    }
  } catch {
    toast.error("Update failed");
  }
};

  return (
    <PrivateRoute>
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-6">Appointment Requests</h1>

        {loading ? (
          <span className="loading loading-spinner loading-lg text-primary"></span>
        ) : appointments.length === 0 ? (
          <p className="opacity-60">কোনো appointment request নেই।</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Patient</th><th>Date</th><th>Time</th><th>Status</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a._id}>
                    <td>{a.patientName}</td>
                    <td>{a.appointmentDate}</td>
                    <td>{a.appointmentTime}</td>
                    <td><span className="badge">{a.appointmentStatus}</span></td>
                    <td className="flex gap-1">
                      {a.appointmentStatus === "pending" && (
                        <>
                          <button onClick={() => updateStatus(a._id, "confirmed")}
                            className="btn btn-success btn-xs">Accept</button>
                          <button onClick={() => updateStatus(a._id, "rejected")}
                            className="btn btn-error btn-xs">Reject</button>
                        </>
                      )}
                      {a.appointmentStatus === "confirmed" && (
                        <button onClick={() => updateStatus(a._id, "completed")}
                          className="btn btn-info btn-xs">Mark Complete</button>
                      )}
                      {(a.appointmentStatus === "completed" ||
                        a.appointmentStatus === "rejected") && (
                        <span className="text-sm opacity-60">—</span>
                      )}
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