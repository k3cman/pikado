import { useAuthStore } from "@/store/useAuthStore";
import { redirect } from "react-router";

export function requireAuth() {
  const { user, loading } = useAuthStore.getState();

  if (loading) {
    return null;
  }

  if (!user) {
    throw redirect("/login");
  }

  return { user };
}
