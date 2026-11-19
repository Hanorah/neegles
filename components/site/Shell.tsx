"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Motion from "./Motion";
import Thread from "./Thread";
import Cursor from "./Cursor";
import Transition from "./Transition";
import Loader from "./Loader";

/** Client-side frame around every page: smooth scroll, motion, the scroll thread, cursor, route curtain. */
export default function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  useEffect(() => {
    document.documentElement.dataset.route = path === "/" ? "home" : path.split("/")[1];
  }, [path]);

  return (
    <>
      <SmoothScroll />
      <Loader />
      <Cursor />
      <Transition />
      <div className="page" key={path}>
        {children}
        <Thread />
        <Motion />
      </div>
    </>
  );
}
