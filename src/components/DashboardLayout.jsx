"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useRole from "@/hooks/useRole";

export default function DashboardLayout({ children }) {
  const { role, roleLoading } = useRole();
  const pathname = usePathname();

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
      <div className="drawer-side z-40">
        <label htmlFor="dash-drawer" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-64 p-4 border-r border-base-300">
          <li className="mb-4">
            <Link href="/" className="flex items-center gap-2 hover:bg-transparent">
              <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary text-white font-bold shadow-md">
                নি
              </span>
              <span className="text-xl font-extrabold text-gradient">নিরাময়</span>
            </Link>
          </li>
          {role && (
            <li className="menu-title uppercase text-xs">{role} panel</li>
          )}
          {roleLoading ? (
            <li><span className="loading loading-spinner loading-sm"></span></li>
          ) : (
            links.map((link) => {
              const active =
                link.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`font-medium transition ${
                      active
                        ? "bg-primary text-primary-content hover:bg-primary"
                        : "hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })
          )}
          <div className="divider"></div>
          <li><Link href="/">← হোমে ফিরুন</Link></li>
        </ul>
      </div>
    </div>
  );
}