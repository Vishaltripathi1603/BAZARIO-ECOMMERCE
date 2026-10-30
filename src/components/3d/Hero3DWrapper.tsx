"use client";

import React from "react";
import dynamic from "next/dynamic";

const Hero3DCanvas = dynamic(() => import("./Hero3DCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[420px] flex items-center justify-center bg-slate-900/5 rounded-3xl animate-pulse">
      <img
        src="/images/hero/hero-banner.svg"
        alt="Bazario Marketplace 3D Preview"
        className="max-h-[380px] w-auto object-contain opacity-70"
      />
    </div>
  ),
});

export default function Hero3DWrapper() {
  return <Hero3DCanvas />;
}
