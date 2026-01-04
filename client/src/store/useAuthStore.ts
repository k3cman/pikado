import type { AuthError, Session, User } from "@supabase/supabase-js";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "../lib/supabase";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null; success: boolean }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null; success: boolean }>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      loading: true,

      initialize: async () => {
        try {
          const {
            data: { session },
          } = await supabase.auth.getSession();
          set({ session, user: session?.user ?? null, loading: false });

          supabase.auth.onAuthStateChange((event, session) => {
            set({ session, user: session?.user ?? null });
          });
        } catch (err) {
          console.error("Error initializing auth store:", err);
          set({ loading: false });
        }
      },

      signUp: async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          return { error, success: false };
        }

        if (data.user && data.session) {
          set({
            user: data.user,
            session: data.session,
            loading: false,
          });

          return { success: true };
        }
      },

      signIn: async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          return { error, success: false };
        }

        if (data.user && data.session) {
          set({
            user: data.user,
            session: data.session,
            loading: false,
          });

          return { error: null, success: true };
        }

        return { error: null, success: false };
      },

      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, session: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        // Only persist user ID, not full user object (security)
        user: state.user
          ? { id: state.user.id, email: state.user.email }
          : null,
      }),
    }
  )
);

export const useUser = () => useAuthStore((state) => state.user);
export const useSession = () => useAuthStore((state) => state.session);
export const useAuthLoading = () => useAuthStore((state) => state.loading);
export const useSignIn = () => useAuthStore((state) => state.signIn);
export const useSignUp = () => useAuthStore((state) => state.signUp);
export const useSignOut = () => useAuthStore((state) => state.signOut);
