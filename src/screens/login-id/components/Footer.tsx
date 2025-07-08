import React from "react";
import { useLoginIdManager } from "../hooks/useLoginIdManager";
import { rebaseLinkToCurrentOrigin } from "@/utils/helpers/urlUtils";

const Footer: React.FC = () => {
  const { loginIdInstance, texts } = useLoginIdManager();

  const signupLink = loginIdInstance?.screen?.links?.signup || "";
  const localizedSignupLink = rebaseLinkToCurrentOrigin(signupLink);

  const footerText = texts?.footerText || "New customer?";
  const footerLinkText = texts?.footerLinkText || "Create an account";

  return (
    <div className="mt-6 text-center">
      <p className="text-base font-bold mb-1">{footerText}</p>
      {localizedSignupLink && (
        <a
          href={localizedSignupLink}
          className="text-base underline text-link hover:text-link/80"
        >
          {footerLinkText}
        </a>
      )}
    </div>
  );
};

export default Footer;
