import React, { Suspense } from "react";
import { Metadata } from "next";
import SignUpForm from "./SignUpForm";

export const metadata: Metadata = {
  title: "Create Your Bazario Account",
  description: "Register a new Bazario account to sync shopping cart, save wishlist items, and manage addresses.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center text-slate-500 text-sm">
          Loading registration...
        </div>
      }
    >
      <SignUpForm />
    </Suspense>
  );
}
