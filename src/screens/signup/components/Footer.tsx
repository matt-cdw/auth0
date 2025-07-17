import React from "react";
import { useCreateAccountManager } from "../hooks/useCreateAccountManager";
import { rebaseLinkToCurrentOrigin } from "@/utils/helpers/urlUtils";

const Footer: React.FC = () => {
  const { createAccountInstance, texts } = useCreateAccountManager();

  const loginLink = createAccountInstance?.screen?.links?.login || "";
  const localizedLoginLink = rebaseLinkToCurrentOrigin(loginLink);

  const footerText = texts?.footerText || "";
  const footerLinkText = texts?.footerLinkText || "";

  return (
    <div className="mt-6 text-center">
      <p className="text-base font-bold mb-1">{footerText}</p>
      {localizedLoginLink && (
        <a
          href={localizedLoginLink}
          className="text-base underline text-link hover:text-link/80"
        >
          {footerLinkText}
        </a>
      )}
    </div>
  );
};

export default Footer;
