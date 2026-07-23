/**
 * UI strings in English and te reo Māori.
 *
 * Te reo terms reuse the wording already used as screen subtitles in the
 * original build so the app stays internally consistent. This table has
 * NOT been reviewed by a native speaker - that review should happen
 * before launch, and this file is the only place it needs to happen.
 */

export const LANGUAGES = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "mi", label: "Te reo Māori", nativeLabel: "Te reo Māori" },
]

export const strings = {
  en: {
    // Navigation / tabs
    "tab.home": "Home",
    "tab.profile": "Profile",
    "tab.hub": "Hub",
    "tab.library": "Library",
    "tab.settings": "Settings",

    // Common actions
    "action.save": "Save",
    "action.saving": "Saving…",
    "action.cancel": "Cancel",
    "action.delete": "Delete",
    "action.remove": "Remove",
    "action.add": "Add",
    "action.call": "Call",
    "action.pause": "Pause",
    "action.resume": "Resume",
    "action.signIn": "Sign in",
    "action.signOut": "Sign out",
    "action.understand": "I understand",
    "action.tryAgain": "Try again",

    // Hub
    "hub.title": "My Hub",
    "hub.symptoms": "My Symptoms",
    "hub.medicines": "My Medicines",
    "hub.reminders": "Reminders",
    "hub.checklists": "Checklists",
    "hub.notes": "Notes",
    "hub.contacts": "Contacts",
    "hub.reflections": "Reflections",

    // Symptoms
    "symptoms.title": "Symptoms",
    "symptoms.add": "Add Symptom",
    "symptoms.empty": "No symptoms recorded yet",
    "symptoms.week": "This week",
    "symptoms.noneToday": "Nothing recorded",
    "symptoms.severity": "Severity",
    "symptoms.tags": "What was happening?",
    "symptoms.tag.rest": "At rest",
    "symptoms.tag.activity": "During activity",
    "symptoms.tag.morning": "Morning",
    "symptoms.tag.night": "Night",
    "symptoms.tag.stress": "Stressed",
    "symptoms.tag.afterMeds": "After medicine",
    "reflections.title": "Reflections",
    "reflections.add": "Write a reflection",
    "reflections.empty": "No reflections yet",
    "reflections.todayPrompt": "Today's prompt",
    "reflections.save": "Save reflection",
    "reflections.placeholder": "Write as much or as little as you like…",
    "goals.whakatauki": "A thought to carry",
    "goals.suggestions": "Ideas to start with",

    // Medicines
    "medicines.title": "Medicines",
    "medicines.add": "Add Medicine",
    "medicines.empty": "No medicines added yet",

    // Reminders
    "reminders.title": "Reminders",
    "reminders.add": "Add Reminder",
    "reminders.empty": "No reminders yet",
    "reminders.dailyAt": "Daily at",
    "reminders.noTime": "No time set",
    "reminders.alertsOff":
      "Reminders are saved, but alerts are turned off for this build.",

    // Checklists
    "checklists.title": "Checklists",
    "checklists.create": "Create Checklist",
    "checklists.empty": "No checklists yet",
    "checklists.progress": "{done} of {total} done",
    "checklists.deleteList": "Delete list",

    // Notes
    "notes.title": "Notes",
    "notes.add": "Add Note",
    "notes.empty": "No notes yet",

    // Contacts
    "contacts.title": "Contacts",
    "contacts.add": "Add Contact",
    "contacts.emergency": "Emergency services",
    "contacts.call111": "Call 111",
    "contacts.none": "None added yet",
    "contacts.whanau": "Whānau",
    "contacts.provider": "Health provider",
    "contacts.emergencyGroup": "Emergency",

    // Library / conditions
    "library.title": "Library",
    "library.conditions": "Conditions",
    "library.conditionsBlurb":
      "Plain-language information about heart conditions, what can trigger them, and how they are managed.",
    "library.learn": "Learn",
    "library.practice": "Practice",
    "library.support": "Support",
    "library.empty": "No conditions to show yet.",
    "library.loadError":
      "Couldn't load conditions. Check your connection and try again.",
    "condition.about": "About",
    "condition.triggers": "Triggers",
    "condition.managing": "Managing this",
    "condition.disclaimer":
      "This information is for learning and does not replace advice from your doctor or health provider. If you feel unwell, contact them or call 111.",
    "condition.offline": "This information isn't available offline yet.",

    // Settings
    "settings.title": "Settings",
    "settings.account": "Account",
    "settings.language": "Language",
    "settings.myData": "My data",
    "settings.export": "Export my data",
    "settings.exportBlurb": "Save a copy of everything stored on this device.",
    "settings.delete": "Delete my data",
    "settings.deleteBlurb":
      "Permanently remove everything saved on this device.",
    "settings.privacy": "Privacy policy",
    "settings.terms": "Terms of use",
    "settings.help": "Get help",
    "settings.privacyGroup": "Privacy & help",
    "settings.guest": "Browsing as guest",
    "settings.notSignedIn": "Not signed in",

    // Sync
    "sync.group": "Sync",
    "sync.now": "Sync now",
    "sync.syncing": "Syncing…",
    "sync.never": "Not synced yet",
    "sync.lastSynced": "Last synced {when}",
    "sync.pending": "{count} change(s) waiting to sync",
    "sync.offline": "Offline — changes will sync when you reconnect",
    "sync.error": "Sync had a problem. It will retry automatically.",
    "sync.signInPrompt":
      "Sign in to back up your information and use it on another device.",
    "sync.localOnly": "Your health information is stored on this device only.",
    "sync.synced": "Your health information is backed up to your account.",

    // Consent
    "consent.welcome": "Welcome to Kete of Knowledge",
    "consent.greeting": "Nau mai, haere mai",
    "consent.storageTitle": "Your information stays with you",
    "consent.collectTitle": "What we do collect",
    "consent.adviceTitle": "This is not medical advice",
    "consent.readPolicy": "Read the full privacy policy",

    // Auth
    "auth.signInRequired": "Sign in required",
    "auth.signInBody": "Please sign in to add or edit your health information.",
    "auth.notNow": "Not now",
  },

  mi: {
    "tab.home": "Kāinga",
    "tab.profile": "Kōtaha",
    "tab.hub": "Pūmanawa",
    "tab.library": "Puna",
    "tab.settings": "Tautuhinga",

    "action.save": "Tiaki",
    "action.saving": "Kei te tiaki…",
    "action.cancel": "Whakakore",
    "action.delete": "Muku",
    "action.remove": "Tango",
    "action.add": "Tāpiri",
    "action.call": "Waea",
    "action.pause": "Okioki",
    "action.resume": "Haere tonu",
    "action.signIn": "Takiuru",
    "action.signOut": "Takiputa",
    "action.understand": "Kua mārama au",
    "action.tryAgain": "Ngana anō",

    "hub.title": "Taku Manawa",
    "hub.symptoms": "Āku Tohu",
    "hub.medicines": "Āku Rongoā",
    "hub.reminders": "Whakamahara",
    "hub.checklists": "Rārangi Arowhai",
    "hub.notes": "Tuhipoka",
    "hub.contacts": "Ngā Whakapā",
    "hub.reflections": "Ngā Whakaaroaro",

    "symptoms.title": "Ngā Tohu",
    "symptoms.add": "Tāpiri Tohu",
    "symptoms.empty": "Kāore anō he tohu kia tuhia",
    "symptoms.week": "Tēnei wiki",
    "symptoms.noneToday": "Kāore he mea i tuhia",
    "symptoms.severity": "Te kaha",
    "symptoms.tags": "He aha te mahi i taua wā?",
    "symptoms.tag.rest": "E okioki ana",
    "symptoms.tag.activity": "E kori ana",
    "symptoms.tag.morning": "Te ata",
    "symptoms.tag.night": "Te pō",
    "symptoms.tag.stress": "E taumaha ana",
    "symptoms.tag.afterMeds": "Whai muri i te rongoā",
    "reflections.title": "Ngā Whakaaroaro",
    "reflections.add": "Tuhia he whakaaroaro",
    "reflections.empty": "Kāore anō he whakaaroaro",
    "reflections.todayPrompt": "Te pātai o te rā",
    "reflections.save": "Tiaki whakaaroaro",
    "reflections.placeholder": "Tuhia te roa, te poto rānei…",
    "goals.whakatauki": "He whakaaro hei kawe",
    "goals.suggestions": "He whakaaro hei tīmata",

    "medicines.title": "Ngā Rongoā",
    "medicines.add": "Tāpiri Rongoā",
    "medicines.empty": "Kāore anō he rongoā kia tāpirihia",

    "reminders.title": "Whakamahara",
    "reminders.add": "Tāpiri Whakamahara",
    "reminders.empty": "Kāore anō he whakamahara",
    "reminders.dailyAt": "Ia rā i te",
    "reminders.noTime": "Kāore he wā i whakaritea",
    "reminders.alertsOff":
      "Kua tiakina ngā whakamahara, engari kua weto ngā whakatūpato mō tēnei putanga.",

    "checklists.title": "Rārangi Arowhai",
    "checklists.create": "Hanga Rārangi",
    "checklists.empty": "Kāore anō he rārangi arowhai",
    "checklists.progress": "{done} o {total} kua oti",
    "checklists.deleteList": "Muku i te rārangi",

    "notes.title": "Tuhipoka",
    "notes.add": "Tāpiri Tuhipoka",
    "notes.empty": "Kāore anō he tuhipoka",

    "contacts.title": "Ngā Whakapā",
    "contacts.add": "Tāpiri Whakapā",
    "contacts.emergency": "Ratonga ohotata",
    "contacts.call111": "Waea 111",
    "contacts.none": "Kāore anō kia tāpirihia",
    "contacts.whanau": "Whānau",
    "contacts.provider": "Kaiwhakarato hauora",
    "contacts.emergencyGroup": "Ohotata",

    "library.title": "Puna Mātauranga",
    "library.conditions": "Ngā Mate",
    "library.conditionsBlurb":
      "He kōrero māmā mō ngā mate manawa, ngā take e ara ai, me te huarahi whakahaere.",
    "library.learn": "Ako",
    "library.practice": "Mahi",
    "library.support": "Tautoko",
    "library.empty": "Kāore anō he mate hei whakaatu.",
    "library.loadError":
      "Kāore i taea te tiki i ngā mate. Tirohia tō hononga, ka ngana anō.",
    "condition.about": "Mō tēnei",
    "condition.triggers": "Ngā take",
    "condition.managing": "Te whakahaere",
    "condition.disclaimer":
      "He kōrero ako tēnei, ehara i te whakakapi i ngā tohutohu a tō rata, a tō kaiwhakarato hauora rānei. Ki te māuiui koe, whakapā atu ki a rātou, waea rānei ki te 111.",
    "condition.offline": "Kāore anō tēnei kōrero kia wātea i te tuimotu.",

    "settings.title": "Tautuhinga",
    "settings.account": "Pūkete",
    "settings.language": "Reo",
    "settings.myData": "Aku raraunga",
    "settings.export": "Tuku i aku raraunga",
    "settings.exportBlurb": "Tiakina he kape o ngā mea katoa kei tēnei pūrere.",
    "settings.delete": "Muku i aku raraunga",
    "settings.deleteBlurb":
      "Tangohia ngā mea katoa kua tiakina ki tēnei pūrere.",
    "settings.privacy": "Kaupapa here matatapu",
    "settings.terms": "Ngā ture whakamahi",
    "settings.help": "Tono āwhina",
    "settings.privacyGroup": "Matatapu me te āwhina",
    "settings.guest": "Kei te tirotiro manuhiri",
    "settings.notSignedIn": "Kāore anō kia takiuru",

    "sync.group": "Tukutahi",
    "sync.now": "Tukutahi ināianei",
    "sync.syncing": "Kei te tukutahi…",
    "sync.never": "Kāore anō kia tukutahi",
    "sync.lastSynced": "I tukutahi {when}",
    "sync.pending": "{count} panoni e tatari ana",
    "sync.offline": "Kei waho o te tuimotu — ka tukutahi ina hono anō",
    "sync.error": "He raru i te tukutahi. Ka ngana anō aunoa.",
    "sync.signInPrompt":
      "Takiuru kia pupuri ai i ō kōrero, kia whakamahi ai i tētahi atu pūrere.",
    "sync.localOnly": "Kei tēnei pūrere anake ō kōrero hauora.",
    "sync.synced": "Kua puritia ō kōrero hauora ki tō pūkete.",

    "consent.welcome": "Nau mai ki te Kete o te Mātauranga",
    "consent.greeting": "Nau mai, haere mai",
    "consent.storageTitle": "Ka noho ō kōrero ki a koe",
    "consent.collectTitle": "Ngā mea e kohia ana e mātou",
    "consent.adviceTitle": "Ehara tēnei i te tohutohu hauora",
    "consent.readPolicy": "Pānuitia te kaupapa here matatapu",

    "auth.signInRequired": "Me takiuru",
    "auth.signInBody":
      "Takiuru kia tāpiri, kia whakatika rānei i ō kōrero hauora.",
    "auth.notNow": "Kaua i tēnei wā",
  },
}

/**
 * Looks up a string, falling back to English and then to the key itself,
 * so a missing translation degrades quietly rather than showing blank.
 */
export function translate(lang, key, vars) {
  let value = strings[lang]?.[key] ?? strings.en[key] ?? key

  if (vars) {
    for (const [name, replacement] of Object.entries(vars)) {
      value = value.replace(
        new RegExp(`\\{${name}\\}`, "g"),
        String(replacement)
      )
    }
  }

  return value
}
