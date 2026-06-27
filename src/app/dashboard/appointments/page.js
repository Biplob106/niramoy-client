"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import DashboardLayout from "@/components/DashboardLayout";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useTitle from "@/hooks/useTitle";

export default function MyAppointmentsPage() {
  useTitle("আমার অ্যাপয়েন্টমেন্ট");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // reschedule modal state
  const [editing, setEditing] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  // prescription view modal state
  const [viewingRx, setViewingRx] = useState(null); // appointment
  const [prescription, setPrescription] = useState(null);
  const [rxLoading, setRxLoading] = useState(false);

  const loadData = () => {
    if (user?.email) {
      axiosSecure
        .get(`/appointments/patient/${user.email}`)
        .then((res) => setAppointments(res.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

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

  // cancel — status cancelled করা
  const cancelAppointment = async (id) => {
    if (!confirm("আপনি কি নিশ্চিত এই অ্যাপয়েন্টমেন্ট বাতিল করতে চান?")) return;
    try {
      await axiosSecure.patch(`/appointments/status/${id}`, { status: "cancelled" });
      toast.success("অ্যাপয়েন্টমেন্ট বাতিল করা হয়েছে");
      loadData();
    } catch {
      toast.error("বাতিল করা ব্যর্থ হয়েছে");
    }
  };

  const openReschedule = (a) => {
    setEditing(a);
    setNewDate(a.appointmentDate || "");
    setNewTime(a.appointmentTime || "");
  };

  const handleReschedule = async (e) => {
    e.preventDefault();
    if (!newDate || !newTime) {
      return toast.error("দিন ও সময় দিন");
    }
    try {
      await axiosSecure.patch(`/appointments/reschedule/${editing._id}`, {
        appointmentDate: newDate,
        appointmentTime: newTime,
      });
      toast.success("অ্যাপয়েন্টমেন্ট রিশিডিউল হয়েছে");
      setEditing(null);
      loadData();
    } catch {
      toast.error("রিশিডিউল ব্যর্থ হয়েছে");
    }
  };

  // prescription দেখা (read-only)
  const viewPrescription = async (a) => {
    setViewingRx(a);
    setPrescription(null);
    setRxLoading(true);
    try {
      const res = await axiosSecure.get(`/prescriptions/${a._id}`);
      setPrescription(res.data);
    } catch {
      toast.error("প্রেসক্রিপশন আনা যায়নি");
    } finally {
      setRxLoading(false);
    }
  };

  // শেষ হওয়া/বাতিল হওয়া appointment আর বদলানো যাবে না
  const isLocked = (s) => ["completed", "cancelled", "rejected"].includes(s);

  return (
    <PrivateRoute>
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-2">My Appointments</h1>
        <p className="opacity-70 mb-6">আপনার সব অ্যাপয়েন্টমেন্ট দেখুন, রিশিডিউল বা বাতিল করুন।</p>

        {loading ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : appointments.length === 0 ? (
          <p className="opacity-60">এখনো কোনো অ্যাপয়েন্টমেন্ট নেই।</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a._id}>
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
                    <td className="flex flex-wrap gap-1">
                      {a.paymentStatus === "unpaid" && !isLocked(a.appointmentStatus) && (
                        <Link
                          href={`/dashboard/payment/${a._id}`}
                          className="btn btn-primary btn-xs"
                        >
                          Pay
                        </Link>
                      )}
                      {!isLocked(a.appointmentStatus) && (
                        <>
                          <button
                            onClick={() => openReschedule(a)}
                            className="btn btn-xs btn-outline btn-info"
                          >
                            Reschedule
                          </button>
                          <button
                            onClick={() => cancelAppointment(a._id)}
                            className="btn btn-xs btn-outline btn-error"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {a.appointmentStatus === "completed" && (
                        <button
                          onClick={() => viewPrescription(a)}
                          className="btn btn-xs btn-outline btn-success"
                        >
                          Prescription
                        </button>
                      )}
                      {isLocked(a.appointmentStatus) &&
                        a.appointmentStatus !== "completed" && (
                          <span className="text-sm opacity-60">—</span>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Reschedule Modal */}
        {editing && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">
                রিশিডিউল — {editing.doctorName}
              </h3>
              <form onSubmit={handleReschedule} className="space-y-3">
                <div>
                  <label className="label text-sm">নতুন তারিখ</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label text-sm">নতুন সময়</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="যেমন: 10:00 AM"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="modal-action">
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="btn btn-ghost"
                  >
                    বাতিল
                  </button>
                  <button type="submit" className="btn btn-primary">
                    আপডেট করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Prescription View Modal (read-only) */}
        {viewingRx && (
          <div className="modal modal-open">
            <div className="modal-box">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl">🩺</span>
                <h3 className="font-bold text-lg">প্রেসক্রিপশন</h3>
              </div>
              <p className="text-sm opacity-60 mb-4">
                {viewingRx.doctorName} • {viewingRx.appointmentDate}
              </p>

              {rxLoading ? (
                <div className="flex justify-center py-8">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
              ) : !prescription?.appointmentId ? (
                <p className="opacity-60 py-6 text-center">
                  ডাক্তার এখনো প্রেসক্রিপশন যোগ করেননি।
                </p>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold opacity-60">রোগ নির্ণয়</p>
                    <p>{prescription.diagnosis || "—"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold opacity-60">ঔষধ</p>
                    {prescription.medications?.length ? (
                      <ul className="list-disc list-inside">
                        {prescription.medications.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>—</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold opacity-60">নোট</p>
                    <p>{prescription.notes || "—"}</p>
                  </div>
                </div>
              )}

              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => setViewingRx(null)}
                  className="btn btn-primary"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </PrivateRoute>
  );
}
