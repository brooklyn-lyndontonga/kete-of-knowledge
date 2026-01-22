/* eslint-disable no-dupe-keys */
import { nav, resetTo } from '../navigation/navigationRef'

export const devRoutes = {
  onboardingConsent: () => nav('PostSignIn', { screen: 'Consent' }),
  // 🔹 Guest views
  launch: () => resetTo([{ name: 'Launch' }]),
  magicLink: () => nav('EmailSignIn'),
  appTabs: () => resetTo([{ name: 'AppTabs' }]),

  // 🔹 Nested tab example
  homeWelcome: () =>
    resetTo([
      {
        name: 'AppTabs',
        params: { screen: 'HomeTab', params: { screen: 'HomeWelcome' } },
      },
    ]),

  // 🔹 Onboarding flow (real stack)
  onboardingConsent: () => nav('PostSignIn', { screen: 'Consent' }),
  onboardingCompleteProfile: () =>
    nav('PostSignIn', { screen: 'CompleteProfile' }),
  onboardingDone: () => nav('PostSignIn', { screen: 'Done' }),
}
