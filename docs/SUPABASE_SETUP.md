# Supabase Setup Guide & Database Architecture

This guide provides instructions to connect the **Bazario E-Commerce Prototype** with a free-tier Supabase project for authenticated user accounts, persistent pan-India delivery addresses, cart and wishlist synchronization, and mock order tracking.

---

## 1. Create a Supabase Project

1. Visit [supabase.com](https://supabase.com) and click **"Start your project"**.
2. Sign in with GitHub or your email.
3. Click **"New Project"**.
4. Choose an organization, enter a project name (e.g., `bazario-marketplace`), set a database password, and select your nearest region (e.g., `ap-south-1` / Mumbai for India).
5. Wait ~60 seconds for the database to provision.

---

## 2. Execute Database Schema Migration

1. In the Supabase project dashboard, open the **SQL Editor** from the left navigation bar (icon `>_`).
2. Click **"New query"**.
3. Copy the entire contents of [`supabase/migrations/20261027_initial_schema.sql`](file:///Users/vishaltripathi/Downloads/Ecommerce/supabase/migrations/20261027_initial_schema.sql).
4. Paste into the SQL editor and click **Run** (or `Cmd+Enter`).
5. Verify that the following 6 tables and 2 trigger functions are created:

### Database Tables Created
| Table Name | Description | RLS Isolation |
| :--- | :--- | :--- |
| `public.profiles` | User profiles (first/last name, phone, avatar, theme preference) | `auth.uid() = id` |
| `public.addresses` | Indian address records with PIN code, city, state, and default status | `auth.uid() = user_id` |
| `public.cart_items` | Remote shopping cart with quantities and color variants | `auth.uid() = user_id` |
| `public.wishlist_items` | Bookmarked product catalog items | `auth.uid() = user_id` |
| `public.orders` | Placed orders with subtotal, discounts, shipping address, and payment method | `auth.uid() = user_id` |
| `public.order_items` | Order line items joined to orders | Parent order owned by `auth.uid()` |

### Automated Database Triggers
- **`on_auth_user_created`**: When a user registers via Supabase Auth (`auth.users`), a corresponding profile row is automatically inserted into `public.profiles` with their name and email.
- **`handle_default_address`**: Ensures that when an address is marked as `is_default = true`, any other existing default addresses for that user are gracefully cleared.

---

## 3. Configure Supabase Authentication

1. In your Supabase dashboard, navigate to **Authentication** &rarr; **URL Configuration**.
2. Under **Site URL**, enter:
   - For local development: `http://localhost:3000`
   - For production: `https://your-vercel-domain.vercel.app`
3. Under **Redirect URLs**, add:
   - `http://localhost:3000/auth/callback`
   - `https://your-vercel-domain.vercel.app/auth/callback`

### Optional: Enable Google OAuth
1. Go to **Authentication** &rarr; **Providers** &rarr; **Google**.
2. Toggle Google to **Enabled**.
3. Provide your Google Cloud OAuth Client ID and Secret.
4. Set the Authorized Redirect URI in Google Cloud Console to the Callback URL provided by Supabase.

---

## 4. Set Environment Variables

Retrieve your API keys from **Project Settings** &rarr; **API**:
- **Project URL**: Found under `Project URL`
- **anon public key**: Found under `Project API keys` &rarr; `anon` / `public`

### Local Development (`.env.local`)
Create or edit `.env.local` in the project root:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

### Production Deployment (Vercel)
In your Vercel project dashboard, navigate to **Settings** &rarr; **Environment Variables** and add both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

---

## 5. Security Architecture & RLS Guarantees

- **No Passwords in Client Code:** Authentication tokens and session cookies are managed via `@supabase/ssr` using `httpOnly` signed cookies.
- **Row Level Security (RLS):** Every single table has RLS enabled. A user cannot read, insert, update, or delete another user's addresses, cart, wishlist, or order history even if they forge API requests.
- **Zero Crawler Leakage:** All authentication and account sub-routes (`/signin`, `/signup`, `/forgot-password`, `/reset-password`, `/account/*`, `/checkout`) are disallowed in `robots.ts` and set with `<meta name="robots" content="noindex, nofollow" />`.
- **Guest-to-User State Merge:** When an unauthenticated visitor adds items to cart or wishlist and later signs in or creates an account, `AuthContext` seamlessly transfers their localStorage guest state into Supabase Postgres tables.

---

*Authored by Group SEO-027, B.Tech CSE Semester VII, Bazario E-Commerce Research Prototype.*
