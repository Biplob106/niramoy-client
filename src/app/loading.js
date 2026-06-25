export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="text-primary font-semibold text-lg">নিরাময় লোড হচ্ছে...</p>
    </div>
  );
}
