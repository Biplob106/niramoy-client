import Link from "next/link";
import FeaturedDoctors from "@/components/FeaturedDoctors";
import Statistics from "@/components/Statistics";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";

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
      <section className="bg-gradient-to-br from-primary to-accent text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 grid lg:grid-cols-2 gap-12 items-center">
          {/* বাম পাশ — টেক্সট */}
          <div className="text-center lg:text-left">
            <span className="badge badge-lg bg-white/15 text-white border-0 font-medium mb-5 backdrop-blur-sm">
              🩺 বিশ্বস্ত স্বাস্থ্যসেবা প্ল্যাটফর্ম
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              আপনার সুস্থতার <span className="text-secondary">নির্ভরযোগ্য</span> ঠিকানা
            </h1>
            <p className="py-6 text-lg text-white/80 max-w-xl mx-auto lg:mx-0">
              নিরাময়ের সাথে সহজেই অভিজ্ঞ ডাক্তার খুঁজুন, অ্যাপয়েন্টমেন্ট নিন আর ঘরে
              বসেই নির্ভরযোগ্য স্বাস্থ্যসেবা পান।
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Link
                href="/doctors"
                className="btn btn-lg bg-white text-primary border-0 hover:bg-white/90 shadow-lg shadow-black/10 transition"
              >
                অ্যাপয়েন্টমেন্ট নিন
              </Link>
              <Link
                href="/doctors"
                className="btn btn-lg btn-outline text-white border-white/60 hover:bg-white hover:text-primary hover:border-white transition"
              >
                ডাক্তার দেখুন
              </Link>
            </div>

            {/* পরিসংখ্যান */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start mt-10">
              <div>
                <div className="text-3xl font-bold">৫০০+</div>
                <div className="text-sm text-white/70">যাচাইকৃত ডাক্তার</div>
              </div>
              <div>
                <div className="text-3xl font-bold">১০হা+</div>
                <div className="text-sm text-white/70">সন্তুষ্ট রোগী</div>
              </div>
              <div>
                <div className="text-3xl font-bold">২৪/৭</div>
                <div className="text-sm text-white/70">সেবা উপলব্ধ</div>
              </div>
            </div>
          </div>

          {/* ডান পাশ — ছবি */}
          <div className="relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-black/20 ring-1 ring-white/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero.png"
                alt="নিরাময় — বিশ্বস্ত ডাক্তার ও স্বাস্থ্যসেবা"
                className="w-full h-[26rem] md:h-[30rem] object-cover"
              />
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
      <Faq />
    </div>
  );
}
