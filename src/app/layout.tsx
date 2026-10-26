import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import WishlistDrawer from "@/components/cart/WishlistDrawer";
import CheckoutModal from "@/components/cart/CheckoutModal";
import QuickViewModal from "@/components/catalog/QuickViewModal";
import ToastContainer from "@/components/ui/ToastContainer";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  SITE_CONFIG,
  getBaseUrl,
} from "@/lib/seo";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600"], // max 2 font weights as strictly requested for performance
  display: "swap",
  variable: "--font-sans",
});

export const viewport: Viewport = {
  themeColor: "#2D5A27",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: "BambooNest | Sustainable Bamboo Goods & Desk Accessories",
    template: "%s | BambooNest",
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Sustainable Bamboo",
    "Sustainable Desk Accessories",
    "Bamboo Laptop Stand",
    "Eco Friendly Office",
    "Organic Kitchenware",
    "Zero Waste Bathroom",
  ],
  authors: [{ name: SITE_CONFIG.author }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: getBaseUrl(),
  },
  openGraph: {
    title: "BambooNest | Sustainable Bamboo Goods & Desk Accessories",
    description: SITE_CONFIG.description,
    url: getBaseUrl(),
    siteName: SITE_CONFIG.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero/hero-banner.svg",
        width: 800,
        height: 600,
        alt: "BambooNest - Sustainable Bamboo Goods and Desk Accessories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BambooNest | Sustainable Bamboo Goods & Desk Accessories",
    description: SITE_CONFIG.description,
    images: ["/images/hero/hero-banner.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();

  return (
    <html lang="en" className={`${fontSans.variable} scroll-smooth`}>
      <head>
        <JsonLd data={[orgSchema, webSiteSchema]} />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1E1B] antialiased selection:bg-emerald-100 selection:text-emerald-900">
        <CartProvider>
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <WishlistDrawer />
          <CheckoutModal />
          <QuickViewModal />
          <ToastContainer />
        </CartProvider>
      </body>
    </html>
  );
}
