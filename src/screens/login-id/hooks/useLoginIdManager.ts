import { useState } from "react";
import LoginIdInstance from "@auth0/auth0-acul-js/login-id";
import { executeSafely } from "@/utils/helpers/executeSafely";

export const useLoginIdManager = () => {
  const [loginIdInstance] = useState(() => new LoginIdInstance());

  if (!loginIdInstance || !loginIdInstance.screen) {
    // Return safe defaults
    return {
      loginIdInstance: null,
      handleLoginId: () => {},
      handleSocialLogin: () => {},
      handlePasskeyLogin: () => {},
      pageTitle: "",
      title: "",
      description: "",
      errors: [],
      captcha: null,
      links: {},
      texts: {}
    };
  }

  // Overwrite texts globally so they always exist - Custom for CDW
  loginIdInstance.screen.texts = {
    ...loginIdInstance.screen.texts,
    pageTitle: "Sign In - Welcome to CDW",
    title: "Sign In to Your Account",
    description: "Log in to cdw-dev.us.auth0.com"
  };

  // Extract core data only
  const texts = loginIdInstance?.screen?.texts || {};
  const pageTitle = texts?.pageTitle || "Login ID";
  const title = texts?.title || "Welcome";
  const description =
    texts?.description ||
    "Please enter your username or email address to continue.";

  // Extract screen data
  const errors = loginIdInstance?.transaction?.errors || [];
  const captcha = loginIdInstance?.screen?.captcha;
  const links = loginIdInstance?.screen?.links || {};

  const handleLoginId = (loginId: string, captcha?: string): void => {
    const options = {
      username: loginId?.trim() || "",
      captcha: loginIdInstance.screen?.captcha ? captcha?.trim() : undefined,
    };
    executeSafely(`LoginId with options: ${JSON.stringify(options)}`, () =>
      loginIdInstance.login(options),
    );
  };

  const handleSocialLogin = (connectionName: string) => {
    executeSafely(`Social login with connection: ${connectionName}`, () =>
      loginIdInstance.socialLogin({ connection: connectionName }),
    );
  };

  const handlePasskeyLogin = () => {
    const hasPasskeyData = !!loginIdInstance.screen?.data?.passkey;
    if (hasPasskeyData) {
      executeSafely(`Passkey login`, () => loginIdInstance.passkeyLogin());
    }
  };

  return {
    loginIdInstance,
    handleLoginId,
    handleSocialLogin,
    handlePasskeyLogin,
    // Core screen data
    pageTitle,
    title,
    description,
    errors,
    captcha,
    links,
    // Raw texts object - let components handle their own fallbacks
    texts,
  };
};
