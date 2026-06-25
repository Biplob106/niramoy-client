import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-base-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* ব্র্যান্ড */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-3">নিরাময়</h2>
          <p className="text-sm opacity-70">
            আপনার বিশ্বস্ত স্বাস্থ্যসেবা সঙ্গী। যেকোনো সময়, যেকোনো জায়গা থেকে
            অভিজ্ঞ ডাক্তারের সাথে অ্যাপয়েন্টমেন্ট নিন।
          </p>
        </div>

        {/* কুইক লিংক */}
        <div>
          <h3 className="font-semibold mb-3">কুইক লিংক</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="link link-hover">হোম</Link></li>
            <li><Link href="/doctors" className="link link-hover">ডাক্তার খুঁজুন</Link></li>
            <li><Link href="/about" className="link link-hover">আমাদের সম্পর্কে</Link></li>
            <li><Link href="/contact" className="link link-hover">যোগাযোগ</Link></li>
          </ul>
        </div>

        {/* যোগাযোগ */}
        <div>
          <h3 className="font-semibold mb-3">যোগাযোগ</h3>
          <ul className="space-y-2 text-sm opacity-70">
            <li>📍 ঢাকা, বাংলাদেশ</li>
            <li>✉️ support@niramoy.com</li>
            <li>📞 +880 1700-000000</li>
            <li className="text-error font-semibold">
              🚨 জরুরি হটলাইন: 10666
            </li>
          </ul>
        </div>

        {/* সোশ্যাল */}
        <div>
          <h3 className="font-semibold mb-3">সোশ্যাল মিডিয়া</h3>
          <div className="flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle btn-sm btn-outline"
              aria-label="Facebook"
            >
              f
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle btn-sm btn-outline"
              aria-label="Twitter"
            >
              t
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle btn-sm btn-outline"
              aria-label="YouTube"
            >
              ▶
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle btn-sm btn-outline"
              aria-label="LinkedIn"
            >
              in
            </a>
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
