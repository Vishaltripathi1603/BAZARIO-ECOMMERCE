"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";

export default function ToastContainer() {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success" || !toast.type;
        const isWarning = toast.type === "warning";

        return (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-2xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200/90 dark:border-stone-800 shadow-2xl transition-all duration-300 animate-slideUp text-stone-900 dark:text-stone-100"
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              )}
              {isWarning && (
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              )}
              {!isSuccess && !isWarning && (
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-stone-900 dark:text-white leading-tight">
                {toast.title}
              </p>
              {toast.description && (
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-snug">
                  {toast.description}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
              className="shrink-0 p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
