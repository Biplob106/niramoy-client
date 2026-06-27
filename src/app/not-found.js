import Link from "next/link";

export const metadata = {
  title: "পেজ পাওয়া যায়নি",
};

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4">
      <div className="relative mb-2">
        <div className="absolute inset-0 -z-10 grid place-items-center text-[10rem] opacity-10 select-none">
          🩺
        </div>
        <h1 className="text-7xl md:text-9xl font-extrabold text-primary leading-none">
          404
        </h1>
      </div>
      <h2 className="text-2xl md:text-3xl font-semibold mt-4 mb-3">
        পেজটি খুঁজে পাওয়া যায়নি
      </h2>
      <p className="opacity-70 max-w-md mb-8">
        দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে। চলুন আবার সুস্থতার পথে ফিরি।
      </p>
      <Link href="/" className="btn btn-secondary btn-lg shadow-lg shadow-secondary/30 transition">
        ← হোমে ফিরুন
      </Link>
    </div>
  );
}
