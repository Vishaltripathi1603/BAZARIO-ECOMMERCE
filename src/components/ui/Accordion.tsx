"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQItem } from "@/lib/types";

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // first open by default

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      {items.map((faq, index) => {
        const isOpen = openIndex === index;
        const headingId = `faq-heading-${index}`;
        const panelId = `faq-panel-${index}`;

        return (
          <div
            key={faq.question}
            className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-sm transition-all"
          >
            <h3>
              <button
                type="button"
                id={headingId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-stone-900 dark:text-stone-100 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors gap-4 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
              >
                <span className="text-base leading-snug">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-stone-400 transition-transform duration-300 shrink-0 ${
                    isOpen ? "rotate-180 text-emerald-800 dark:text-emerald-400" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>

            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={headingId}
                className="px-5 pb-5 pt-1 text-sm text-stone-600 dark:text-stone-400 leading-relaxed border-t border-stone-100 dark:border-stone-800 animate-fadeIn"
              >
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
