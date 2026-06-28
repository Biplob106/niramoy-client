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
    <section className="bg-accent text-accent-content py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-accent-content/70 mb-3">
          কেন আমরা
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">কেন নিরাময়?</h2>
        <p className="text-center text-accent-content/70 mb-12 max-w-xl mx-auto">
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
              className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm p-6 text-center transition hover:bg-white/15 hover:-translate-y-1.5"
            >
              <div className="grid place-items-center w-16 h-16 mx-auto rounded-2xl bg-white/15 text-3xl mb-4">
                {f.icon}
              </div>
              <h3 className="font-bold text-lg">{f.title}</h3>
              <p className="text-accent-content/75 text-sm mt-2">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
