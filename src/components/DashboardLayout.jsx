"use client";
import Link from "next/link";
import useRole from "@/hooks/useRole";

export default function DashboardLayout({ children }) {
  const { role, roleLoading } = useRole();

  // role অনুযায়ী মেনু
  const menus = {
    patient: [
      { label: "Overview", href: "/dashboard" },
      { label: "My Appointments", href: "/dashboard/appointments" },
      { label: "Payment History", href: "/dashboard/payments" },
      { label: "My Reviews", href: "/dashboard/reviews" },
      { label: "My Profile", href: "/dashboard/profile" },
    ],
    doctor: [
      { label: "Overview", href: "/dashboard" },
      { label: "Appointment Requests", href: "/dashboard/requests" },
      { label: "Manage Schedule", href: "/dashboard/schedule" },
      { label: "My Profile", href: "/dashboard/doctor-profile" },
    ],
    admin: [
      { label: "Overview", href: "/dashboard" },
      { label: "Manage Users", href: "/dashboard/users" },
      { label: "Manage Doctors", href: "/dashboard/manage-doctors" },
      { label: "All Appointments", href: "/dashboard/all-appointments" },
      { label: "Analytics", href: "/dashboard/analytics" },
    ],
  };

  const links = menus[role] || [];

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="dash-drawer" type="checkbox" className="drawer-toggle" />

      {/* মূল কন্টেন্ট */}
      <div className="drawer-content p-4">
        {/* মোবাইলে sidebar খোলার বাটন */}
        <label htmlFor="dash-drawer" className="btn btn-primary btn-sm drawer-button lg:hidden mb-4">
          ☰ Menu
        </label>
        {children}
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dash-drawer" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-64 p-4">
          <li className="mb-4">
            <span className="text-xl font-bold text-primary">নিরাময়</span>
          </li>
          {roleLoading ? (
            <li><span className="loading loading-spinner loading-sm"></span></li>
          ) : (
            links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))
          )}
          <div className="divider"></div>
          <li><Link href="/">← Back to Home</Link></li>
        </ul>
      </div>
    </div>
  );
}