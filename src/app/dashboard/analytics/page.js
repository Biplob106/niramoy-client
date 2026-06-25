"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import PrivateRoute from "@/components/PrivateRoute";
import DashboardLayout from "@/components/DashboardLayout";
import useAxiosSecure from "@/hooks/useAxiosSecure";

export default function AnalyticsPage() {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/admin-stats")
      .then((res) => setStats(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <PrivateRoute>
        <DashboardLayout>
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        </DashboardLayout>
      </PrivateRoute>
    );
  }

  const totals = stats?.totals || {};
  const performance = stats?.doctorPerformance || [];

  return (
    <PrivateRoute>
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-2">Analytics</h1>
        <p className="opacity-70 mb-6">প্ল্যাটফর্মের সারসংক্ষেপ ও ডাক্তারদের পারফরম্যান্স।</p>

        {/* মোট পরিসংখ্যান */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="stat bg-base-100 shadow rounded-box">
            <div className="stat-title">Patients</div>
            <div className="stat-value text-primary">{totals.patients || 0}</div>
          </div>
          <div className="stat bg-base-100 shadow rounded-box">
            <div className="stat-title">Doctors</div>
            <div className="stat-value text-info">{totals.doctors || 0}</div>
          </div>
          <div className="stat bg-base-100 shadow rounded-box">
            <div className="stat-title">Appointments</div>
            <div className="stat-value text-secondary">{totals.appointments || 0}</div>
          </div>
          <div className="stat bg-base-100 shadow rounded-box">
            <div className="stat-title">Revenue</div>
            <div className="stat-value text-success">৳{totals.totalRevenue || 0}</div>
          </div>
        </div>

        {/* ডাক্তার পারফরম্যান্স bar chart */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-lg mb-4">
              ডাক্তারদের গড় রেটিং
            </h2>
            {performance.length === 0 ? (
              <p className="opacity-60">এখনো কোনো রিভিউ ডেটা নেই।</p>
            ) : (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={performance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="doctorName" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Bar
                    dataKey="avgRating"
                    name="গড় রেটিং"
                    fill="#570df8"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </DashboardLayout>
    </PrivateRoute>
  );
}
