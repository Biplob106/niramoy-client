import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t-4 border-primary bg-base-200">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* ব্র্যান্ড */}
        <div>
          <Link href="/" className="flex items-center gap-2 mb-3">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary text-white font-bold shadow-md">
              নি
            </span>
            <span className="text-2xl font-extrabold text-gradient">নিরাময়</span>
          </Link>
          <p className="text-sm opacity-70">
            আপনার বিশ্বস্ত স্বাস্থ্যসেবা সঙ্গী। যেকোনো সময়, যেকোনো জায়গা থেকে
            অভিজ্ঞ ডাক্তারের সাথে অ্যাপয়েন্টমেন্ট নিন।
          </p>
        </div>

        {/* কুইক লিংক */}
        <div>
          <h3 className="font-semibold mb-3">কুইক লিংক</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="link link-hover hover:text-primary">হোম</Link></li>
            <li><Link href="/doctors" className="link link-hover hover:text-primary">ডাক্তার খুঁজুন</Link></li>
            <li><Link href="/about" className="link link-hover hover:text-primary">আমাদের সম্পর্কে</Link></li>
            <li><Link href="/contact" className="link link-hover hover:text-primary">যোগাযোগ</Link></li>
          </ul>
        </div>

        {/* যোগাযোগ */}
        <div>
          <h3 className="font-semibold mb-3">যোগাযোগ</h3>
          <ul className="space-y-2 text-sm opacity-70">
            <li>📍 ঢাকা, বাংলাদেশ</li>
            <li>✉️ support@niramoy.com</li>
            <li>📞 +880 1700-000000</li>
          </ul>
          <div className="mt-3 inline-flex items-center gap-2 bg-error/10 text-error font-semibold rounded-xl px-3 py-2 text-sm">
            🚨 জরুরি হটলাইন: 10666
          </div>
        </div>

        {/* সোশ্যাল */}
        <div>
          <h3 className="font-semibold mb-3">সোশ্যাল মিডিয়া</h3>
          <div className="flex gap-3">
            {[
              { label: "Facebook", icon: "f", href: "https://facebook.com" },
              { label: "Twitter", icon: "t", href: "https://twitter.com" },
              { label: "YouTube", icon: "▶", href: "https://youtube.com" },
              { label: "LinkedIn", icon: "in", href: "https://linkedin.com" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-circle btn-sm bg-base-100 border-base-300 hover:bg-primary hover:text-primary-content hover:border-primary transition"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* কপিরাইট */}
      <div className="border-t border-base-300">
        <p className="text-center text-sm opacity-60 py-4">
          © {new Date().getFullYear()} নিরাময় — সর্বস্বত্ব সংরক্ষিত।
        </p>
      </div>
    </footer>
  );
}
