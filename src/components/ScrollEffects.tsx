"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initScrollEffects } from "@/lib/scroll-effects";

export default function ScrollEffects() {
  const pathname = usePathname();
  useEffect(() => {
    // Wait a frame so the new route's DOM is in place.
    let cleanup: (() => void) | undefined;
    const id = requestAnimationFrame(() => {
      cleanup = initScrollEffects();
    });
    return () => {
      cancelAnimationFrame(id);
      cleanup?.();
    };
  }, [pathname]);
  return null;
}
