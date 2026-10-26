import React from "react";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/seo";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ContactForm from "@/components/forms/ContactForm";
import { Mail, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Wholesale Support",
  description:
    "Get in touch with the BambooNest customer care and wholesale desk for corporate setups, custom dimensions, and product sustainability audits.",
  alternates: {
    canonical: getCanonicalUrl("/contact"),
  },
  openGraph: {
    title: "Contact & Wholesale Support | BambooNest",
    description:
      "Get in touch with the BambooNest customer care and wholesale desk for corporate setups, custom dimensions, and product sustainability audits.",
    url: getCanonicalUrl("/contact"),
    images: ["/images/hero/hero-banner.svg"],
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ name: "Contact & Support", url: "/contact" }]} />

      {/* Header */}
      <header className="border-b border-stone-200 dark:border-stone-800 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
          Customer Care & Wholesale
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-white tracking-tight">
          Contact the BambooNest Team
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
          Have inquiries regarding custom corporate desk setups, material sustainability certifications, or wholesale orders? Send our specialist team a message below.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Contact Form */}
        <div className="md:col-span-7 bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm">
          <ContactForm />
        </div>

        {/* Operational & Project Details */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-stone-900 dark:text-white">
              Direct Contact Channels
            </h2>

            <div className="space-y-4 text-sm text-stone-600 dark:text-stone-400">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-800 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900 dark:text-white">Email Support</p>
                  <p className="text-xs">support@bamboonest.example.com</p>
                  <p className="text-xs text-stone-400 mt-0.5">Average response time: 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-800 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900 dark:text-white">Dispatch Hours</p>
                  <p className="text-xs">Monday – Saturday: 9:00 AM – 6:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-800 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900 dark:text-white">Project Evaluation Team</p>
                  <p className="text-xs">B.Tech CSE Sem VII — Group SEO-027</p>
                  <p className="text-xs text-stone-400 mt-0.5">E-Commerce Technical SEO Prototype</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
