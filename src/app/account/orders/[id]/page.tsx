"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { formatINR } from "@/lib/format";
import {
  ArrowLeft,
  Package,
  Calendar,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  CreditCard,
  Printer,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params?.id as string;
  const { user } = useAuth();
  const supabase = createClient();

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && orderId) {
      loadOrderDetail();
    }
  }, [user, orderId]);

  async function loadOrderDetail() {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (*)
        `)
        .eq("id", orderId)
        .eq("user_id", user?.id)
        .single();

      if (error) {
        throw error;
      }

      setOrder(data);
    } catch (err: any) {
      setError(err.message || "Failed to load order.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600 mx-auto mb-3" />
        <p className="text-xs text-slate-500">Loading order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Order Not Found</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          The order you requested could not be found or you do not have permission to view it.
        </p>
        <Link
          href="/account/orders"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Orders</span>
        </Link>
      </div>
    );
  }

  const steps = [
    { label: "Order Placed", date: "Confirmed", done: true },
    {
      label: "Processing",
      date: order.status !== "Placed" ? "Packed at Warehouse" : "In Progress",
      done: ["Processing", "Shipped", "Delivered"].includes(order.status),
    },
    {
      label: "Shipped",
      date: ["Shipped", "Delivered"].includes(order.status) ? "In Transit" : "Pending",
      done: ["Shipped", "Delivered"].includes(order.status),
    },
    {
      label: "Delivered",
      date: order.status === "Delivered" ? "Completed" : "Estimated 3-5 days",
      done: order.status === "Delivered",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/account/orders"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition"
            aria-label="Back to Orders"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Order #{order.order_number}
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Placed on{" "}
              {new Date(order.created_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          <span>Print Invoice</span>
        </button>
      </div>

      {/* Progress Timeline */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Fulfillment Timeline
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative">
          {steps.map((st, i) => (
            <div key={st.label} className="flex flex-col items-start space-y-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    st.done
                      ? "bg-teal-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                  }`}
                >
                  {st.done ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span
                  className={`text-xs font-bold ${
                    st.done
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-400 dark:text-slate-600"
                  }`}
                >
                  {st.label}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-9">{st.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Order Items */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Purchased Items ({order.order_items?.length || 0})
        </h2>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {(order.order_items || []).map((item: any) => (
            <div key={item.id} className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                  {item.product_image ? (
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package className="w-6 h-6 text-slate-400" />
                  )}
                </div>
                <div>
                  <Link
                    href={`/p/${item.product_id}`}
                    className="text-sm font-bold text-slate-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition"
                  >
                    {item.product_name}
                  </Link>
                  <p className="text-xs text-slate-500 mt-1">
                    Variant: {item.selected_color} &bull; Qty: {item.quantity}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {formatINR(Number(item.unit_price) * item.quantity)}
                </div>
                <div className="text-[11px] text-slate-400">
                  {formatINR(Number(item.unit_price))} each
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping & Financial Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Address */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-xs uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>Delivery Destination</span>
          </div>

          <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <p className="font-bold text-slate-900 dark:text-white text-sm">
              {order.shipping_address?.full_name}
            </p>
            <p className="mt-1">{order.shipping_address?.address_line1}</p>
            {order.shipping_address?.address_line2 && (
              <p>{order.shipping_address.address_line2}</p>
            )}
            <p>
              {order.shipping_address?.city}, {order.shipping_address?.state} -{" "}
              {order.shipping_address?.pincode}
            </p>
            <p className="mt-2 text-slate-500">Phone: {order.shipping_address?.phone}</p>
          </div>
        </div>

        {/* Cost Summary */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-xs uppercase tracking-wider">
            <CreditCard className="w-4 h-4" />
            <span>Payment &amp; Totals</span>
          </div>

          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex justify-between">
              <span>Payment Method:</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {order.payment_method}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Items Subtotal:</span>
              <span>{formatINR(Number(order.subtotal))}</span>
            </div>
            {Number(order.discount_amount) > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                <span>Savings Discount:</span>
                <span>-{formatINR(Number(order.discount_amount))}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Pan-India Shipping:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                {Number(order.shipping_amount) === 0
                  ? "FREE"
                  : formatINR(Number(order.shipping_amount))}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-sm font-black text-slate-900 dark:text-white">
              <span>Grand Total:</span>
              <span className="text-teal-700 dark:text-teal-400 text-base">
                {formatINR(Number(order.total_amount))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
