"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { axiosPublic } from "@/lib/axios";
import useTitle from "@/hooks/useTitle";

export default function DoctorsPage() {
  useTitle("ডাক্তার খুঁজুন");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);          // ← এখনকার পেজ
  const [totalPages, setTotalPages] = useState(1); // ← মোট কয় পেজ
  const [view, setView] = useState("card");        // ← card / table লেআউট

  useEffect(() => {
    setLoading(true);
    axiosPublic
      .get(`/doctors?search=${search}&sort=${sort}&page=${page}`)
      .then((res) => {
        setDoctors(res.data.doctors);     // ← এখন ডেটা res.data.doctors-এ
        setTotalPages(res.data.totalPages);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [search, sort, page]);

  // search বা sort বদলালে আবার ১ নম্বর পেজে ফেরা
  useEffect(() => {
    setPage(1);
  }, [search, sort]);

  return (
    <div className="min-h-screen py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">ডাক্তার খুঁজুন</h1>
        <p className="opacity-60 mt-2">নাম বা বিশেষত্ব দিয়ে আপনার পছন্দের বিশেষজ্ঞ খুঁজুন</p>
      </div>

      <div className="card bg-base-100 shadow-md border border-base-200 p-4 mb-10 flex flex-col md:flex-row justify-center gap-3">
        <input
          type="text"
          placeholder="নাম বা বিশেষত্ব দিয়ে খুঁজুন..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-bordered"
        >
          <option value="">Sort by</option>
          <option value="fee-asc">Fee: Low to High</option>
          <option value="fee-desc">Fee: High to Low</option>
          <option value="experience">Experience</option>
          <option value="rating">Highest Rating</option>
        </select>

        {/* লেআউট পরিবর্তন: কার্ড ↔ টেবিল */}
        <div className="join">
          <button
            onClick={() => setView("card")}
            className={`btn join-item ${view === "card" ? "btn-primary" : "btn-outline"}`}
            aria-label="card view"
          >
            ▦ কার্ড
          </button>
          <button
            onClick={() => setView("table")}
            className={`btn join-item ${view === "table" ? "btn-primary" : "btn-outline"}`}
            aria-label="table view"
          >
            ☰ টেবিল
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : doctors.length === 0 ? (
        <p className="text-center opacity-60">কোনো ডাক্তার পাওয়া যায়নি।</p>
      ) : (
        <>
          {view === "card" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {doctors.map((doc) => (
                <div
                  key={doc._id}
                  className="card-hover card bg-base-100 shadow-md border border-base-200 overflow-hidden"
                >
                  <div className="h-16 bg-gradient-to-r from-primary to-accent"></div>
                  <div className="card-body items-center text-center -mt-12 pt-0">
                    <img
                      src={doc.profileImage}
                      alt={doc.doctorName}
                      className="rounded-full w-24 h-24 object-cover ring-4 ring-base-100 shadow-lg"
                    />
                    <h3 className="card-title mt-2">{doc.doctorName}</h3>
                    <div className="badge badge-primary badge-outline">
                      {doc.specialization}
                    </div>
                    <p className="text-sm opacity-70">
                      {doc.experience} years • {doc.hospitalName}
                    </p>
                    <p className="font-bold text-primary text-lg">
                      ৳{doc.consultationFee}
                    </p>
                    <Link
                      href={`/doctors/${doc._id}`}
                      className="btn btn-primary btn-sm btn-block mt-2"
                    >
                      বিস্তারিত দেখুন
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Doctor</th>
                    <th>Specialization</th>
                    <th>Experience</th>
                    <th>Fee</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doc) => (
                    <tr key={doc._id}>
                      <td className="flex items-center gap-2">
                        <img
                          src={doc.profileImage}
                          alt={doc.doctorName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {doc.doctorName}
                      </td>
                      <td>{doc.specialization}</td>
                      <td>{doc.experience} years</td>
                      <td className="font-semibold text-primary">৳{doc.consultationFee}</td>
                      <td>
                        <Link
                          href={`/doctors/${doc._id}`}
                          className="btn btn-primary btn-xs"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination বাটন */}
          <div className="flex justify-center gap-2 mt-10">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`btn btn-sm ${page === i + 1 ? "btn-primary" : "btn-outline"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}