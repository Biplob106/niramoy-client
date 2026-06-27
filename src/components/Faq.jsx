"use client";
import { motion } from "framer-motion";

export default function Faq() {
  const faqs = [
    {
      q: "কীভাবে অ্যাপয়েন্টমেন্ট বুক করব?",
      a: "ডাক্তার পেজ থেকে পছন্দের বিশেষজ্ঞ বেছে নিন, তাঁর প্রোফাইলে গিয়ে সুবিধাজনক সময় নির্বাচন করুন এবং কয়েক ক্লিকেই বুকিং নিশ্চিত করুন।",
    },
    {
      q: "পেমেন্ট কি নিরাপদ?",
      a: "হ্যাঁ। সব পেমেন্ট সুরক্ষিত গেটওয়ের মাধ্যমে প্রক্রিয়া হয়। আপনার কার্ড বা আর্থিক তথ্য আমাদের সার্ভারে সংরক্ষণ করা হয় না।",
    },
    {
      q: "জরুরি অবস্থায় কী করব?",
      a: "জরুরি প্রয়োজনে আমাদের ২৪/৭ হটলাইন ১০৬৬৬-এ কল করুন অথবা নিকটস্থ হাসপাতালের জরুরি বিভাগে যোগাযোগ করুন। নিরাময় তাৎক্ষণিক জীবনরক্ষাকারী সেবার বিকল্প নয়।",
    },
    {
      q: "শিশু ও বয়স্কদের জন্য কি সেবা আছে?",
      a: "অবশ্যই। পেডিয়াট্রিক্স থেকে শুরু করে জেরিয়াট্রিক কেয়ার পর্যন্ত সব বয়সের রোগীর জন্য আমাদের অভিজ্ঞ বিশেষজ্ঞ রয়েছেন।",
    },
    {
      q: "অ্যাপয়েন্টমেন্ট বাতিল বা পরিবর্তন করা যায়?",
      a: "হ্যাঁ, নির্ধারিত সময়ের আগে আপনার ড্যাশবোর্ড থেকে অ্যাপয়েন্টমেন্ট বাতিল বা পুনঃনির্ধারণ করতে পারবেন।",
    },
  ];

  return (
    <section className="py-20 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-primary mb-3">
          সাধারণ জিজ্ঞাসা
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          প্রশ্ন ও উত্তর
        </h2>
        <p className="text-center opacity-60 mb-10">
          আপনার মনে আসা সাধারণ প্রশ্নগুলোর উত্তর এক জায়গায়
        </p>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div
              key={f.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="collapse collapse-arrow rounded-2xl border border-base-300 bg-base-100"
            >
              <input type="radio" name="niramoy-faq" defaultChecked={i === 0} />
              <div className="collapse-title font-semibold text-base">{f.q}</div>
              <div className="collapse-content opacity-75 text-sm">
                <p>{f.a}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
