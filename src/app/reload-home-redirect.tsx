"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ReloadHomeRedirect() {
  const pathname = usePathname();
  const router = useRouter();
  const checked = useRef(false);

  useEffect(() => {
    if (checked.current) {
      return;
    }

    checked.current = true;
    const navigation = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;

    if (navigation?.type === "reload" && pathname !== "/") {
      router.replace("/");
    }
  }, [pathname, router]);

  return null;
}
