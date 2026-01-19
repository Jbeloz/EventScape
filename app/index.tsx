import { AuthPage } from "@/components/AuthPage";
import { EmailVerificationPage } from "@/components/EmailVerificationPage";
import { LandingPage } from "@/components/LandingPage";
import { VerificationSuccessPage } from "@/components/VerificationSuccessPage";
import React, { useState } from "react";

export type AppScreen =
  | "landing"
  | "auth"
  | "verification"
  | "success";

export default function Index() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("landing");
  const [userEmail, setUserEmail] = useState("user@example.com");

  const handleGetStarted = () => {
    setCurrentScreen("auth");
  };

  const handleSignUp = (data: {
    name?: string;
    email: string;
    password: string;
  }) => {
    setUserEmail(data.email);
    setCurrentScreen("verification");
  };

  const handleVerify = (code: string) => {
    // Verify the code with backend
    setCurrentScreen("success");
  };

  const handleContinue = () => {
    // Navigate to main app
    setCurrentScreen("landing");
  };

  return (
    <>
      {currentScreen === "landing" && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}
      {currentScreen === "auth" && (
        <AuthPage onSignUp={handleSignUp} />
      )}
      {currentScreen === "verification" && (
        <EmailVerificationPage
          email={userEmail}
          onVerify={handleVerify}
        />
      )}
      {currentScreen === "success" && (
        <VerificationSuccessPage onContinue={handleContinue} />
      )}
    </>
  );
}
