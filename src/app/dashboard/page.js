"use client";
import PrivateRoute from "@/components/PrivateRoute";
import useAuth from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();
  return (
    <PrivateRoute>
      <div className="min-h-screen p-10">
        <h1 className="text-3xl font-bold">Welcome, {user?.displayName} 👋</h1>
        <p className="mt-2 opacity-70">This is your private dashboard.</p>
      </div>
    </PrivateRoute>
  );
}