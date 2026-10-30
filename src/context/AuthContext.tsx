"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  theme_preference?: "light" | "dark" | "system";
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: string | null }>;
  signUpWithEmail: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<{ error: string | null; needsEmailVerification?: boolean }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPasswordForEmail: (email: string) => Promise<{ error: string | null }>;
  updateUserPassword: (password: string) => Promise<{ error: string | null }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: string | null }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user session on mount
  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user && mounted) {
          setUser(session.user);
          await loadProfile(session.user);
        }
      } catch (err) {
        console.error("Error checking auth session:", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    getInitialSession();

    // Listen for auth state changes (sign in, sign out, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (session?.user) {
        setUser(session.user);
        await loadProfile(session.user);
        if (event === "SIGNED_IN") {
          // Perform guest cart/wishlist merge
          await mergeGuestData(session.user.id);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function loadProfile(currentUser: User) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .single();

      if (data && !error) {
        setProfile(data as UserProfile);
      } else {
        // Fallback profile using user metadata
        const meta = currentUser.user_metadata || {};
        const fallback: UserProfile = {
          id: currentUser.id,
          first_name: meta.first_name || meta.name?.split(" ")[0] || "Shopper",
          last_name: meta.last_name || meta.name?.split(" ").slice(1).join(" ") || "",
          email: currentUser.email || "",
          avatar_url: meta.avatar_url,
          theme_preference: "system",
        };
        setProfile(fallback);
      }
    } catch (err) {
      console.error("Error loading user profile:", err);
    }
  }

  // Merge guest localStorage cart & wishlist into Supabase account upon login
  async function mergeGuestData(userId: string) {
    if (typeof window === "undefined") return;

    try {
      // 1. Merge Guest Cart
      const savedCart = localStorage.getItem("bazario_cart");
      if (savedCart) {
        const guestItems = JSON.parse(savedCart);
        if (Array.isArray(guestItems) && guestItems.length > 0) {
          for (const item of guestItems) {
            const productId = item.product?.id || item.productId;
            const quantity = item.quantity || 1;
            const selectedColor = item.selectedColor || "Standard";

            if (productId) {
              // Upsert cart item
              const { data: existing } = await supabase
                .from("cart_items")
                .select("id, quantity")
                .eq("user_id", userId)
                .eq("product_id", productId)
                .eq("selected_color", selectedColor)
                .single();

              if (existing) {
                await supabase
                  .from("cart_items")
                  .update({
                    quantity: existing.quantity + quantity,
                    updated_at: new Date().toISOString(),
                  })
                  .eq("id", existing.id);
              } else {
                await supabase.from("cart_items").insert({
                  user_id: userId,
                  product_id: productId,
                  quantity: quantity,
                  selected_color: selectedColor,
                });
              }
            }
          }
        }
      }

      // 2. Merge Guest Wishlist
      const savedWishlist = localStorage.getItem("bazario_wishlist");
      if (savedWishlist) {
        const guestWishlist = JSON.parse(savedWishlist);
        if (Array.isArray(guestWishlist) && guestWishlist.length > 0) {
          for (const prodId of guestWishlist) {
            if (prodId) {
              await supabase
                .from("wishlist_items")
                .upsert({ user_id: userId, product_id: prodId }, { onConflict: "user_id,product_id" });
            }
          }
        }
      }
    } catch (err) {
      console.warn("Guest data merge completed with non-blocking notice:", err);
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user) {
        setUser(data.user);
        await loadProfile(data.user);
        await mergeGuestData(data.user.id);
      }

      return { error: null };
    } catch (err: any) {
      return { error: err.message || "Failed to sign in. Please try again." };
    }
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            name: `${firstName.trim()} ${lastName.trim()}`.trim(),
          },
        },
      });

      if (error) {
        return { error: error.message };
      }

      const needsVerification = data.user && !data.session;
      if (data.user && data.session) {
        setUser(data.user);
        await loadProfile(data.user);
      }

      return { error: null, needsEmailVerification: Boolean(needsVerification) };
    } catch (err: any) {
      return { error: err.message || "Failed to register account." };
    }
  };

  const signInWithGoogle = async () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Sign out notice:", err);
    } finally {
      setUser(null);
      setProfile(null);
      if (typeof window !== "undefined") {
        // Clear local copies of private user information
        localStorage.removeItem("bazario_cart");
        localStorage.removeItem("bazario_wishlist");
      }
      router.push("/");
      router.refresh();
    }
  };

  const resetPasswordForEmail = async (email: string) => {
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${origin}/reset-password`,
      });
      if (error) return { error: error.message };
      return { error: null };
    } catch (err: any) {
      return { error: err.message || "Failed to send reset link." };
    }
  };

  const updateUserPassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) return { error: error.message };
      return { error: null };
    } catch (err: any) {
      return { error: err.message || "Failed to update password." };
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: "Not authenticated" };

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) return { error: error.message };

      setProfile((prev) => (prev ? { ...prev, ...updates } : null));
      return { error: null };
    } catch (err: any) {
      return { error: err.message || "Failed to update profile." };
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await loadProfile(user);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut,
        resetPasswordForEmail,
        updateUserPassword,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
