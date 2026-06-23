import Link from "next/link";
import FeaturedDoctors from "@/components/FeaturedDoctors";
import Statistics from "@/components/Statistics";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  const specializations = [
    { name: "Cardiology", icon: "❤️" },
    { name: "Neurology", icon: "🧠" },
    { name: "Orthopedics", icon: "🦴" },
    { name: "Pediatrics", icon: "👶" },
    { name: "Dermatology", icon: "🌿" },
  ];

  return (
    <div>
      {/* Banner */}
      <section className="hero min-h-[70vh] bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              আপনার সুস্থতার ঠিকানা
            </h1>
            <p className="py-6 text-lg opacity-80">
              নিরাময়ের সাথে সহজেই ডাক্তার খুঁজুন, অ্যাপয়েন্টমেন্ট নিন আর ঘরে বসেই
              স্বাস্থ্যসেবা পান।
            </p>
            <Link href="/doctors" className="btn btn-primary btn-lg">
              ডাক্তার খুঁজুন
            </Link>
          </div>
        </div>
      </section>

      <FeaturedDoctors />
      <Statistics />
      <WhyChoose />
      <Testimonials />


      {/* Specializations */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          আমাদের বিশেষায়িত সেবা
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {specializations.map((s) => (
            <div
              key={s.name}
              className="card bg-base-100 shadow-md hover:shadow-xl transition text-center p-6"
            >
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="font-semibold">{s.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}