"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const { user, logOut } = useAuth();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const navItems = [
    { href: "/", label: "হোম" },
    { href: "/doctors", label: "ডাক্তার" },
    { href: "/about", label: "আমাদের সম্পর্কে" },
    { href: "/contact", label: "যোগাযোগ" },
  ];
  if (user) navItems.push({ href: "/dashboard", label: "ড্যাশবোর্ড" });

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const links = navItems.map((item) => (
    <li key={item.href}>
      <Link
        href={item.href}
        className={`font-medium ${
          isActive(item.href) ? "text-primary bg-primary/10" : ""
        }`}
      >
        {item.label}
      </Link>
    </li>
  ));

  return (
    <div className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-lg border-b border-base-200">
      <div className="navbar max-w-7xl mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow-lg bg-base-100 rounded-box w-52">
              {links}
            </ul>
          </div>
          <Link href="/" className="flex items-center gap-2 px-2">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary text-white font-bold shadow-md">
              নি
            </span>
            <span className="text-2xl font-extrabold text-gradient">নিরাময়</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">{links}</ul>
        </div>

        <div className="navbar-end gap-2">
          <ThemeToggle />
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring-2 ring-primary/30 hover:ring-primary transition">
                <div className="w-10 rounded-full">
                  <img
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || "User"}&background=0e9f8e&color=fff`}
                    alt="user"
                  />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow-lg bg-base-100 rounded-box w-52">
                <li className="px-2 py-1 font-semibold text-primary">{user.displayName}</li>
                <div className="divider my-0"></div>
                <li><Link href="/dashboard">ড্যাশবোর্ড</Link></li>
                <li><button onClick={handleLogout} className="text-error">লগআউট</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-outline btn-primary btn-sm">লগইন</Link>
              <Link href="/register" className="btn btn-primary btn-sm shadow-md">রেজিস্টার</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
