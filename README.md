# Bazario — Multi-Category E-Commerce & Technical SEO Platform

> *"Everything you need, beautifully delivered."*  
> **Academic Project:** B.Tech CSE Sem VII, Group SEO-027  
> **Production Server:** `http://localhost:3000`  
> **Architecture Docs:** [`/docs/SUPABASE_SETUP.md`](file:///Users/vishaltripathi/Downloads/Ecommerce/docs/SUPABASE_SETUP.md) &bull; [`/docs/EVALUATION.md`](file:///Users/vishaltripathi/Downloads/Ecommerce/docs/EVALUATION.md) &bull; [`/public/images/CREDITS.md`](file:///Users/vishaltripathi/Downloads/Ecommerce/public/images/CREDITS.md)

---

## 1. Project Overview & Architecture

**Bazario** is a full-stack, enterprise-grade multi-category marketplace prototype engineered for maximum search engine crawlability, rich user interactivity, and white-hat SEO compliance.

### Catalog Scale & Taxonomy
- **26 Departments:** Level 1 parent departments (Sustainable Bamboo, Desk Accessories, Electronics & Tech, Home & Kitchen, Books & Stationery, Beauty & Wellness, etc.)
- **157 Sub-Departments:** Level 2 semantic grouping
- **1,099 Leaf Categories:** Level 3 indexable categories with dedicated canonical URLs, rich intro copy, and breadcrumb trails
- **3,329 Catalog Products:** 32 handcrafted flagship items with 3-4 high-resolution photos and real-time Three.js 3D viewer, plus 3,297 scale products
- **Max 3 Clicks:** Every product in the entire 3,329-item catalog is reachable within $\le$ 3 clicks from the homepage with **zero orphan pages**.

---

## 2. Key Features & Systems

### 🔐 1. Authentication & User Accounts (Supabase + SSR + RLS)
- **Supabase SSR:** Integrated via `@supabase/ssr` using `httpOnly` signed cookies.
- **Split-Layout Pages:** Dedicated `/signin`, `/signup`, `/forgot-password`, and `/reset-password` pages with brand showcases, password entropy meters, and accessible ARIA attributes.
- **Google OAuth & Email/Password:** Seamless multi-provider sign-in.
- **Amazon-Style Account Hub (`/account`):**
  - **Your Orders (`/account/orders` & `/account/orders/[id]`):** Real-time order fulfillment timeline, order items breakdown, and invoice printing view.
  - **Your Addresses (`/account/addresses`):** Full pan-India address management with 6-digit PIN validation, default address toggling, and quick checkout auto-fill.
  - **Your Wishlist (`/account/wishlist`):** Cloud-persisted wishlist with "Move to Bag" and instant synchronization.
  - **Login & Security (`/account/security`):** Password updates, active session termination, and credential audits.
  - **Profile & Preferences (`/account/profile`):** Name, phone number, and theme preferences.
- **Strict Row Level Security (RLS):** 6 tables (`profiles`, `addresses`, `cart_items`, `wishlist_items`, `orders`, `order_items`) strictly protected so users can only access their own data.
- **Guest-to-User Merge:** Items added to guest cart/wishlist in localStorage automatically migrate into the user's Supabase account on sign in.
- **Crawl Safety:** All private authentication and account routes are blocked in `robots.ts` and tagged with `noindex, nofollow`.

### 🖼️ 2. Free Image API Pipeline & Resilient Gallery
- **Multi-Source Sourcing Pipeline:** Scripts query Pexels, Pixabay, and Unsplash with offline fallback to a curated high-resolution photo bank (`scripts/fetch-images.js`).
- **Photographer Attribution:** Real creator names, profile links, and license terms stored in `data/image-map.json` and acknowledged on the [`/credits`](file:///Users/vishaltripathi/Downloads/Ecommerce/src/app/credits/page.tsx) page and [`CREDITS.md`](file:///Users/vishaltripathi/Downloads/Ecommerce/public/images/CREDITS.md).
- **`<ProductImage>` Component:** Handles blur skeleton placeholders, responsive sizing, and automatic fallback to an on-brand SVG card on error.
- **Interactive Product Gallery:** 
  - Multi-image thumbnails
  - Touch swipe gestures for mobile
  - Keyboard arrow navigation
  - Fullscreen click-to-zoom lightbox modal
  - Flagship Three.js interactive 3D viewer toggle

### 🌓 3. Complete Dark Mode System
- **Theme Provider:** Powered by `next-themes` (`light`, `dark`, `system`).
- **Theme Switcher:** Compact toggle in Header, Mobile Drawer, and Account Preferences.
- **Tailwind 4 Tokens:** Full slate mode (`#020617` background, `#0f172a` surface, `#334155` borders) with WCAG AA compliant contrast.
- **Adaptive 3D Lighting:** Three.js scene uses transparent WebGL canvas with balanced ambient/rim lights looking crisp in both modes.

### 🛒 4. Interactive E-Commerce UX
- **Live Search Autosuggest:** Real-time multi-department autocomplete with keyboard navigation (`ArrowUp`, `ArrowDown`, `Enter`).
- **Slide-Out Mega Menu:** Full directory navigation across all 26 departments.
- **Shopping Bag Slide-Over:** Quantity steppers, coupon code engine (`BAZARIO10` for 10% off), and free delivery progress meter ($\ge$ ₹999).
- **Fast Checkout Modal:** 3-step checkout saving orders directly to Supabase Postgres with instant order tracking link.

---

## 3. Technology Stack

- **Framework:** Next.js 16.4.3 (App Router with Turbopack)
- **Database & Auth:** Supabase (Postgres, SSR, Row Level Security)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4 & Vanilla CSS
- **Theming:** `next-themes`
- **3D Graphics:** Three.js (WebGL with orbit controls & material finish switchers)
- **Icons:** `lucide-react`
- **Validation:** Automated content audits (`scripts/validate-content.js`, `scripts/audit-images.js`)

---

## 4. Getting Started

### 1. Installation
\`\`\`bash
npm install
\`\`\`

### 2. Environment Setup
Configure `.env.local` using the template in `.env.example`:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`
*(Refer to [`docs/SUPABASE_SETUP.md`](file:///Users/vishaltripathi/Downloads/Ecommerce/docs/SUPABASE_SETUP.md) for full step-by-step instructions).*

### 3. Run Locally
\`\`\`bash
npm run dev
# or build and start production daemon:
npm run build && npm run start
\`\`\`
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 5. Automated Audits & Verification

\`\`\`bash
# Run content and technical SEO validation
node scripts/validate-content.js

# Run image coverage and alt text audit
node scripts/audit-images.js

# Run automated Lighthouse audit suite
node scripts/run-lighthouse-audits.js
\`\`\`

---

*Authored by Group SEO-027, B.Tech CSE Semester VII, Bazario E-Commerce Research Prototype.*
