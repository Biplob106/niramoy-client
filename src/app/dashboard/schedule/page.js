"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import DashboardLayout from "@/components/DashboardLayout";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useTitle from "@/hooks/useTitle";

// সপ্তাহের দিনগুলো (label বাংলায়, value ইংরেজিতে — booking page-এর সাথে মিল রাখতে)
const WEEK_DAYS = [
  { value: "Sat", label: "শনি" },
  { value: "Sun", label: "রবি" },
  { value: "Mon", label: "সোম" },
  { value: "Tue", label: "মঙ্গল" },
  { value: "Wed", label: "বুধ" },
  { value: "Thu", label: "বৃহস্পতি" },
  { value: "Fri", label: "শুক্র" },
];

export default function SchedulePage() {
  useTitle("সময়সূচি");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [days, setDays] = useState([]);
  const [slots, setSlots] = useState([]);
  const [newSlot, setNewSlot] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // আগের schedule লোড করো
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/doctors/profile/${user.email}`)
        .then((res) => {
          const d = res.data;
          setDays(d.availableDays || []);
          setSlots(d.availableSlots || []);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user]);

  // দিন toggle করা
  const toggleDay = (value) => {
    setDays((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value]
    );
  };

  // নতুন slot যোগ করা
  const addSlot = () => {
    const slot = newSlot.trim();
    if (!slot) return;
    if (slots.includes(slot)) {
      return toast.error("এই স্লটটি আগে থেকেই আছে");
    }
    setSlots((prev) => [...prev, slot]);
    setNewSlot("");
  };

  // slot মুছে ফেলা
  const removeSlot = (slot) => {
    setSlots((prev) => prev.filter((s) => s !== slot));
  };

  // schedule save করা (শুধু days + slots পাঠাই, verification status অক্ষত থাকে)
  const handleSave = async () => {
    if (days.length === 0) {
      return toast.error("অন্তত একটি দিন নির্বাচন করুন");
    }
    if (slots.length === 0) {
      return toast.error("অন্তত একটি সময় স্লট যোগ করুন");
    }
    setSaving(true);
    try {
      await axiosSecure.put(`/doctors/profile/${user.email}`, {
        availableDays: days,
        availableSlots: slots,
      });
      toast.success("সময়সূচি সংরক্ষিত হয়েছে!");
    } catch {
      toast.error("সংরক্ষণ ব্যর্থ হয়েছে");
    } finally {
      setSaving(false);
    }
  };

  return (
    <PrivateRoute>
      <DashboardLayout>
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold mb-2">Manage Schedule</h1>
          <p className="opacity-70 mb-6">
            আপনার উপলব্ধ দিন ও সময় স্লট নির্ধারণ করুন।
          </p>

          {loading ? (
            <div className="flex justify-center py-10">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Available Days */}
              <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                  <h2 className="card-title text-lg">উপলব্ধ দিন</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {WEEK_DAYS.map((day) => (
                      <button
                        key={day.value}
                        type="button"
                        onClick={() => toggleDay(day.value)}
                        className={`btn btn-sm ${
                          days.includes(day.value) ? "btn-primary" : "btn-outline"
                        }`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Available Slots */}
              <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                  <h2 className="card-title text-lg">সময় স্লট</h2>
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={newSlot}
                      onChange={(e) => setNewSlot(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSlot();
                        }
                      }}
                      placeholder="যেমন: 10:00 AM"
                      className="input input-bordered w-full"
                    />
                    <button
                      type="button"
                      onClick={addSlot}
                      className="btn btn-primary"
                    >
                      যোগ করুন
                    </button>
                  </div>

                  {slots.length === 0 ? (
                    <p className="opacity-60 text-sm mt-3">
                      এখনো কোনো স্লট যোগ করা হয়নি।
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {slots.map((slot) => (
                        <div
                          key={slot}
                          className="badge badge-lg badge-outline gap-2 py-3"
                        >
                          {slot}
                          <button
                            type="button"
                            onClick={() => removeSlot(slot)}
                            className="text-error font-bold"
                            aria-label={`remove ${slot}`}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="btn btn-primary w-full"
              >
                {saving ? "সংরক্ষণ হচ্ছে..." : "সময়সূচি সংরক্ষণ করুন"}
              </button>
            </div>
          )}
        </div>
      </DashboardLayout>
    </PrivateRoute>
  );
}
