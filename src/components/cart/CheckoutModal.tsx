"use client";

import React, { useState } from "react";
import { X, CheckCircle2, ShieldCheck, ArrowRight, Truck, CreditCard, QrCode, Banknote, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    items,
    total,
    subtotal,
    discountAmount,
    shipping,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<"shipping" | "payment" | "confirmed">("shipping");
  const [shippingInfo, setShippingInfo] = useState({
    name: "Arjun Verma",
    email: "arjun.verma@example.com",
    phone: "+91 98765 43210",
    address: "Flat 402, Green Meadows Residency, Indiranagar",
    city: "Bengaluru",
    pincode: "560038",
    state: "Karnataka",
  });
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">("upi");
  const [orderId, setOrderId] = useState("");

  if (!isCheckoutOpen) return null;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePlaceOrder = () => {
    const randomId = "BN-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
    setStep("confirmed");
    clearCart();
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep("shipping");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Checkout"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-md animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              BambooNest Checkout
            </span>
            <span className="text-xs text-stone-400 font-medium">
              ({items.length} {items.length === 1 ? "item" : "items"})
            </span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === "shipping" && (
            <form onSubmit={handleShippingSubmit} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                  Step 1: Shipping Destination
                </h3>
                <p className="text-xs text-stone-500">
                  Enter your address for plastic-free unbleached packaging delivery.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.name}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Street Address & Apartment *
                </label>
                <input
                  type="text"
                  required
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.state}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.pincode}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, pincode: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 min-h-[44px]"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-stone-100 dark:border-stone-800">
                <span className="text-xs text-stone-500 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-700" />
                  Estimated Dispatch: Within 24 Hours
                </span>
                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs transition flex items-center gap-1.5 min-h-[44px]"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {step === "payment" && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                  Step 2: Payment Method
                </h3>
                <p className="text-xs text-stone-500">
                  Choose your preferred payment method.
                </p>
              </div>

              {/* Payment Selectors */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition min-h-[56px] ${
                    paymentMethod === "upi"
                      ? "border-emerald-700 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300"
                      : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <QrCode className="w-5 h-5 text-emerald-700" />
                    <div>
                      <p className="text-xs font-bold">UPI / Instant QR (Recommended)</p>
                      <p className="text-[11px] text-stone-500">Google Pay, PhonePe, Paytm, BHIM</p>
                    </div>
                  </div>
                  {paymentMethod === "upi" && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition min-h-[56px] ${
                    paymentMethod === "card"
                      ? "border-emerald-700 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300"
                      : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-emerald-700" />
                    <div>
                      <p className="text-xs font-bold">Credit / Debit Card</p>
                      <p className="text-[11px] text-stone-500">Visa, Mastercard, RuPay, Amex</p>
                    </div>
                  </div>
                  {paymentMethod === "card" && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition min-h-[56px] ${
                    paymentMethod === "cod"
                      ? "border-emerald-700 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300"
                      : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Banknote className="w-5 h-5 text-emerald-700" />
                    <div>
                      <p className="text-xs font-bold">Cash on Delivery (COD)</p>
                      <p className="text-[11px] text-stone-500">Pay cash upon delivery verification</p>
                    </div>
                  </div>
                  {paymentMethod === "cod" && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  )}
                </button>
              </div>

              {/* Order Summary Pill */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-500">Items Subtotal:</span>
                  <span className="font-semibold text-stone-900 dark:text-white">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount:</span>
                    <span>- ₹{discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-stone-500">Shipping:</span>
                  <span className="font-semibold text-stone-900 dark:text-white">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 dark:border-stone-700 text-sm font-black text-stone-900 dark:text-white">
                  <span>Payable Amount:</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep("shipping")}
                  className="text-xs font-semibold text-stone-500 hover:text-stone-800 dark:hover:text-stone-300 min-h-[44px]"
                >
                  &larr; Back to Address
                </button>
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs transition flex items-center gap-1.5 shadow-lg min-h-[44px]"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirm Order (₹{total.toLocaleString("en-IN")})</span>
                </button>
              </div>
            </div>
          )}

          {step === "confirmed" && (
            <div className="py-8 text-center space-y-5 animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-400 mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>

              <div className="space-y-1.5">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900">
                  Order Successfully Placed!
                </span>
                <h3 className="text-2xl font-black text-stone-900 dark:text-white mt-2">
                  Thank You for Supporting Sustainable Living!
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Order Reference: <strong className="font-mono text-emerald-800 dark:text-emerald-400">{orderId}</strong>
                </p>
              </div>

              {/* Eco Impact Badge */}
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-300 flex items-center gap-2 max-w-sm mx-auto text-left">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                <span>
                  <strong>Ecological Impact:</strong> This simulated order prevented ~2.4 kg of single-use petroleum plastic from entering landfills.
                </span>
              </div>

              <div className="p-4 bg-stone-50 dark:bg-stone-800 rounded-2xl text-xs text-stone-600 dark:text-stone-400 max-w-sm mx-auto text-left space-y-1">
                <p><strong>Shipping To:</strong> {shippingInfo.name}</p>
                <p className="truncate">{shippingInfo.address}, {shippingInfo.city} - {shippingInfo.pincode}</p>
                <p><strong>Dispatch:</strong> Tracking SMS sent to {shippingInfo.phone}</p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-8 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow-lg transition min-h-[44px]"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
