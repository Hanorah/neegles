"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

/** next/link that plays the page curtain before navigating. */
export default function TLink({ href, onClick, ...rest }: ComponentProps<typeof Link> & { href: string }) {
  const path = usePathname();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        const [target, hash] = href.split("#");
        if (!target.startsWith("/")) return;
        if (target === path) {
          if (hash) return; // same-page anchor: let smooth scroll handle it
          e.preventDefault();
          window.__lenis?.scrollTo(0, { duration: 1.4 });
          return;
        }
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("neegles:go", { detail: href }));
      }}
    />
  );
}
