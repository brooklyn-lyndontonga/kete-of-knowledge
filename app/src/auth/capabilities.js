// src/app/auth/capabilities.js
export const CAPABILITIES = {
  guest: {
    canViewHome: true,
    canViewLibrary: true,   // e.g., read-only public content
    canViewHub: false,
    canViewProfile: false,
    canViewSettings: true,  // allow basic settings (language, theme)
    canWriteAnything: false,
  },
  user: {
    canViewHome: true,
    canViewLibrary: true,
    canViewHub: true,
    canViewProfile: true,
    canViewSettings: true,
    canWriteAnything: true,
  },
}

export function getRole(user) {
  return user ? "user" : "guest"
}
