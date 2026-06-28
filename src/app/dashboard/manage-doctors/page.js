"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import DashboardLayout from "@/components/DashboardLayout";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useTitle from "@/hooks/useTitle";

export default function ManageDoctorsPage() {
  useTitle("ডাক্তার ম্যানেজমেন্ট");
  const axiosSecure = useAxiosSecure();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDoctors = () => {
    axiosSecure
      .get("/doctors/all")
      .then((res) => setDoctors(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  // verify / reject / un-verify
  const updateStatus = async (id, status) => {
    try {
      await axiosSecure.patch(`/doctors/verify/${id}`, { status });
      const msg = {
        verified: "ডাক্তার ভেরিফাই করা হয়েছে",
        rejected: "ডাক্তার রিজেক্ট করা হয়েছে",
        unverified: "ভেরিফিকেশন বাতিল করা হয়েছে",
      };
      toast.success(msg[status] || "আপডেট হয়েছে");
      loadDoctors();
    } catch {
      toast.error("আপডেট ব্যর্থ হয়েছে");
    }
  };

  const statusBadge = (status) => {
    const map = {
      verified: "badge-success",
      rejected: "badge-error",
      unverified: "badge-warning",
    };
    return map[status] || "badge-ghost";
  };

  return (
    <PrivateRoute>
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-2">Manage Doctors</h1>
        <p className="opacity-70 mb-6">মোট ডাক্তার: {doctors.length}</p>

        {loading ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : doctors.length === 0 ? (
          <p className="opacity-60">কোনো ডাক্তার পাওয়া যায়নি।</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Specialization</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((d) => (
                  <tr key={d._id}>
                    <td className="flex items-center gap-2">
                      {d.profileImage && (
                        <img
                          src={d.profileImage}
                          alt={d.doctorName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      {d.doctorName || "—"}
                    </td>
                    <td>{d.specialization || "—"}</td>
                    <td>{d.email}</td>
                    <td>
                      <span className={`badge ${statusBadge(d.verificationStatus)}`}>
                        {d.verificationStatus || "unverified"}
                      </span>
                    </td>
                    <td className="flex flex-wrap gap-1">
                      {d.verificationStatus !== "verified" && (
                        <button
                          onClick={() => updateStatus(d._id, "verified")}
                          className="btn btn-xs btn-success"
                        >
                          Verify
                        </button>
                      )}
                      {d.verificationStatus !== "rejected" && (
                        <button
                          onClick={() => updateStatus(d._id, "rejected")}
                          className="btn btn-xs btn-error"
                        >
                          Reject
                        </button>
                      )}
                      {d.verificationStatus === "verified" && (
                        <button
                          onClick={() => updateStatus(d._id, "unverified")}
                          className="btn btn-xs btn-warning"
                        >
                          Un-verify
                        </button>
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
