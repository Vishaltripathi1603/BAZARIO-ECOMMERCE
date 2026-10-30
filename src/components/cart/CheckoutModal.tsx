"use client";

import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { SITE_CONFIG } from "@/../config/site";
import Link from "next/link";

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

  const { user, profile } = useAuth();
  const supabase = createClient();

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
  const [dbOrderId, setDbOrderId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);

  // Load saved addresses and pre-populate if user is authenticated
  React.useEffect(() => {
    async function loadUserAddresses() {
      if (!user) return;
      try {
        const { data } = await supabase
          .from("addresses")
          .select("*")
          .eq("user_id", user.id)
          .order("is_default", { ascending: false });

        if (data && data.length > 0) {
          setSavedAddresses(data);
          const defaultAddr = data.find((a: any) => a.is_default) || data[0];
          setShippingInfo({
            name: defaultAddr.full_name,
            email: user.email || "",
            phone: defaultAddr.phone,
            address: defaultAddr.address_line1 + (defaultAddr.address_line2 ? `, ${defaultAddr.address_line2}` : ""),
            city: defaultAddr.city,
            pincode: defaultAddr.pincode,
            state: defaultAddr.state,
          });
        } else if (profile || user) {
          const first = profile?.first_name || "";
          const last = profile?.last_name || "";
          const fullName = (first + " " + last).trim() || user.email?.split("@")[0] || "Customer";
          setShippingInfo((prev) => ({
            ...prev,
            name: fullName,
            email: user.email || prev.email,
            phone: profile?.phone || prev.phone,
          }));
        }
      } catch (err) {
        console.warn("Could not load user addresses:", err);
      }
    }

    if (isCheckoutOpen) {
      loadUserAddresses();
    }
  }, [user, profile, isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    const randomOrderNumber = "BZ-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomOrderNumber);

    try {
      if (user) {
        // Insert order record into Supabase orders table
        const { data: orderData, error: orderError } = await supabase
          .from("orders")
          .insert({
            user_id: user.id,
            order_number: randomOrderNumber,
            status: "Placed",
            subtotal,
            discount_amount: discountAmount,
            shipping_amount: shipping,
            total_amount: total,
            shipping_address: {
              full_name: shippingInfo.name,
              email: shippingInfo.email,
              phone: shippingInfo.phone,
              address_line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              pincode: shippingInfo.pincode,
            },
            payment_method:
              paymentMethod === "upi"
                ? "UPI / QR Payment"
                : paymentMethod === "card"
                ? "Credit / Debit Card"
                : "Cash on Delivery",
          })
          .select()
          .single();

        if (orderData && !orderError) {
          setDbOrderId(orderData.id);

          // Insert order items
          const orderItemsPayload = items.map((cartItem) => ({
            order_id: orderData.id,
            product_id: cartItem.product.id,
            product_name: cartItem.product.name,
            product_image:
              (typeof cartItem.product.images?.[0] === "string"
                ? cartItem.product.images[0]
                : cartItem.product.images?.[0]?.url) ||
              cartItem.product.image ||
              null,
            quantity: cartItem.quantity,
            unit_price: cartItem.product.price,
            selected_color: cartItem.selectedColor || "Standard",
          }));

          await supabase.from("order_items").insert(orderItemsPayload);

          // Also clear user's remote cart in DB
          await supabase.from("cart_items").delete().eq("user_id", user.id);
        }
      }
    } catch (err) {
      console.warn("Order persisted locally due to guest/mock session:", err);
    } finally {
      setIsSubmitting(false);
      setStep("confirmed");
      clearCart();
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep("shipping");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Academic Checkout Modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Fast Checkout &bull; {SITE_CONFIG.name}
              </h2>
              <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                Academic Prototype &bull; No Real Money Charged
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close checkout"
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Breadcrumb */}
        <div className="px-6 py-3 bg-slate-100 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step === "shipping"
                  ? "bg-teal-700 text-white"
                  : "bg-teal-200 text-teal-900"
              }`}
            >
              1
            </span>
            <span className={step === "shipping" ? "font-bold text-slate-900 dark:text-white" : "text-slate-500"}>
              Address
            </span>
          </div>

          <span className="text-slate-300 dark:text-slate-600">&rarr;</span>

          <div className="flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step === "payment"
                  ? "bg-teal-700 text-white"
                  : step === "confirmed"
                  ? "bg-teal-200 text-teal-900"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              2
            </span>
            <span className={step === "payment" ? "font-bold text-slate-900 dark:text-white" : "text-slate-500"}>
              Payment
            </span>
          </div>

          <span className="text-slate-300 dark:text-slate-600">&rarr;</span>

          <div className="flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step === "confirmed"
                  ? "bg-teal-700 text-white"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              3
            </span>
            <span className={step === "confirmed" ? "font-bold text-slate-900 dark:text-white" : "text-slate-500"}>
              Done
            </span>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === "shipping" && (
            <form onSubmit={handleShippingSubmit} className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Shipping Destination
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.name}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.pincode}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, pincode: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs transition flex items-center gap-1.5 shadow-md min-h-[44px]"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === "payment" && (
            <div className="space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Select Payment Method
              </h3>

              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition min-h-[56px] ${
                    paymentMethod === "upi"
                      ? "border-teal-700 bg-teal-50/70 dark:bg-teal-950/40 text-teal-900 dark:text-teal-300 ring-2 ring-teal-700/20"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <QrCode className="w-5 h-5 text-teal-700" />
                    <div>
                      <p className="text-xs font-bold">UPI / QR Payment</p>
                      <p className="text-[11px] text-slate-500">Instant approval via GPay, PhonePe, Paytm</p>
                    </div>
                  </div>
                  {paymentMethod === "upi" && (
                    <CheckCircle2 className="w-5 h-5 text-teal-700" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition min-h-[56px] ${
                    paymentMethod === "card"
                      ? "border-teal-700 bg-teal-50/70 dark:bg-teal-950/40 text-teal-900 dark:text-teal-300 ring-2 ring-teal-700/20"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-teal-700" />
                    <div>
                      <p className="text-xs font-bold">Credit / Debit Card</p>
                      <p className="text-[11px] text-slate-500">Visa, Mastercard, RuPay</p>
                    </div>
                  </div>
                  {paymentMethod === "card" && (
                    <CheckCircle2 className="w-5 h-5 text-teal-700" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition min-h-[56px] ${
                    paymentMethod === "cod"
                      ? "border-teal-700 bg-teal-50/70 dark:bg-teal-950/40 text-teal-900 dark:text-teal-300 ring-2 ring-teal-700/20"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Banknote className="w-5 h-5 text-teal-700" />
                    <div>
                      <p className="text-xs font-bold">Cash on Delivery (COD)</p>
                      <p className="text-[11px] text-slate-500">Pay cash upon delivery verification</p>
                    </div>
                  </div>
                  {paymentMethod === "cod" && (
                    <CheckCircle2 className="w-5 h-5 text-teal-700" />
                  )}
                </button>
              </div>

              {/* Order Summary Pill */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Items Subtotal:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-teal-700">
                    <span>Discount:</span>
                    <span>- ₹{discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-500">Shipping:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-700 text-sm font-black text-slate-900 dark:text-white">
                  <span>Payable Amount:</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep("shipping")}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 min-h-[44px]"
                >
                  &larr; Back to Address
                </button>
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs transition flex items-center gap-1.5 shadow-lg min-h-[44px] disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    {isSubmitting ? "Placing Order..." : `Confirm Order (₹${total.toLocaleString("en-IN")})`}
                  </span>
                </button>
              </div>
            </div>
          )}

          {step === "confirmed" && (
            <div className="py-8 text-center space-y-5 animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-teal-100 dark:bg-teal-950 flex items-center justify-center text-teal-700 dark:text-teal-400 mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>

              <div className="space-y-1.5">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-900">
                  Order Successfully Placed!
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                  Thank You for Exploring {SITE_CONFIG.name}!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Order Reference: <strong className="font-mono text-teal-800 dark:text-teal-400">{orderId}</strong>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-300 flex items-center gap-2 max-w-sm mx-auto text-left">
                <GraduationCap className="w-5 h-5 text-amber-600 shrink-0" />
                <span>
                  <strong>Academic Prototype Note:</strong> {SITE_CONFIG.academicNotice}
                </span>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto text-left space-y-1">
                <p><strong>Shipping To:</strong> {shippingInfo.name}</p>
                <p className="truncate">{shippingInfo.address}, {shippingInfo.city} - {shippingInfo.pincode}</p>
                <p><strong>Dispatch:</strong> Simulated tracking SMS sent to {shippingInfo.phone}</p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                {user && (
                  <Link
                    href={dbOrderId ? `/account/orders/${dbOrderId}` : "/account/orders"}
                    onClick={handleClose}
                    className="w-full sm:w-auto px-6 py-3 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold rounded-xl text-xs shadow-md transition min-h-[44px] flex items-center justify-center gap-1.5"
                  >
                    <span>Track in Your Account &rarr;</span>
                  </Link>
                )}
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full sm:w-auto px-8 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs shadow-lg transition min-h-[44px]"
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
