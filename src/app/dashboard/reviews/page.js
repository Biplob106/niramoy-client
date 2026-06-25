"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import DashboardLayout from "@/components/DashboardLayout";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useTitle from "@/hooks/useTitle";

export default function MyReviewsPage() {
  useTitle("আমার রিভিউ");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [doctors, setDoctors] = useState([]); // completed appointment-এর doctor তালিকা
  const [loading, setLoading] = useState(true);

  // add form
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  // edit state
  const [editing, setEditing] = useState(null); // review object
  const [editRating, setEditRating] = useState(5);
  const [editText, setEditText] = useState("");

  const loadReviews = () => {
    if (user?.email) {
      axiosSecure
        .get(`/reviews/patient/${user.email}`)
        .then((res) => setReviews(res.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  };

  // completed appointment থেকে review দেওয়ার যোগ্য ডাক্তার বের করা
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/appointments/patient/${user.email}`)
        .then((res) => {
          const completed = res.data.filter(
            (a) => a.appointmentStatus === "completed"
          );
          // doctorId দিয়ে unique করা
          const unique = [];
          const seen = new Set();
          completed.forEach((a) => {
            if (!seen.has(a.doctorId)) {
              seen.add(a.doctorId);
              unique.push({ doctorId: a.doctorId, doctorName: a.doctorName });
            }
          });
          setDoctors(unique);
        })
        .catch(console.error);
      loadReviews();
    }
  }, [user]);

  // নতুন review জমা
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!selectedDoctor) {
      return toast.error("একজন ডাক্তার নির্বাচন করুন");
    }
    const doc = doctors.find((d) => d.doctorId === selectedDoctor);
    try {
      await axiosSecure.post("/reviews", {
        doctorId: doc.doctorId,
        doctorName: doc.doctorName,
        patientId: user.email,
        patientName: user.displayName,
        patientPhoto:
          user.photoURL ||
          `https://ui-avatars.com/api/?name=${user.displayName || "User"}`,
        rating: parseInt(rating),
        reviewText,
      });
      toast.success("রিভিউ যোগ করা হয়েছে!");
      setSelectedDoctor("");
      setRating(5);
      setReviewText("");
      loadReviews();
    } catch {
      toast.error("রিভিউ যোগ ব্যর্থ হয়েছে");
    }
  };

  // edit modal খোলা
  const openEdit = (review) => {
    setEditing(review);
    setEditRating(review.rating);
    setEditText(review.reviewText);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.patch(`/reviews/${editing._id}`, {
        rating: parseInt(editRating),
        reviewText: editText,
      });
      toast.success("রিভিউ আপডেট হয়েছে!");
      setEditing(null);
      loadReviews();
    } catch {
      toast.error("আপডেট ব্যর্থ হয়েছে");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("আপনি কি নিশ্চিত এই রিভিউটি মুছে ফেলতে চান?")) return;
    try {
      await axiosSecure.delete(`/reviews/${id}`);
      toast.success("রিভিউ মুছে ফেলা হয়েছে");
      loadReviews();
    } catch {
      toast.error("মুছে ফেলা ব্যর্থ হয়েছে");
    }
  };

  return (
    <PrivateRoute>
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-2">My Reviews</h1>
        <p className="opacity-70 mb-6">
          সম্পন্ন হওয়া অ্যাপয়েন্টমেন্টের ডাক্তারদের রিভিউ দিন।
        </p>

        {/* নতুন রিভিউ ফর্ম */}
        <div className="card bg-base-100 shadow-md mb-8">
          <div className="card-body">
            <h2 className="card-title text-lg">নতুন রিভিউ</h2>
            {doctors.length === 0 ? (
              <p className="opacity-60 text-sm">
                রিভিউ দেওয়ার জন্য আগে কোনো অ্যাপয়েন্টমেন্ট সম্পন্ন হতে হবে।
              </p>
            ) : (
              <form onSubmit={handleAdd} className="space-y-3">
                <div>
                  <label className="label text-sm">ডাক্তার</label>
                  <select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="select select-bordered w-full"
                  >
                    <option value="">ডাক্তার নির্বাচন করুন</option>
                    {doctors.map((d) => (
                      <option key={d.doctorId} value={d.doctorId}>
                        {d.doctorName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label text-sm">রেটিং</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="select select-bordered w-full"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>
                        {"★".repeat(r)} ({r})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label text-sm">আপনার মতামত</label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="textarea textarea-bordered w-full"
                    placeholder="অভিজ্ঞতা লিখুন..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full">
                  রিভিউ জমা দিন
                </button>
              </form>
            )}
          </div>
        </div>

        {/* আমার রিভিউ তালিকা */}
        <h2 className="text-xl font-bold mb-4">আমার রিভিউসমূহ</h2>
        {loading ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : reviews.length === 0 ? (
          <p className="opacity-60">এখনো কোনো রিভিউ দেননি।</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((r) => (
              <div key={r._id} className="card bg-base-100 shadow-md">
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{r.doctorName}</h3>
                    <div className="text-warning">{"★".repeat(r.rating)}</div>
                  </div>
                  <p className="opacity-80 text-sm">{r.reviewText}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => openEdit(r)}
                      className="btn btn-xs btn-outline btn-info"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="btn btn-xs btn-outline btn-error"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {editing && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">
                রিভিউ এডিট — {editing.doctorName}
              </h3>
              <form onSubmit={handleUpdate} className="space-y-3">
                <div>
                  <label className="label text-sm">রেটিং</label>
                  <select
                    value={editRating}
                    onChange={(e) => setEditRating(e.target.value)}
                    className="select select-bordered w-full"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>
                        {"★".repeat(r)} ({r})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label text-sm">আপনার মতামত</label>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="textarea textarea-bordered w-full"
                    required
                  ></textarea>
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
      </DashboardLayout>
    </PrivateRoute>
  );
}
