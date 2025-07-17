import { useState } from "react";
import SignupInstance from "@auth0/auth0-acul-js/signup";
import { executeSafely } from "@/utils/helpers/executeSafely";

export const useCreateAccountManager = () => {
  const [createAccountInstance] = useState(
    () => new SignupInstance(window.universal_login_context)
  );

  //console.log(JSON.stringify(createAccountInstance));

  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");

  console.log("mode:", mode);
    
  const getOverrides = (mode: string | null) => {
    switch (mode) {
      case "invite-new":
        return {
          showUsername: false,
          showAccountType: false,
          showInvitation: true,
          showAuxSignIn: false,
          showEmailWidget: false,
        };
      case "invite-existing":
        return {
          showUsername: true,
          showAccountType: false,
          showInvitation: true,
          showAuxSignIn: false,
          showEmailWidget: false,
        };
      case "create-new":
        return {
          showUsername: false,
          showAccountType: true,
          showInvitation: false,
          showAuxSignIn: true,
          showEmailWidget: true,
        };
      case "create-existing":
        return {
          showUsername: true,
          showAccountType: true,
          showInvitation: false,
          showAuxSignIn: true,
          showEmailWidget: false,
        };
      default:
        return {
          showUsername: !!createAccountInstance.screen.data?.showUsername,
          showAccountType: !!createAccountInstance.screen.data?.showAccountType,
          showInvitation: !!createAccountInstance.screen.data?.showInvitation,
          showAuxSignIn: !!createAccountInstance.screen.data?.showAuxSignIn,
          showEmailWidget: !!createAccountInstance.screen.data?.showEmailWidget,
        };
    }
  };

  const {
    showUsername,
    showAccountType,
    showInvitation,
    showAuxSignIn,
    showEmailWidget,
  } = getOverrides(mode);


  if (!createAccountInstance || !createAccountInstance.screen) {
    return {
      createAccountInstance: null,
      handleCreateAccount: () => {},
      handleSocialSignup: () => {},
      pageTitle: "",
      title: "",
      description: "",
      errors: [],
      captcha: null,
      links: {},
      texts: {},
      showUsername: false,
      showEmailBlock: false,
      showAccountType: false,
      showInvitation: false,
      showAuxSignIn: false,
      showEmailWidget: false,
      prefilledEmail: "",
    };
  }

  // Optional: CDW override for texts
  createAccountInstance.screen.texts = {
    ...createAccountInstance.screen.texts,
    pageTitle: "Create Account - CDW",
    title: "Create Your Account",
    description:
      createAccountInstance.screen.texts.description ||
      "Sign up with your email and password to get started.",
  };

  const texts = createAccountInstance.screen.texts || {};
  const pageTitle = texts.pageTitle || "Create Account";
  const title = texts.title || "Get Started";
  const description =
    texts.description || "Fill out the form below to create your account.";

  const errors = createAccountInstance.transaction?.errors || [];
  const captcha = createAccountInstance.screen.captcha;
  const links = createAccountInstance.screen.links || {};

  // 🔍 Extract signup behavior flags
  const usernameConfig =
    createAccountInstance.transaction?.connection?.options?.attributes
      ?.username;
  const emailConfig =
    createAccountInstance.transaction?.connection?.options?.attributes?.email;

  

  const showEmailBlock =
    emailConfig?.signup_status === "required" &&
    emailConfig?.identifier_active === true;

  const prefilledEmail =
    showEmailBlock && createAccountInstance.screen.data?.email
      ? createAccountInstance.screen.data.email
      : "";

  const handleCreateAccount = (
    email: string,
    password: string,
    captchaResponse?: string
  ) => {
    const options = {
      email: email?.trim() || "",
      password: password?.trim() || "",
      captcha: captcha ? captchaResponse?.trim() : undefined,
    };

    executeSafely(
      `CreateAccount with options: ${JSON.stringify(options)}`,
      () => createAccountInstance.signup(options)
    );
  };

  const handleSocialSignup = (connectionName: string) => {
    executeSafely(`Social signup with connection: ${connectionName}`, () =>
      createAccountInstance.socialSignup({ connection: connectionName })
    );
  };

  return {
    createAccountInstance,
    handleCreateAccount,
    handleSocialSignup,
    pageTitle,
    title,
    description,
    errors,
    captcha,
    links,
    texts,
    showUsername,
    showEmailBlock,
    showAccountType,
    showInvitation,
    showAuxSignIn,
    showEmailWidget,
    prefilledEmail,
  };
};
