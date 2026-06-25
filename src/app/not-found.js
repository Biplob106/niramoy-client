import Link from "next/link";

export const metadata = {
  title: "পেজ পাওয়া যায়নি",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl mb-4">🩺</div>
      <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-3">পেজটি খুঁজে পাওয়া যায়নি</h2>
      <p className="opacity-70 max-w-md mb-8">
        দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।
      </p>
      <Link href="/" className="btn btn-primary">
        ← হোমে ফিরে যান
      </Link>
    </div>
  );
}
