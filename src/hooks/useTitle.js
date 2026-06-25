"use client";
import { useEffect } from "react";

// client পেজে dynamic <title> সেট করার জন্য (server metadata-র বিকল্প)
export default function useTitle(title) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | নিরাময়`;
    }
  }, [title]);
}
