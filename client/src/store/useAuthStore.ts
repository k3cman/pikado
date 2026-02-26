import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface LocalUser {
  id: string;
  email: string;
  displayName?: string;
}

interface StoredUser extends LocalUser {
  password: string;
}

interface AuthState {
  user: LocalUser | null;
  session: null;
  loading: boolean;
  signUp: (
    email: string,
    password: string
  ) => Promise<{ error: string | null; success: boolean }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: string | null; success: boolean }>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
  updateUser: ({
    displayName,
  }: {
    displayName: string;
  }) => Promise<{ error: string | null; success: boolean }>;
}

const USERS_KEY = "pikado-users";
const ACTIVE_USER_KEY = "pikado-active-user";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      loading: true,

      initialize: async () => {
        try {
          const raw = localStorage.getItem(ACTIVE_USER_KEY);
          if (raw) {
            const parsed = JSON.parse(raw) as LocalUser;
            set({ user: parsed, session: null, loading: false });
          } else {
            set({ user: null, session: null, loading: false });
          }
        } catch (err) {
          console.error("Error initializing auth store:", err);
          set({ loading: false });
        }
      },

      signUp: async (email: string, password: string) => {
        try {
          const raw = localStorage.getItem(USERS_KEY);
          const users: StoredUser[] = raw ? JSON.parse(raw) : [];
          const existing = users.find((u) => u.email === email);
          if (existing) {
            return { error: "User already exists.", success: false };
          }

          const newUser: StoredUser = {
            id: crypto.randomUUID(),
            email,
            password,
          };
          const updated = [...users, newUser];
          localStorage.setItem(USERS_KEY, JSON.stringify(updated));
          const { password: _pw, ...publicUser } = newUser;
          localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(publicUser));

          set({
            user: publicUser,
            session: null,
            loading: false,
          });

          return { error: null, success: true };
        } catch (error) {
          console.error("Local sign-up error:", error);
          return { error: "Failed to sign up.", success: false };
        }
      },

      updateUser: async ({ displayName }: { displayName: string }) => {
        const state = useAuthStore.getState();
        if (!state.user) return { error: "Not signed in", success: false };
        const updated = { ...state.user, displayName };
        set({ user: updated });
        try {
          localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(updated));
        } catch (e) {
          return { error: "Failed to save", success: false };
        }
        return { error: null, success: true };
      },

      signIn: async (email: string, password: string) => {
        try {
          const raw = localStorage.getItem(USERS_KEY);
          const users: StoredUser[] = raw ? JSON.parse(raw) : [];
          const existing = users.find((u) => u.email === email);

          if (!existing) {
            // Auto-create user on first sign-in for simplicity
            const newUser: StoredUser = {
              id: crypto.randomUUID(),
              email,
              password,
            };
            const updated = [...users, newUser];
            localStorage.setItem(USERS_KEY, JSON.stringify(updated));
            const { password: _pw, ...publicUser } = newUser;
            localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(publicUser));

            set({
              user: publicUser,
              session: null,
              loading: false,
            });

            return { error: null, success: true };
          }

          if (existing.password !== password) {
            return { error: "Invalid password.", success: false };
          }

          const { password: _pw, ...publicUser } = existing;
          localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(publicUser));

          set({
            user: publicUser,
            session: null,
            loading: false,
          });

          return { error: null, success: true };
        } catch (error) {
          console.error("Local sign-in error:", error);
          return { error: "Failed to sign in.", success: false };
        }
      },

      signOut: async () => {
        localStorage.removeItem(ACTIVE_USER_KEY);
        set({ user: null, session: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user
          ? {
              id: state.user.id,
              email: state.user.email,
              displayName: state.user.displayName,
            }
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
export const useUpdateUser = () => useAuthStore((state) => state.updateUser);
