"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { formatINR } from "@/lib/format";
import {
  ArrowLeft,
  Package,
  Calendar,
  ExternalLink,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  Clock,
  Truck,
  Loader2,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image?: string;
  quantity: number;
  unit_price: number;
  selected_color: string;
}

export interface Order {
  id: string;
  order_number: string;
  status: "Placed" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  subtotal: number;
  discount_amount: number;
  shipping_amount: number;
  total_amount: number;
  shipping_address: any;
  payment_method: string;
  created_at: string;
  order_items?: OrderItem[];
}

export default function AccountOrdersPage() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const supabase = createClient();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  async function loadOrders() {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (*)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data && !error) {
        setOrders(data as Order[]);
      }
    } catch (err) {
      console.error("Error loading orders:", err);
    } finally {
      setLoading(false);
    }
  }

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "Delivered":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Delivered
          </span>
        );
      case "Shipped":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-200 dark:border-sky-800">
            <Truck className="w-3 h-3 text-sky-600" /> On the Way
          </span>
        );
      case "Processing":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
            <Clock className="w-3 h-3 text-amber-600" /> Preparing Dispatch
          </span>
        );
      case "Placed":
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/80 px-2.5 py-0.5 rounded-full border border-teal-200 dark:border-teal-800">
            <Package className="w-3 h-3 text-teal-600" /> Order Placed
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/account"
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition"
          aria-label="Back to Account"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Your Orders
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Review past orders, track live shipments, and request invoices
          </p>
        </div>
      </div>

      {loading ? (
        <div className="p-16 text-center text-slate-400 flex flex-col items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-teal-600 mb-2" />
          <p className="text-xs">Fetching your order history...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="p-12 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-center space-y-4 bg-white dark:bg-slate-900">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto">
            <Package className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              You haven&apos;t placed any orders yet
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Explore our curated marketplace across 26 departments with genuine fast pan-India shipping.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 transition"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Start Shopping</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => {
            const formattedDate = new Date(order.created_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });

            return (
              <div
                key={order.id}
                className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition"
              >
                {/* Order Header */}
                <div className="p-4 sm:p-5 bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex flex-wrap items-center gap-6">
                    <div>
                      <span className="text-slate-400 uppercase text-[10px] font-bold block">
                        Order Placed
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {formattedDate}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 uppercase text-[10px] font-bold block">
                        Total Amount
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {formatINR(Number(order.total_amount))}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 uppercase text-[10px] font-bold block">
                        Ship To
                      </span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {order.shipping_address?.full_name || "Primary Address"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-[11px] font-mono">
                      #{order.order_number}
                    </span>
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="inline-flex items-center gap-1 font-bold text-teal-600 dark:text-teal-400 hover:underline"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Order Body */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusBadge(order.status)}
                      <span className="text-xs text-slate-500">
                        Payment: {order.payment_method}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {(order.order_items || []).map((item) => (
                      <div
                        key={item.id}
                        className="py-3.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
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
                              className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition"
                            >
                              {item.product_name}
                            </Link>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              Qty: {item.quantity} &bull; Color: {item.selected_color} &bull;{" "}
                              {formatINR(Number(item.unit_price))} each
                            </p>
                          </div>
                        </div>

                        <Link
                          href={`/p/${item.product_id}`}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shrink-0 transition"
                        >
                          View Item
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
