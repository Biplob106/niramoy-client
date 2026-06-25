"use client";
import { useEffect, useState } from "react";

const LIGHT = "niramoy";
const DARK = "niramoydark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(LIGHT);

  // আগের পছন্দ লোড করো
  useEffect(() => {
    const saved = localStorage.getItem("theme") || LIGHT;
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggle = () => {
    const next = theme === LIGHT ? DARK : LIGHT;
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <button
      onClick={toggle}
      className="btn btn-ghost btn-circle"
      aria-label="theme toggle"
      title={theme === LIGHT ? "ডার্ক মোড" : "লাইট মোড"}
    >
      {theme === LIGHT ? "🌙" : "☀️"}
    </button>
  );
}
