"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import DashboardLayout from "@/components/DashboardLayout";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useTitle from "@/hooks/useTitle";

export default function DoctorProfilePage() {
  useTitle("আমার প্রোফাইল");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [form, setForm] = useState({
    doctorName: "", specialization: "", qualifications: "",
    experience: "", consultationFee: "", hospitalName: "",
    profileImage: "", availableDays: "", availableSlots: "",
  });

  // আগের profile থাকলে লোড করো
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/doctors/profile/${user.email}`).then((res) => {
        const d = res.data;
        if (d?.email) {
          setForm({
            doctorName: d.doctorName || "",
            specialization: d.specialization || "",
            qualifications: d.qualifications || "",
            experience: d.experience || "",
            consultationFee: d.consultationFee || "",
            hospitalName: d.hospitalName || "",
            profileImage: d.profileImage || "",
            availableDays: (d.availableDays || []).join(", "),
            availableSlots: (d.availableSlots || []).join(", "),
          });
        }
      });
    }
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.put(`/doctors/profile/${user.email}`, {
        ...form,
        experience: parseInt(form.experience) || 0,
        consultationFee: parseInt(form.consultationFee) || 0,
        availableDays: form.availableDays.split(",").map((s) => s.trim()).filter(Boolean),
        availableSlots: form.availableSlots.split(",").map((s) => s.trim()).filter(Boolean),
        verificationStatus: "unverified", // নতুন/আপডেট হলে admin verify করবে
      });
      toast.success("Profile saved!");
    } catch {
      toast.error("Save failed");
    }
  };

  const fields = [
    ["doctorName", "Doctor Name"], ["specialization", "Specialization"],
    ["qualifications", "Qualifications"], ["experience", "Experience (years)"],
    ["consultationFee", "Consultation Fee"], ["hospitalName", "Hospital Name"],
    ["profileImage", "Profile Image URL"],
    ["availableDays", "Available Days (comma separated: Sun, Mon)"],
    ["availableSlots", "Available Slots (comma separated: 10:00, 11:00)"],
  ];

  return (
    <PrivateRoute>
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-3 max-w-lg">
          {fields.map(([name, label]) => (
            <div key={name}>
              <label className="label text-sm">{label}</label>
              <input
                type="text" name={name} value={form[name]} onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
          ))}
          <button type="submit" className="btn btn-primary w-full">Save Profile</button>
        </form>
      </DashboardLayout>
    </PrivateRoute>
  );
}