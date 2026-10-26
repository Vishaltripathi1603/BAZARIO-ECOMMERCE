# BambooNest — E-Commerce Technical SEO Prototype

> *"Sustainable bamboo for the way you work and live."*  
> **Academic Project:** B.Tech CSE Sem VII, Group SEO-027  
> **Local Server:** `http://localhost:3000`

---

## 1. Project Overview & Problem Statement

Small online e-commerce storefronts frequently suffer from severe organic search visibility issues:
1. **Indexation Bloat & Crawl Traps:** Faceted navigation with URL parameters (sorting, filters) generates millions of duplicate, thin URLs that waste search crawler budgets.
2. **Duplicate & Generic Content:** Supplier-provided product descriptions are often duplicated across hundreds of retailers or lack clear semantic entity relationships.
3. **Core Web Vitals & Mobile Sluggishness:** Bloated client-side JavaScript bundles and layout shifts degrade mobile user experience and hurt search rankings.
4. **Shallow Internal Linking & Orphan Pages:** Ineffective catalog hierarchies leave niche products stranded more than 3 clicks from discovery entry points.

### The Solution: BambooNest
BambooNest is an SEO-first, ultra-lightweight, 100% statically pre-rendered (SSG) e-commerce storefront prototype built for a specialized, eco-conscious catalog of **32 handcrafted products** across **four primary niches**:
- **"Sustainable Bamboo"** (`/category/sustainable-bamboo`): Eco-friendly household, kitchen prep, and zero-waste bathroom essentials.
- **"Sustainable Desk Accessories"** (`/category/sustainable-desk-accessories`): Ergonomic bamboo risers, keyboard wrist rests, and desktop organizers.
- **"Eco Dining & Kitchenware"** (`/category/eco-dining-kitchenware`): Organic bamboo salad bowls, bento lunchboxes, cutlery sets, and condiment lazy susans.
- **"Bamboo Wellness & Living Decor"** (`/category/bamboo-wellness-decor`): Aromatherapy diffusers, woven pendant lights, bath caddies, and indoor plant stands.

Strictly compliant with **white-hat SEO principles**: zero keyword stuffing, zero hidden text, zero cloaking, 100% original human-grade descriptions (150–166 words per product), and **zero fabricated reviews or fictitious 5-star ratings**.

---

## 2. Technology Stack & Architecture

- **Framework:** Next.js 16.4.3 (App Router with Turbopack)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Typography:** Self-hosted `Plus Jakarta Sans` via `next/font/google` (display swap, max 2 weights: 400 & 600)
- **Images:** `next/image` with custom vector SVGs (<4KB each, zero CLS, prioritized hero LCP)
- **Icons:** `lucide-react`
- **Data Architecture:** Typed static JSON datasets (`/data/products.json`, `/data/categories.json`, `/data/blog.json`)
- **Rendering Model:** 100% Pure Static Site Generation (`generateStaticParams`, SSG across all 49 pages)

---

## 3. Interactive E-Commerce Features

Beyond technical SEO crawlability, BambooNest delivers a fully functional, highly engaging e-commerce UX:
1. **Interactive Shopping Cart Drawer:** Slide-over drawer with item quantity steppers, item removal, live subtotal/tax calculations, and free shipping progress bar (Free shipping on orders $\ge$ ₹999).
2. **Promo Code Engine:** Apply promo code `BAMBOO10` for an instant 10% eco-discount across your order.
3. **Multi-Step Simulated Checkout Modal:**
   - **Step 1:** Customer shipping address & delivery instructions.
   - **Step 2:** Payment selection (UPI QR code, Credit/Debit card, Cash on Delivery).
   - **Step 3:** Verified Order Confirmation with unique Order ID (e.g. `BN-447306`) and ecological impact badge showing single-use plastic prevented.
4. **Wishlist / Favorites Drawer:** Save products with one click on heart badges; view saved favorites in a dedicated slide-over with "Move to Bag" capability.
5. **Quick View Modal:** Instant product previews from catalog cards with finish picker, quantity selector, and direct Add-to-Bag without leaving the catalog page.
6. **Toast Notification System:** Animated toast feedback for cart and wishlist interactions with auto-dismiss.
7. **Full Catalog Search Modal (`Ctrl+K`):** Instant client-side search across all 32 products, keywords, categories, and tags.

---

## 4. Site Architecture & Route Map

A flat, intuitive hierarchy ensuring **max 3 clicks to any product in the store**:

```text
/                                         -> Home Page (Hero, 4 Categories, 8 Featured Products, Ethos, Blog)
/products                                 -> All 32 Products with Faceted Search & Filters
/category/sustainable-bamboo              -> Category Page (Kitchen, Bathroom, FAQs, Schema)
/category/sustainable-desk-accessories    -> Category Page (Risers, Trays, Mats, FAQs, Schema)
/category/eco-dining-kitchenware          -> Category Page (Bowls, Bento, Cutlery, FAQs, Schema)
/category/bamboo-wellness-decor           -> Category Page (Diffusers, Lamps, Plant Stands, FAQs, Schema)
/products/[slug]                          -> 32 Product Detail Pages (SSG, Variant Picker, Specs, Buy Now)
/blog                                     -> Educational Resource Index (Buying Guides)
/blog/[slug]                              -> 3 Educational Articles (Article Schema, Contextual Products)
/about                                    -> Sustainability Promise & Materials Science (E-E-A-T signals)
/contact                                  -> Accessible Customer Care & Wholesale Inquiries Form
/sitemap.xml                              -> Dynamic XML Sitemap (All 49 routes with lastModified & priority)
/robots.txt                               -> Clean Crawler Rules referencing sitemap
/404                                      -> Custom SEO-Friendly Error Page with Category Recovery Links
```

---

## 5. Measured Lighthouse Audit Scores

*Measured locally via Google Lighthouse in Chromium Headless mode (`scripts/run-lighthouse-audits.js`):*

| Route | Preset | Performance | Accessibility | Best Practices | SEO | Target Met ($\ge 90$) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Home (`/`)** | Mobile | **95** | **95** | **100** | **100** | **PASS** |
| **Home (`/`)** | Desktop | **100** | **95** | **100** | **100** | **PASS** |
| **Category (`/category/sustainable-bamboo`)** | Mobile | **96** | **95** | **100** | **100** | **PASS** |
| **Category (`/category/sustainable-bamboo`)** | Desktop | **100** | **96** | **100** | **100** | **PASS** |
| **Product (`/products/bamboo-laptop-stand-riser`)** | Mobile | **95** | **96** | **100** | **100** | **PASS** |
| **Product (`/products/bamboo-laptop-stand-riser`)** | Desktop | **100** | **96** | **100** | **100** | **PASS** |
| **Blog (`/blog/why-choose-bamboo-over-plastic`)** | Mobile | **96** | **96** | **100** | **100** | **PASS** |
| **Blog (`/blog/why-choose-bamboo-over-plastic`)** | Desktop | **100** | **96** | **100** | **100** | **PASS** |

*All 8 tests exceed the strict project target ($\ge 90$) with 100/100 on SEO and Best Practices.*

---

## 6. Local Setup & Verification

```bash
# 1. Install dependencies
npm install

# 2. Run static production build (49 static routes generated)
npm run build

# 3. Start local production server
npm run start

# 4. Run automated Lighthouse audit suite
node scripts/run-lighthouse-audits.js

# 5. Run ESLint code quality check
npm run lint
```
