"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import DashboardLayout from "@/components/DashboardLayout";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useTitle from "@/hooks/useTitle";

export default function ManageUsersPage() {
  useTitle("ইউজার ম্যানেজমেন্ট");
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = () => {
    axiosSecure
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // active ↔ suspended toggle
  const toggleSuspend = async (user) => {
    const status = user.status === "suspended" ? "active" : "suspended";
    try {
      await axiosSecure.patch(`/users/suspend/${user._id}`, { status });
      toast.success(
        status === "suspended" ? "ইউজার সাসপেন্ড করা হয়েছে" : "ইউজার সক্রিয় করা হয়েছে"
      );
      loadUsers();
    } catch {
      toast.error("আপডেট ব্যর্থ হয়েছে");
    }
  };

  const deleteUser = async (id) => {
    if (!confirm("আপনি কি নিশ্চিত এই ইউজারকে মুছে ফেলতে চান?")) return;
    try {
      await axiosSecure.delete(`/users/${id}`);
      toast.success("ইউজার মুছে ফেলা হয়েছে");
      loadUsers();
    } catch {
      toast.error("মুছে ফেলা ব্যর্থ হয়েছে");
    }
  };

  const roleBadge = (role) => {
    const map = { admin: "badge-secondary", doctor: "badge-info", patient: "badge-ghost" };
    return map[role] || "badge-ghost";
  };

  return (
    <PrivateRoute>
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-2">Manage Users</h1>
        <p className="opacity-70 mb-6">মোট ইউজার: {users.length}</p>

        {loading ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : users.length === 0 ? (
          <p className="opacity-60">কোনো ইউজার পাওয়া যায়নি।</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name || "—"}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`badge ${roleBadge(u.role)}`}>{u.role}</span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          u.status === "suspended" ? "badge-error" : "badge-success"
                        }`}
                      >
                        {u.status || "active"}
                      </span>
                    </td>
                    <td className="flex flex-wrap gap-1">
                      <button
                        onClick={() => toggleSuspend(u)}
                        className={`btn btn-xs ${
                          u.status === "suspended" ? "btn-success" : "btn-warning"
                        }`}
                      >
                        {u.status === "suspended" ? "Activate" : "Suspend"}
                      </button>
                      <button
                        onClick={() => deleteUser(u._id)}
                        className="btn btn-xs btn-error"
                      >
                        Delete
                      </button>
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
