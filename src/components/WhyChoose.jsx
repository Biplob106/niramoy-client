"use client";
import { motion } from "framer-motion";

export default function WhyChoose() {
  const features = [
    { icon: "⚡", title: "দ্রুত অ্যাপয়েন্টমেন্ট", desc: "মিনিটেই পছন্দের ডাক্তারের সাথে সময় বুক করুন।" },
    { icon: "🔒", title: "নিরাপদ তথ্য", desc: "আপনার স্বাস্থ্য তথ্য সুরক্ষিত ও গোপন থাকে।" },
    { icon: "🩺", title: "যাচাইকৃত ডাক্তার", desc: "সব ডাক্তার আমাদের দ্বারা যাচাই করা।" },
    { icon: "💳", title: "সহজ পেমেন্ট", desc: "অনলাইনে নিরাপদে ফি পরিশোধ করুন।" },
  ];

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">কেন নিরাময়?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="card bg-base-100 shadow-md p-6 flex flex-row items-center gap-4"
          >
            <div className="text-4xl">{f.icon}</div>
            <div>
              <h3 className="font-bold text-lg">{f.title}</h3>
              <p className="opacity-70 text-sm">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}