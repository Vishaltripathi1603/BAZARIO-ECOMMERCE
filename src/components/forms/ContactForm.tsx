"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Product Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-12 text-center space-y-4 animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-400 mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-stone-900 dark:text-white">
          Message Received!
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-sm mx-auto">
          Thank you for reaching out to BambooNest. In this prototype demonstration, form submissions simulate successful communication.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition min-h-[44px]"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="contact-name"
          className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2"
        >
          Full Name *
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Priya Sharma"
          className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-3 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-700 min-h-[44px]"
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2"
        >
          Email Address *
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="e.g. priya@example.com"
          className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-3 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-700 min-h-[44px]"
        />
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2"
        >
          Inquiry Topic
        </label>
        <select
          id="contact-subject"
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-3 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-700 min-h-[44px]"
        >
          <option value="Product Inquiry">Product Inquiry & Dimensions</option>
          <option value="Bulk Order">Bulk / Corporate Office Order</option>
          <option value="Sustainability Certification">
            Sustainability & Material Audit
          </option>
          <option value="Academic Feedback">
            Academic Evaluation (Group SEO-027)
          </option>
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2"
        >
          Message *
        </label>
        <textarea
          id="contact-message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          placeholder="How can our sustainable bamboo team assist you?"
          className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-3 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-lg hover:shadow-xl transition min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
      >
        <Send className="w-4 h-4" />
        <span>Submit Inquiry</span>
      </button>
    </form>
  );
}
