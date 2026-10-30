import React, { Suspense } from "react";
import { Metadata } from "next";
import SignInForm from "./SignInForm";

export const metadata: Metadata = {
  title: "Sign In to Your Account | Bazario",
  description: "Sign in to Bazario to track orders, manage addresses, and access your personalized marketplace wishlist.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center text-slate-500 text-sm">
          Loading sign in...
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}
