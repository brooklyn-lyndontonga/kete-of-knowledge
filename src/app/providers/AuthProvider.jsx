/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect, useState } from "react";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { supabase } from "../../features/auth/lib/supabaseClient";

const AuthCtx = createContext({
  user: null,
  session: null,
  loading: true,
  isGuest: true,
});

export const useAuth = () => useContext(AuthCtx);

const TEMP_CONSENT_KEY = "consent:temp";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔧 DEV flag — allows instant sign-in with a fake user
  const DEV_FORCE =
    __DEV__ &&
    (process.env.EXPO_PUBLIC_FORCE_SIGNED_IN === "1" ||
      Constants?.expoConfig?.extra?.FORCE_SIGNED_IN === 1);

  useEffect(() => {
    console.log("👤 AuthProvider mounted");

    // 🧪 1️⃣ Mock user for local dev — stops Supabase from overwriting
    if (DEV_FORCE) {
      console.log("⚙️ Using DEV mock user (pre-supabase)");
      const fakeUser = {
        id: "dev-user-0001",
        email: "mock@kete.local",
        app_metadata: { provider: "dev" },
        user_metadata: {
          name: "Mock User",
          role: "developer",
          location: "Gisborne",
        },
      };
      setSession({ user: fakeUser });
      setUser(fakeUser);
      setLoading(false);
      return; // 🚫 Skip Supabase listeners
    }

    // 🧭 2️⃣ Normal Supabase session flow
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    // 🌐 Deep link handling for email sign-ins
    const sub = Linking.addEventListener("url", async ({ url }) => {
      const { queryParams } = Linking.parse(url);
      const code = queryParams?.code;
      if (!code) return;
      const { data, error } = await supabase.auth.exchangeCodeForSession({ code });
      if (error) {
        console.warn("⚠️ Auth exchange failed:", error.message);
        return;
      }
      setSession(data.session);
      setUser(data.session.user);
    });

    // 🔁 Listen for Supabase auth state changes
    const { data: authSub } = supabase.auth.onAuthStateChange((_evt, sess) => {
      setSession(sess ?? null);
      setUser(sess?.user ?? null);
    });

    return () => {
      mounted = false;
      sub.remove();
      authSub.subscription.unsubscribe();
    };
  }, [DEV_FORCE]);

  // 🪶 3️⃣ Push cached consent to Supabase (if any)
  useEffect(() => {
    if (!user) return;
    (async () => {
      const raw = await AsyncStorage.getItem(TEMP_CONSENT_KEY);
      if (!raw) return;

      const { consentAcceptedAt } = JSON.parse(raw);
      const isMock = DEV_FORCE || String(user.id).startsWith("dev-user-");

      if (isMock) {
        await AsyncStorage.removeItem(TEMP_CONSENT_KEY);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("consent_accepted_at")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!profile?.consent_accepted_at) {
        await supabase.from("profiles").upsert({
          user_id: user.id,
          consent_accepted_at: consentAcceptedAt || new Date().toISOString(),
        });
      }

      await AsyncStorage.removeItem(TEMP_CONSENT_KEY);
    })().catch((err) =>
      console.warn("⚠️ Failed to sync consent cache:", err.message)
    );
  }, [user, DEV_FORCE]);

  // 🧾 Log every auth change
  useEffect(() => {
    if (!loading)
      console.log("👤 Auth state:", { user, session, loading });
  }, [user, session, loading]);

  return (
    <AuthCtx.Provider value={{ user, session, loading, isGuest: !user }}>
      {children}
    </AuthCtx.Provider>
  );
}
