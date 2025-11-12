import React from "react";
import { ThemeProvider } from "./src/app/providers/ThemeProvider";
import { AuthProvider } from "./src/app/providers/AuthProvider";
import { OnboardingProvider } from "./src/app/providers/OnboardingProvider";
import RootNavigator from "./src/app/navigation/RootNavigator";

export default function App() {
  console.log("🚀 App.js loaded");
  return (
    <ThemeProvider>
      <AuthProvider>
        <OnboardingProvider>
          <RootNavigator />
        </OnboardingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
