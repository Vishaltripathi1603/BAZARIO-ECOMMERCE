-- ==============================================================================
-- Bazario Marketplace - Supabase Postgres Schema & Row Level Security (RLS)
-- Multi-Category E-Commerce Platform
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE (Linked to auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  first_name text,
  last_name text,
  email text,
  phone text,
  avatar_url text,
  theme_preference text default 'system' check (theme_preference in ('light', 'dark', 'system')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Profiles Policies
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- 2. ADDRESSES TABLE (Indian Address Format)
create table if not exists public.addresses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  full_name text not null,
  phone text not null,
  pincode text not null,
  address_line1 text not null,
  address_line2 text,
  city text not null,
  state text not null,
  is_default boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on addresses
alter table public.addresses enable row level security;

-- Addresses Policies
create policy "Users can view their own addresses"
  on public.addresses for select
  using (auth.uid() = user_id);

create policy "Users can create their own addresses"
  on public.addresses for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own addresses"
  on public.addresses for update
  using (auth.uid() = user_id);

create policy "Users can delete their own addresses"
  on public.addresses for delete
  using (auth.uid() = user_id);

-- 3. CART ITEMS TABLE
create table if not exists public.cart_items (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  product_id text not null,
  quantity integer default 1 check (quantity > 0) not null,
  selected_color text default 'Standard' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, product_id, selected_color)
);

-- Enable RLS on cart_items
alter table public.cart_items enable row level security;

-- Cart Items Policies
create policy "Users can view their own cart items"
  on public.cart_items for select
  using (auth.uid() = user_id);

create policy "Users can insert their own cart items"
  on public.cart_items for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own cart items"
  on public.cart_items for update
  using (auth.uid() = user_id);

create policy "Users can delete their own cart items"
  on public.cart_items for delete
  using (auth.uid() = user_id);

-- 4. WISHLIST ITEMS TABLE
create table if not exists public.wishlist_items (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  product_id text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, product_id)
);

-- Enable RLS on wishlist_items
alter table public.wishlist_items enable row level security;

-- Wishlist Items Policies
create policy "Users can view their own wishlist items"
  on public.wishlist_items for select
  using (auth.uid() = user_id);

create policy "Users can add to their own wishlist"
  on public.wishlist_items for insert
  with check (auth.uid() = user_id);

create policy "Users can remove from their own wishlist"
  on public.wishlist_items for delete
  using (auth.uid() = user_id);

-- 5. ORDERS TABLE (Mock E-Commerce Orders)
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  order_number text unique not null,
  status text default 'Placed' check (status in ('Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled')) not null,
  subtotal numeric(12,2) not null,
  discount_amount numeric(12,2) default 0.00 not null,
  shipping_amount numeric(12,2) default 0.00 not null,
  total_amount numeric(12,2) not null,
  shipping_address jsonb not null,
  payment_method text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on orders
alter table public.orders enable row level security;

-- Orders Policies
create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Users can create their own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

-- 6. ORDER ITEMS TABLE
create table if not exists public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders on delete cascade not null,
  product_id text not null,
  product_name text not null,
  product_image text,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12,2) not null,
  selected_color text default 'Standard' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on order_items
alter table public.order_items enable row level security;

-- Order Items Policies
create policy "Users can view order items for their own orders"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

create policy "Users can insert order items for their own orders"
  on public.order_items for insert
  with check (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

-- ==============================================================================
-- AUTOMATIC PROFILE CREATION TRIGGER ON SIGNUP
-- ==============================================================================
create or replace function public.handle_new_user()
returns trigger as $$
declare
  raw_meta jsonb;
  first_n text;
  last_n text;
begin
  raw_meta := new.raw_user_meta_data;
  first_n := coalesce(raw_meta->>'first_name', split_part(coalesce(raw_meta->>'name', ''), ' ', 1), 'Shopper');
  last_n := coalesce(raw_meta->>'last_name', substring(coalesce(raw_meta->>'name', '') from position(' ' in coalesce(raw_meta->>'name', '')) + 1), '');

  insert into public.profiles (id, first_name, last_name, email, avatar_url, theme_preference)
  values (
    new.id,
    first_n,
    last_n,
    new.email,
    raw_meta->>'avatar_url',
    'system'
  )
  on conflict (id) do update set
    email = excluded.email,
    updated_at = now();

  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists and recreate
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Trigger for default address exclusivity (when an address is marked default, unset other defaults)
create or replace function public.handle_default_address()
returns trigger as $$
begin
  if new.is_default then
    update public.addresses
    set is_default = false
    where user_id = new.user_id
    and id <> new.id;
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_address_default_changed on public.addresses;
create trigger on_address_default_changed
  before insert or update on public.addresses
  for each row execute procedure public.handle_default_address();
