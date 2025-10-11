import { nav, resetTo } from "../../navigation/navigationRef"

export const devRoutes = {
  // 🔹 Guest views
  launch: () => resetTo([{ name: "Launch" }]),
  magicLink: () => nav("EmailSignIn"),
  appTabs: () => resetTo([{ name: "AppTabs" }]),

  // 🔹 Nested tab example
  homeWelcome: () =>
    resetTo([
      {
        name: "AppTabs",
        params: { screen: "HomeTab", params: { screen: "HomeWelcome" } },
      },
    ]),

  // 🔹 Onboarding flow (reuses real stack)
  onboardingConsent: () => nav("PostSignIn", { screen: "Consent" }),
  onboardingCompleteProfile: () =>
    nav("PostSignIn", { screen: "CompleteProfile" }),
  onboardingDone: () => nav("PostSignIn", { screen: "Done" }),
}
