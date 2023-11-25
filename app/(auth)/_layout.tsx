import { useAuthStore } from "@store/authStore";
import { Stack, router } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
