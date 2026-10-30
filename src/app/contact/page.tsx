import React from "react";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/seo";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ContactForm from "@/components/forms/ContactForm";
import { Mail, Clock, ShieldCheck, GraduationCap } from "lucide-react";
import { SITE_CONFIG } from "@/../config/site";

export const metadata: Metadata = {
  title: "Contact & Support | Bazario",
  description:
    "Get in touch with the Bazario customer desk for inquiries, technical SEO questions, and product support with fast response times.",
  alternates: {
    canonical: getCanonicalUrl("/contact"),
  },
  openGraph: {
    title: "Contact & Support | Bazario",
    description:
      "Get in touch with the Bazario customer desk for inquiries, technical SEO questions, and product support with fast response times.",
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
      <header className="border-b border-slate-200 dark:border-slate-800 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
          Customer Care &amp; Support
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Contact the {SITE_CONFIG.name} Team
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Have questions regarding our marketplace departments, sustainable sourcing certifications, or academic project architecture? Send us a message below.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Contact Form */}
        <div className="md:col-span-7 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <ContactForm />
        </div>

        {/* Operational & Project Details */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Direct Contact Channels
            </h2>

            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-teal-700 dark:text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Email Desk</p>
                  <p className="text-xs">support@bazario.store</p>
                  <p className="text-[11px] text-slate-400">Avg. response within 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-teal-700 dark:text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Operating Hours</p>
                  <p className="text-xs">Monday – Saturday: 9:00 AM – 7:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-teal-700 dark:text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Verified Prototype</p>
                  <p className="text-xs">Academic Demo &bull; Group SEO-027</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Notice</span>
            </div>
            <p>{SITE_CONFIG.academicNotice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
