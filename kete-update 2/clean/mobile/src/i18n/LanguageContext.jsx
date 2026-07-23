import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { LANGUAGES, translate } from "./strings"

const LANGUAGE_KEY = "settings:language"
const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("en")
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem(LANGUAGE_KEY)
      .then((stored) => {
        if (stored && LANGUAGES.some((l) => l.code === stored)) {
          setLanguageState(stored)
        }
      })
      .finally(() => setLoaded(true))
  }, [])

  const setLanguage = useCallback(async (code) => {
    setLanguageState(code)
    await AsyncStorage.setItem(LANGUAGE_KEY, code)
  }, [])

  const t = useCallback(
    (key, vars) => translate(language, key, vars),
    [language]
  )

  /**
   * Picks the right language version of a CMS field, falling back to
   * English when a translation is missing. Content is authored with
   * `field` for English and `field_mi` for te reo.
   */
  const content = useCallback(
    (record, field) => {
      if (!record) return ""
      if (language === "mi") {
        const reo = record[`${field}_mi`]
        if (reo && String(reo).trim()) return reo
      }
      return record[field] || ""
    },
    [language]
  )

  /**
   * True when a record has no translation for the current language.
   * Used to show a small "English only" hint rather than silently
   * pretending the content is bilingual.
   */
  const isFallback = useCallback(
    (record, field) => {
      if (language !== "mi" || !record) return false
      const reo = record[`${field}_mi`]
      return !(reo && String(reo).trim())
    },
    [language]
  )

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      content,
      isFallback,
      loaded,
      languages: LANGUAGES,
    }),
    [language, setLanguage, t, content, isFallback, loaded]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
