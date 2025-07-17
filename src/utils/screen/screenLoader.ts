import { lazy } from "react";

const SCREEN_COMPONENTS: Record<string, any> = {
  "login-id": lazy(() => import("@/screens/login-id")),
  "signup": lazy(() => import("@/screens/signup")),
};

export const getScreenComponent = (screenName: string) => {
  return SCREEN_COMPONENTS[screenName] || null;
};
