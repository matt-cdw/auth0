import React from "react";
import Logo from "@/common/Logo";
import { useCreateAccountManager } from "../hooks/useCreateAccountManager";

const Header: React.FC = () => {
  const { title, description, texts, showAuxSignIn, showEmailWidget } = useCreateAccountManager();

  const logoAltText = texts?.logoAltText || "CDW Logo";

  return (
    <>
      <Logo imageClassName="h-13" altText={logoAltText} />
      <h1 className="text-2xl font-normal text-center text-text-default mt-6 mb-1 title-bar">
        {title}
      </h1>

      {/* Aux Sign In */}
      {showAuxSignIn && (
          <div className="text-sm text-center text-gray-800 px-4 py-3 mb-4 leading-relaxed aux-sign-in-box">
            Already have an account? <a href='#'>Sign In</a>
          </div>                    
      )}

      {/* Aux Email Widget */}
      {showEmailWidget && (
        <div className="aux-sign-in-box px-4 py-3 mb-2 flex justify-center">
          <div className="bg-[#f1f5ec] rounded-full px-4 py-1 flex items-center gap-2">
            <span className="text-sm font-medium text-gray-800">jdoe1@cdw.com</span>
            <button
              type="button"
              className="w-5 h-5 flex items-center justify-center rounded-full bg-[#2a0f0b] text-white text-xs leading-none"
              aria-label="Remove"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* <p className="text-center text-text-default text-sm mb-4">
        {description}
      </p> */}
    </>
  );
};

export default Header;
