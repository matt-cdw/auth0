import React from "react";
import Card from "@/common/Card";
import { useCreateAccountManager } from "./hooks/useCreateAccountManager";
import { applyAuth0Theme } from "@/utils/theme";

import Header from "./components/Header";
import CreateAccountForm from "./components/CreateAccountForm";
import Footer from "./components/Footer";

const CreateAccountScreen: React.FC = () => {
  const { createAccountInstance, pageTitle } = useCreateAccountManager();

  document.title = pageTitle;

  // Apply Auth0 theme on load
  applyAuth0Theme(createAccountInstance);

  return (
    <div className="min-h-screen flex items-center justify-center px-10 py-20">
      <Card className="w-full max-w-[400px]">
        <Header />
        <CreateAccountForm />
        <Footer />
      </Card>
    </div>
  );
};

export default CreateAccountScreen;
