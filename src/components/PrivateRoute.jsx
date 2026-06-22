"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");   // চেক শেষ + login নেই → login পেজে পাঠাও
    }
  }, [loading, user, router]);

  // এখনো চেক করছে → spinner (redirect কোরো না — এটাই refresh ঠেকায়)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (user) return children;  // login আছে → পেজ দেখাও
  return null;                // login নেই → কিছু না (redirect হচ্ছে)
}