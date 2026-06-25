"use client";
import { motion } from "framer-motion";

export default function WhyChoose() {
  const features = [
    { icon: "⚡", title: "দ্রুত অ্যাপয়েন্টমেন্ট", desc: "মিনিটেই পছন্দের ডাক্তারের সাথে সময় বুক করুন।", color: "bg-primary/10" },
    { icon: "🔒", title: "নিরাপদ তথ্য", desc: "আপনার স্বাস্থ্য তথ্য সুরক্ষিত ও গোপন থাকে।", color: "bg-secondary/10" },
    { icon: "🩺", title: "যাচাইকৃত ডাক্তার", desc: "সব ডাক্তার আমাদের দ্বারা যাচাই করা।", color: "bg-accent/20" },
    { icon: "💳", title: "সহজ পেমেন্ট", desc: "অনলাইনে নিরাপদে ফি পরিশোধ করুন।", color: "bg-info/10" },
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">কেন নিরাময়?</h2>
      <p className="text-center opacity-60 mb-10">
        আপনার স্বাস্থ্যসেবার প্রতিটি ধাপে আমরা পাশে আছি
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="card-hover card bg-base-100 shadow-md border border-base-200 p-6 text-center"
          >
            <div className={`grid place-items-center w-16 h-16 mx-auto rounded-2xl ${f.color} text-3xl mb-4`}>
              {f.icon}
            </div>
            <h3 className="font-bold text-lg">{f.title}</h3>
            <p className="opacity-70 text-sm mt-2">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
