export default function DashboardLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <span className="loading loading-dots loading-lg text-primary"></span>
      <p className="opacity-70">ড্যাশবোর্ড প্রস্তুত হচ্ছে...</p>
    </div>
  );
}
