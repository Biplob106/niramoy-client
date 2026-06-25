"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function ContactContent() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // ফর্ম জমা (ডেমো) — toast দেখিয়ে রিসেট
    toast.success("আপনার বার্তা পাঠানো হয়েছে! আমরা শীঘ্রই যোগাযোগ করবো।");
    setForm({ name: "", email: "", message: "" });
  };

  const info = [
    { icon: "📍", title: "ঠিকানা", text: "ঢাকা, বাংলাদেশ" },
    { icon: "✉️", title: "ইমেইল", text: "support@niramoy.com" },
    { icon: "📞", title: "ফোন", text: "+880 1700-000000" },
    { icon: "🚨", title: "জরুরি হটলাইন", text: "10666" },
  ];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-3">
            <span className="text-primary">যোগাযোগ</span> করুন
          </h1>
          <p className="opacity-70">
            আপনার যেকোনো প্রশ্ন বা মতামত আমাদের জানান।
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* তথ্য */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {info.map((item) => (
              <div
                key={item.title}
                className="card bg-base-100 shadow-md p-5 flex-row items-center gap-4"
              >
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="opacity-70 text-sm">{item.text}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* ফর্ম */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="card bg-base-100 shadow-md"
          >
            <form onSubmit={handleSubmit} className="card-body space-y-3">
              <div>
                <label className="label text-sm">নাম</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="label text-sm">ইমেইল</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="label text-sm">বার্তা</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                  rows={4}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full">
                বার্তা পাঠান
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
