"use client";
import { motion } from "framer-motion";

const values = [
  { icon: "🎯", title: "আমাদের লক্ষ্য", text: "প্রতিটি মানুষের কাছে সহজলভ্য ও মানসম্মত স্বাস্থ্যসেবা পৌঁছে দেওয়া।" },
  { icon: "👁️", title: "আমাদের দৃষ্টিভঙ্গি", text: "প্রযুক্তির মাধ্যমে বাংলাদেশের স্বাস্থ্যসেবাকে আধুনিক ও সবার জন্য উন্মুক্ত করা।" },
  { icon: "🤝", title: "আমাদের মূল্যবোধ", text: "রোগীর আস্থা, গোপনীয়তা ও যত্নই আমাদের কাছে সবার আগে।" },
];

const stats = [
  { value: "৫০০+", label: "অভিজ্ঞ ডাক্তার" },
  { value: "১০,০০০+", label: "সন্তুষ্ট রোগী" },
  { value: "২৪/৭", label: "সেবা উপলব্ধ" },
  { value: "৩০+", label: "বিশেষত্ব" },
];

export default function AboutContent() {
  return (
    <div className="min-h-screen">
      {/* হিরো */}
      <section className="bg-primary/5 py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-primary">নিরাময়</span> সম্পর্কে
          </h1>
          <p className="opacity-70 text-lg">
            নিরাময় একটি ডিজিটাল স্বাস্থ্যসেবা প্ল্যাটফর্ম, যেখানে আপনি ঘরে বসেই
            দেশের সেরা ডাক্তারদের সাথে পরামর্শ নিতে পারেন। আমরা স্বাস্থ্যসেবাকে
            সহজ, দ্রুত ও নির্ভরযোগ্য করতে কাজ করছি।
          </p>
        </motion.div>
      </section>

      {/* মূল্যবোধ */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card bg-base-100 shadow-md p-6 text-center"
            >
              <div className="text-4xl mb-3">{v.icon}</div>
              <h3 className="font-bold text-lg mb-2">{v.title}</h3>
              <p className="opacity-70 text-sm">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* পরিসংখ্যান */}
      <section className="bg-primary/5 py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-primary">{s.value}</div>
              <div className="opacity-70 text-sm mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
