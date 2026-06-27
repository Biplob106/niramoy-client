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
  const { role, roleLoading } = useRole();
  const axiosSecure = useAxiosSecure();

  const [appointments, setAppointments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [adminStats, setAdminStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // role অনুযায়ী ডেটা আনা
  useEffect(() => {
    if (!user?.email || roleLoading || !role) return;
    setLoading(true);

    const tasks = [];
    if (role === "patient") {
      tasks.push(
        axiosSecure.get(`/appointments/patient/${user.email}`).then((r) => setAppointments(r.data)),
        axiosSecure.get(`/payments/patient/${user.email}`).then((r) => setPayments(r.data))
      );
    } else if (role === "doctor") {
      tasks.push(
        axiosSecure.get(`/appointments/doctor/${user.email}`).then((r) => setAppointments(r.data)),
        axiosSecure.get(`/reviews/doctor/${user.email}`).then((r) => setReviews(r.data))
      );
    } else if (role === "admin") {
      tasks.push(
        axiosSecure.get(`/admin-stats`).then((r) => setAdminStats(r.data))
      );
    }

    Promise.all(tasks).catch(console.error).finally(() => setLoading(false));
  }, [user, role, roleLoading]);

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

  // আজকের তারিখ (doctor today's appointments-এর জন্য)
  const todayStr = new Date().toISOString().split("T")[0];

  const StatCard = ({ title, value, color = "text-primary" }) => (
    <div className="stat bg-base-100 shadow rounded-box">
      <div className="stat-title">{title}</div>
      <div className={`stat-value ${color}`}>{value}</div>
    </div>
  );

  const renderOverview = () => {
    // ----- PATIENT -----
    if (role === "patient") {
      const completed = appointments.filter((a) => a.appointmentStatus === "completed").length;
      const upcoming = appointments.filter((a) => a.appointmentStatus === "confirmed").length;
      const totalPaid = payments.reduce((s, p) => s + (p.amount || 0), 0);
      const favoriteDoctors = new Set(appointments.map((a) => a.doctorId)).size;

      return (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard title="Upcoming" value={upcoming} color="text-info" />
            <StatCard title="Appointments" value={appointments.length} />
            <StatCard title="Total Paid" value={`৳${totalPaid}`} color="text-success" />
            <StatCard title="Favorite Doctors" value={favoriteDoctors} color="text-secondary" />
          </div>

          <h2 className="text-xl font-bold mb-4">Recent Appointments</h2>
          {appointments.length === 0 ? (
            <p className="opacity-60">এখনো কোনো অ্যাপয়েন্টমেন্ট নেই।</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Doctor</th><th>Date</th><th>Time</th><th>Status</th><th>Payment</th><th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.slice(0, 5).map((a) => (
                    <tr key={a._id}>
                      <td>{a.doctorName}</td>
                      <td>{a.appointmentDate}</td>
                      <td>{a.appointmentTime}</td>
                      <td><span className={`badge ${statusBadge(a.appointmentStatus)}`}>{a.appointmentStatus}</span></td>
                      <td>
                        <span className={`badge ${a.paymentStatus === "paid" ? "badge-success" : "badge-warning"}`}>
                          {a.paymentStatus}
                        </span>
                      </td>
                      <td>
                        {a.paymentStatus === "unpaid" ? (
                          <Link href={`/dashboard/payment/${a._id}`} className="btn btn-primary btn-xs">Pay</Link>
                        ) : (
                          <span className="text-success text-sm">✓ Paid</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link href="/dashboard/appointments" className="btn btn-outline btn-sm mt-4">
                সব অ্যাপয়েন্টমেন্ট দেখুন →
              </Link>
            </div>
          )}
        </>
      );
    }

    // ----- DOCTOR -----
    if (role === "doctor") {
      const totalPatients = new Set(appointments.map((a) => a.patientId)).size;
      const todays = appointments.filter((a) => a.appointmentDate === todayStr).length;
      const pending = appointments.filter((a) => a.appointmentStatus === "pending").length;

      return (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard title="Total Patients" value={totalPatients} />
            <StatCard title="Today's Appointments" value={todays} color="text-info" />
            <StatCard title="Pending Requests" value={pending} color="text-warning" />
            <StatCard title="Reviews Received" value={reviews.length} color="text-secondary" />
          </div>

          <h2 className="text-xl font-bold mb-4">Recent Appointment Requests</h2>
          {appointments.length === 0 ? (
            <p className="opacity-60">কোনো appointment নেই।</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr><th>Patient</th><th>Date</th><th>Time</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {appointments.slice(0, 5).map((a) => (
                    <tr key={a._id}>
                      <td>{a.patientName}</td>
                      <td>{a.appointmentDate}</td>
                      <td>{a.appointmentTime}</td>
                      <td><span className={`badge ${statusBadge(a.appointmentStatus)}`}>{a.appointmentStatus}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link href="/dashboard/requests" className="btn btn-outline btn-sm mt-4">
                সব রিকোয়েস্ট দেখুন →
              </Link>
            </div>
          )}
        </>
      );
    }

    // ----- ADMIN -----
    if (role === "admin") {
      const t = adminStats?.totals || {};
      return (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard title="Total Patients" value={t.patients || 0} />
            <StatCard title="Total Doctors" value={t.doctors || 0} color="text-info" />
            <StatCard title="Total Appointments" value={t.appointments || 0} color="text-secondary" />
            <StatCard title="Total Revenue" value={`৳${t.totalRevenue || 0}`} color="text-success" />
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/users" className="btn btn-outline btn-sm">Manage Users</Link>
            <Link href="/dashboard/manage-doctors" className="btn btn-outline btn-sm">Manage Doctors</Link>
            <Link href="/dashboard/analytics" className="btn btn-primary btn-sm">View Analytics →</Link>
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <PrivateRoute>
      <DashboardLayout>
        <div className="min-h-screen py-6">
          <h1 className="text-3xl font-bold mb-2">
            স্বাগতম, {user?.displayName} 👋
          </h1>
          <p className="opacity-70 mb-4">আপনার ড্যাশবোর্ড ওভারভিউ।</p>
          <p className="badge badge-secondary mb-6">Role: {role}</p>

          {loading || roleLoading ? (
            <div className="flex justify-center py-10">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : (
            renderOverview()
          )}
        </div>
      </DashboardLayout>
    </PrivateRoute>
  );
}
