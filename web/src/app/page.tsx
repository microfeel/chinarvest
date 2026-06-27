"use client";

import { useEffect } from "react";
import { LOCALES } from "@/lib/site";

export default function RootRedirect() {
  useEffect(() => {
    const detected = navigator.language?.slice(0, 2).toLowerCase() || "";
    const target = LOCALES.includes(detected as any) ? `/${detected}` : "/en";
    window.location.replace(target);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
      <p>Loading...</p>
    </div>
  );
}
