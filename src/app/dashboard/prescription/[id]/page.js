"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import DashboardLayout from "@/components/DashboardLayout";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useTitle from "@/hooks/useTitle";

export default function PrescriptionPage() {
  useTitle("প্রেসক্রিপশন");
  const { id } = useParams();   // appointment id
  const router = useRouter();
  const axiosSecure = useAxiosSecure();
  const [form, setForm] = useState({ diagnosis: "", medications: "", notes: "" });

  // আগের prescription থাকলে লোড করো
  useEffect(() => {
    axiosSecure.get(`/prescriptions/${id}`).then((res) => {
      const d = res.data;
      if (d?.appointmentId) {
        setForm({
          diagnosis: d.diagnosis || "",
          medications: (d.medications || []).join(", "),
          notes: d.notes || "",
        });
      }
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.put(`/prescriptions/${id}`, {
        diagnosis: form.diagnosis,
        medications: form.medications.split(",").map((s) => s.trim()).filter(Boolean),
        notes: form.notes,
      });
      toast.success("Prescription saved!");
      router.push("/dashboard/requests");
    } catch {
      toast.error("Save failed");
    }
  };

  return (
    <PrivateRoute>
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-6">Prescription</h1>
        <form onSubmit={handleSubmit} className="space-y-3 max-w-lg">
          <div>
            <label className="label text-sm">Diagnosis</label>
            <input type="text" value={form.diagnosis}
              onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
              className="input input-bordered w-full" />
          </div>
          <div>
            <label className="label text-sm">Medications (comma separated)</label>
            <input type="text" value={form.medications}
              onChange={(e) => setForm({ ...form, medications: e.target.value })}
              className="input input-bordered w-full"
              placeholder="Napa, Omeprazole" />
          </div>
          <div>
            <label className="label text-sm">Notes</label>
            <textarea value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="textarea textarea-bordered w-full"></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-full">Save Prescription</button>
        </form>
      </DashboardLayout>
    </PrivateRoute>
  );
}