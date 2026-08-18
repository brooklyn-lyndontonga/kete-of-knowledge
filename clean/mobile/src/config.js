/**
 * Client-specific values. Everything here must be confirmed with
 * ManawaOra before the app is submitted to the app stores.
 *
 * This is the ONLY file that should need changing to point the app at
 * real policy pages and support contacts. If you find yourself editing
 * a URL anywhere else, move it here instead.
 *
 * `npm run check:release` verifies none of these are still placeholders.
 */

export const REQUIRED_BEFORE_RELEASE = {
  /**
   * Apple will reject the app without a working, publicly reachable
   * privacy policy URL. It must be live before submission, not after.
   */
  privacyPolicyUrl: "https://kete-server-production.up.railway.app/privacy.html",

  /** Recommended by Apple, optional but sensible. */
  termsUrl: "https://kete-server-production.up.railway.app/terms.html",

  /** Shown in Settings and required as the app store support contact. */
  supportEmail: "brooklynlt24@gmail.com" /* ← swap for ManawaOra's email when they provide it */,
}

/**
 * Emergency number shown on the Contacts screen.
 * 111 is correct for Aotearoa New Zealand.
 */
export const EMERGENCY_NUMBER = "111"

/**
 * Bumping this re-prompts every existing user with the consent screen.
 * Increment it if the privacy wording changes materially — otherwise
 * people who already accepted will never see the new version.
 */
export const CONSENT_VERSION = "1.1"

export const config = {
  ...REQUIRED_BEFORE_RELEASE,
  emergencyNumber: EMERGENCY_NUMBER,
  consentVersion: CONSENT_VERSION,
}

export default config
