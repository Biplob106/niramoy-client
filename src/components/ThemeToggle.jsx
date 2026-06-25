"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  // আগের পছন্দ লোড করো
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <button
      onClick={toggle}
      className="btn btn-ghost btn-circle"
      aria-label="theme toggle"
      title={theme === "light" ? "ডার্ক মোড" : "লাইট মোড"}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
