"use client";
import Link from "next/link";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";

export default function Navbar() {
  const { user, logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const links = (
    <>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/doctors">Find Doctors</Link></li>
      <li><Link href="/about">About Us</Link></li>
      <li><Link href="/contact">Contact Us</Link></li>
      {user && <li><Link href="/dashboard">Dashboard</Link></li>}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52">
            {links}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl font-bold text-primary">নিরাময়</Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || "User"}`}
                  alt="user"
                />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52">
              <li className="px-2 font-semibold">{user.displayName}</li>
              <li><Link href="/dashboard">Dashboard</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <>
            <Link href="/login" className="btn btn-outline btn-primary btn-sm">Login</Link>
            <Link href="/register" className="btn btn-primary btn-sm">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}