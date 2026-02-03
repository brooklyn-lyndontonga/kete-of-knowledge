/* eslint-disable react/react-in-jsx-scope */
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import * as AuthSession from "expo-auth-session"
import * as WebBrowser from "expo-web-browser"
import Constants from "expo-constants"
import AsyncStorage from "@react-native-async-storage/async-storage"

WebBrowser.maybeCompleteAuthSession()

const AuthContext = createContext(null)
const STORAGE_KEY = "auth_session"
const GUEST_KEY = "guest_session"

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authenticating, setAuthenticating] = useState(false)
  const [guest, setGuest] = useState(false)
  const [showAuth, setShowAuth] = useState(false)

  const auth0Domain = process.env.EXPO_PUBLIC_AUTH0_DOMAIN
  const auth0ClientId = process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID
  const auth0Audience = process.env.EXPO_PUBLIC_AUTH0_AUDIENCE
  const auth0Connection = process.env.EXPO_PUBLIC_AUTH0_CONNECTION

  const discovery = AuthSession.useAutoDiscovery(
    auth0Domain ? `https://${auth0Domain}` : null
  )

  const scheme = Constants.expoConfig?.scheme || "keteofknowledge"
  const useProxy = Constants.appOwnership === "expo"
  const redirectUri = AuthSession.makeRedirectUri({
    scheme,
    path: "auth",
    useProxy,
  })

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: auth0ClientId,
      scopes: ["openid", "profile", "email", "offline_access"],
      redirectUri,
      responseType: AuthSession.ResponseType.Code,
      usePKCE: true,
      extraParams: {
        ...(auth0Audience ? { audience: auth0Audience } : {}),
        ...(auth0Connection ? { connection: auth0Connection } : {}),
      },
    },
    discovery
  )

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(STORAGE_KEY),
      AsyncStorage.getItem(GUEST_KEY),
    ])
      .then(([rawSession, rawGuest]) => {
        if (rawSession) {
          setSession(JSON.parse(rawSession))
          setGuest(false)
          return
        }

        if (rawGuest === "true") {
          setGuest(true)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    async function exchangeToken() {
      if (!response || response.type !== "success" || !discovery) return

      const { code } = response.params

      setAuthenticating(true)
      const tokenResponse = await AuthSession.exchangeCodeAsync(
        {
          clientId: auth0ClientId,
          code,
          redirectUri,
          extraParams: {
            code_verifier: request?.codeVerifier,
            ...(auth0Audience ? { audience: auth0Audience } : {}),
          },
        },
        discovery
      )

      const expiresAt = tokenResponse.expiresIn
        ? Date.now() + tokenResponse.expiresIn * 1000
        : null

      const nextSession = {
        ...tokenResponse,
        expiresAt,
      }

      setSession(nextSession)
      setGuest(false)
      setShowAuth(false)
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession))
      await AsyncStorage.removeItem(GUEST_KEY)
      setAuthenticating(false)
    }

    exchangeToken().catch((err) => {
      console.warn("Auth token exchange failed", err)
      setAuthenticating(false)
    })
  }, [response, discovery, auth0ClientId, auth0Audience, redirectUri, request])

  const login = async () => {
    if (!request) return { ok: false, reason: "not_ready" }

    setAuthenticating(true)
    try {
      const result = await promptAsync({ useProxy })
      if (result?.type !== "success") {
        setAuthenticating(false)
      }
      return { ok: result?.type === "success" }
    } catch (err) {
      setAuthenticating(false)
      throw err
    }
  }

  const logout = async () => {
    setSession(null)
    setGuest(false)
    await AsyncStorage.removeItem(STORAGE_KEY)
    await AsyncStorage.removeItem(GUEST_KEY)
  }

  const continueAsGuest = async () => {
    setGuest(true)
    setShowAuth(false)
    await AsyncStorage.setItem(GUEST_KEY, "true")
  }

  const openAuth = () => setShowAuth(true)
  const closeAuth = () => setShowAuth(false)

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: Boolean(session?.accessToken || session?.idToken),
      isGuest: guest,
      isLoading: loading,
      isAuthenticating: authenticating,
      showAuth,
      login,
      logout,
      continueAsGuest,
      openAuth,
      closeAuth,
      authReady: Boolean(request && discovery && auth0Domain && auth0ClientId),
      missingConfig: !auth0Domain || !auth0ClientId,
      redirectUri,
      auth0Domain,
      auth0ClientId,
      auth0Audience,
      auth0Connection,
      useProxy,
    }),
    [
      session,
      guest,
      loading,
      authenticating,
      showAuth,
      request,
      discovery,
      auth0Domain,
      auth0ClientId,
      auth0Audience,
      auth0Connection,
      useProxy,
      redirectUri,
    ]
  )

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
