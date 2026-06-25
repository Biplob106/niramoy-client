"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import DashboardLayout from "@/components/DashboardLayout";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useTitle from "@/hooks/useTitle";

export default function ProfilePage() {
  useTitle("আমার প্রোফাইল");
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [form, setForm] = useState({ name: "", photo: "", phone: "", gender: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/profile/${user.email}`)
        .then((res) => {
          const d = res.data;
          setForm({
            name: d.name || user.displayName || "",
            photo: d.photo || user.photoURL || "",
            phone: d.phone || "",
            gender: d.gender || "",
          });
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // ১. database আপডেট
      await axiosSecure.patch(`/users/profile/${user.email}`, form);
      // ২. Firebase profile-ও আপডেট (নাম ও ছবি)
      await updateUserProfile(form.name, form.photo);
      toast.success("প্রোফাইল আপডেট হয়েছে!");
    } catch {
      toast.error("আপডেট ব্যর্থ হয়েছে");
    } finally {
      setSaving(false);
    }
  };

  return (
    <PrivateRoute>
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        {loading ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="max-w-lg">
            {/* ছবি প্রিভিউ */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={
                  form.photo ||
                  `https://ui-avatars.com/api/?name=${form.name || "User"}`
                }
                alt="profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{form.name}</p>
                <p className="text-sm opacity-60">{user?.email}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="label text-sm">নাম</label>
                <input
                  type="text" name="name" value={form.name} onChange={handleChange}
                  className="input input-bordered w-full" required
                />
              </div>
              <div>
                <label className="label text-sm">ফটো URL</label>
                <input
                  type="text" name="photo" value={form.photo} onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label text-sm">ফোন</label>
                <input
                  type="text" name="phone" value={form.phone} onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="+880..."
                />
              </div>
              <div>
                <label className="label text-sm">লিঙ্গ</label>
                <select
                  name="gender" value={form.gender} onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="">নির্বাচন করুন</option>
                  <option value="male">পুরুষ</option>
                  <option value="female">মহিলা</option>
                  <option value="other">অন্যান্য</option>
                </select>
              </div>
              <button type="submit" disabled={saving} className="btn btn-primary w-full">
                {saving ? "সংরক্ষণ হচ্ছে..." : "প্রোফাইল আপডেট করুন"}
              </button>
            </form>
          </div>
        )}
      </DashboardLayout>
    </PrivateRoute>
  );
}
