import Link from "next/link";
import FeaturedDoctors from "@/components/FeaturedDoctors";
import Statistics from "@/components/Statistics";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  const specializations = [
    { name: "কার্ডিওলজি", icon: "❤️" },
    { name: "নিউরোলজি", icon: "🧠" },
    { name: "অর্থোপেডিক্স", icon: "🦴" },
    { name: "পেডিয়াট্রিক্স", icon: "👶" },
    { name: "ডার্মাটোলজি", icon: "🌿" },
  ];

  return (
    <div>
      {/* ---------- Banner / Hero ---------- */}
      <section className="bg-hero-mesh">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 grid lg:grid-cols-2 gap-10 items-center">
          {/* বাম পাশ */}
          <div className="text-center lg:text-left">
            <span className="badge badge-lg bg-primary/10 text-primary border-0 font-medium mb-5">
              🩺 আপনার বিশ্বস্ত স্বাস্থ্যসেবা সঙ্গী
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              আপনার <span className="text-gradient">সুস্থতার</span> ঠিকানা
            </h1>
            <p className="py-6 text-lg opacity-80 max-w-xl mx-auto lg:mx-0">
              নিরাময়ের সাথে সহজেই অভিজ্ঞ ডাক্তার খুঁজুন, অ্যাপয়েন্টমেন্ট নিন আর ঘরে
              বসেই নির্ভরযোগ্য স্বাস্থ্যসেবা পান।
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Link href="/doctors" className="btn btn-primary btn-lg shadow-lg shadow-primary/30">
                ডাক্তার খুঁজুন
              </Link>
              <Link href="/about" className="btn btn-outline btn-lg">
                আমাদের সম্পর্কে
              </Link>
            </div>

            {/* ছোট ট্রাস্ট চিপ */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start mt-10">
              <div>
                <div className="text-2xl font-bold text-primary">৫০০+</div>
                <div className="text-sm opacity-60">যাচাইকৃত ডাক্তার</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">১০ হাজার+</div>
                <div className="text-sm opacity-60">সন্তুষ্ট রোগী</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-content">২৪/৭</div>
                <div className="text-sm opacity-60">সেবা উপলব্ধ</div>
              </div>
            </div>
          </div>

          {/* ডান পাশ — ডেকোরেটিভ কার্ড */}
          <div className="relative hidden lg:block">
            <div className="card bg-base-100 shadow-2xl rounded-[2rem] p-8 max-w-sm mx-auto">
              <div className="flex items-center gap-3 mb-5">
                <span className="grid place-items-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary text-white text-2xl shadow-lg">
                  🩺
                </span>
                <div>
                  <p className="font-bold">দ্রুত অ্যাপয়েন্টমেন্ট</p>
                  <p className="text-sm opacity-60">মাত্র কয়েক ক্লিকে</p>
                </div>
              </div>
              <div className="space-y-3">
                {["অনলাইন কনসাল্টেশন", "নিরাপদ পেমেন্ট", "ডিজিটাল প্রেসক্রিপশন"].map(
                  (t) => (
                    <div
                      key={t}
                      className="flex items-center gap-3 bg-base-200 rounded-xl px-4 py-3"
                    >
                      <span className="text-success text-lg">✓</span>
                      <span className="font-medium">{t}</span>
                    </div>
                  )
                )}
              </div>
            </div>
            {/* ফ্লোটিং ব্যাজ */}
            <div className="absolute -top-4 -right-2 badge badge-secondary badge-lg shadow-lg gap-1">
              ⭐ 4.9 রেটিং
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Specializations ---------- */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          আমাদের বিশেষায়িত সেবা
        </h2>
        <p className="text-center opacity-60 mb-10">
          বিভিন্ন বিভাগের অভিজ্ঞ বিশেষজ্ঞ ডাক্তার
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {specializations.map((s) => (
            <div
              key={s.name}
              className="card-hover card bg-base-100 shadow-md border border-base-200 text-center p-6"
            >
              <div className="grid place-items-center w-16 h-16 mx-auto rounded-2xl bg-primary/10 text-3xl mb-3">
                {s.icon}
              </div>
              <h3 className="font-semibold">{s.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <FeaturedDoctors />
      <WhyChoose />
      <Statistics />
      <Testimonials />
    </div>
  );
}
