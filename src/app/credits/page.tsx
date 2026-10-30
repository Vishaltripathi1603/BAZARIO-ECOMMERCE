import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Camera, ExternalLink, ShieldCheck, Heart, Sparkles, BookOpen } from "lucide-react";
import { SITE_CONFIG, getBaseUrl } from "@/lib/seo";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Image Credits & Photographic Attribution | Bazario",
  description:
    "Complete attribution and open licensing disclosure for photography sourced from Pexels, Unsplash, and Pixabay for the Bazario e-commerce prototype.",
  alternates: {
    canonical: `${getBaseUrl()}/credits`,
  },
};

const CREDITED_CREATORS = [
  {
    subject: "Sustainable Bamboo Toothbrushes & Personal Care",
    photographer: "Monstera Production",
    url: "https://www.pexels.com/@monstera",
    platform: "Pexels",
    license: "Pexels Free Commercial License",
  },
  {
    subject: "Natural Bamboo Bathroom Accessories & Hygiene",
    photographer: "Karolina Grabowska",
    url: "https://www.pexels.com/@karolina-grabowska",
    platform: "Pexels",
    license: "Pexels Free Commercial License",
  },
  {
    subject: "Organic Kitchen Bamboo Chopping Boards & Herbs",
    photographer: "Charlotte May",
    url: "https://www.pexels.com/@charlotte-may",
    platform: "Pexels",
    license: "Pexels Free Commercial License",
  },
  {
    subject: "Artisan Travel Cutlery, Bento Box & Linen Prep",
    photographer: "Sarah Chai",
    url: "https://www.pexels.com/@sarah-chai",
    platform: "Pexels",
    license: "Pexels Free Commercial License",
  },
  {
    subject: "Smooth Bamboo Dining Sets & Tableware",
    photographer: "Cottonbro Studio",
    url: "https://www.pexels.com/@cottonbro",
    platform: "Pexels",
    license: "Pexels Free Commercial License",
  },
  {
    subject: "Modern Ergonomic Workstation & Bamboo Desk Caddy",
    photographer: "Designecologist",
    url: "https://www.pexels.com/@designecologist",
    platform: "Pexels",
    license: "Pexels Free Commercial License",
  },
  {
    subject: "Bamboo Stationery Organizer with Storage Drawers",
    photographer: "Dmitry Zvolskiy",
    url: "https://www.pexels.com/@dmitry-zvolskiy",
    platform: "Pexels",
    license: "Pexels Free Commercial License",
  },
  {
    subject: "Dual-Tier Bamboo Monitor Risers & Clean Desk",
    photographer: "Life Of Pix",
    url: "https://www.pexels.com/@life-of-pix",
    platform: "Pexels",
    license: "Pexels Free Commercial License",
  },
  {
    subject: "Qi Fast Wireless Bamboo Charging Pad Hardware",
    photographer: "Negative Space",
    url: "https://www.pexels.com/@negativespace",
    platform: "Pexels",
    license: "Pexels Free Commercial License",
  },
  {
    subject: "Slatted Bath Floor Mats & Spa Charcoal Odor Bags",
    photographer: "Max Vakhtbovych",
    url: "https://www.pexels.com/@max-vakhtbovych",
    platform: "Pexels",
    license: "Pexels Free Commercial License",
  },
  {
    subject: "Acoustic Natural Wood Earphones & Audio Drivers",
    photographer: "Sound On",
    url: "https://www.pexels.com/@sound-on",
    platform: "Pexels",
    license: "Pexels Free Commercial License",
  },
  {
    subject: "Hand-Carved Wooden Keyboards & Tactile Keycaps",
    photographer: "Aphiwat Chuangchoem",
    url: "https://www.pexels.com/@aphiwatchuangchoem",
    platform: "Pexels",
    license: "Pexels Free Commercial License",
  },
];

export default function CreditsPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Image Credits & Licensing", url: "/credits" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-teal-900 via-slate-900 to-slate-950 text-white border border-teal-500/20 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-teal-400 text-xs font-black uppercase tracking-wider">
          <Camera className="w-4 h-4" />
          <span>Open Licensing Disclosure</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
          Photography Credits &amp; Attribution
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          In strict adherence to academic ethics and intellectual property standards, Bazario exclusively uses royalty-free, high-resolution photography under verified permissive licenses. We honor and credit all talented creators whose visuals bring our catalog to life.
        </p>
      </div>

      {/* Licensing Policy Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Pexels License</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            All photos on Pexels can be used for free for commercial and non-commercial purposes. Giving credit is not legally mandatory, but we choose to celebrate every creator.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Unsplash License</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            All images published on Unsplash are granted under a worldwide, non-exclusive license to download, copy, modify, and use freely without asking permission.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-sm">
            <Heart className="w-4 h-4" />
            <span>Pixabay License</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Content is released under simplified Pixabay terms, allowing free usage across commercial digital products and educational research platforms without royalties.
          </p>
        </div>
      </div>

      {/* Attribution Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Photographer Recognition Registry
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified creators whose work is featured in the Bazario flagship showcase
            </p>
          </div>
          <a
            href="/images/CREDITS.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition shrink-0"
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-600" />
            <span>View Raw CREDITS.md</span>
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/60 border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              <tr>
                <th className="py-3 px-6">Product / Catalog Domain</th>
                <th className="py-3 px-6">Photographer / Creator</th>
                <th className="py-3 px-6">Source Platform</th>
                <th className="py-3 px-6">License Model</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {CREDITED_CREATORS.map((c) => (
                <tr
                  key={c.photographer + c.subject}
                  className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition"
                >
                  <td className="py-4 px-6 font-semibold text-slate-800 dark:text-slate-200">
                    {c.subject}
                  </td>
                  <td className="py-4 px-6">
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>{c.photographer}</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                    {c.platform}
                  </td>
                  <td className="py-4 px-6 text-slate-500">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-medium">
                      {c.license}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
