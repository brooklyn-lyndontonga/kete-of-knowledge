<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Kete of Knowledge – Mobile App</title>
</head>
<body>
  <h1>Kete of Knowledge – Mobile App</h1>
  <p>
    A mobile app designed to provide accessible health and wellbeing information to whānau. 
    Built with <strong>React Native (Expo)</strong> and backed by a 
    <strong>Node.js/Express API</strong> and <strong>SQLite database</strong>, 
    the app prioritises simplicity, cultural grounding, and offline-first usability.
  </p>

  <h2>📖 Project Overview</h2>
  <p>The Kete of Knowledge app enables users to access a curated library of health information, including:</p>
  <ul>
    <li>Medication information</li>
    <li>Symptom guides</li>
    <li>Conditions and treatments</li>
    <li>Whakataukī and wellbeing resources</li>
  </ul>
  <p>The goal is to empower whānau with trustworthy information in one accessible kete (basket).</p>

  <h2>📅 Development Phases &amp; Sprints</h2>

  <h3>Phase 1: Foundations</h3>
  <ul>
    <li><strong>Sprint 1 (22 Sep – 5 Oct)</strong> ✅
      <ul>
        <li>Repo &amp; Project Setup (Expo + React Native, GitHub, CI/CD)</li>
        <li>Design System Basics (color palette, fonts via <code>expo-google-fonts</code>, spacing, components)</li>
        <li>Navigation &amp; Shell (React Navigation, stack/tab navigators, placeholder screens)</li>
      </ul>
    </li>
    <li><strong>Sprint 2 (6–19 Oct)</strong> 🔄 <em>Current</em>
      <ul>
        <li>Authentication: Email/magic link flow (Firebase/Auth0/Supabase)</li>
        <li>Onboarding Flow: Multi-step onboarding with privacy consent form</li>
        <li>Placeholder Screens: Profiles, Conditions, Symptoms, Medicines, etc.</li>
      </ul>
    </li>
  </ul>

  <h3>Phase 2: Core Features</h3>
  <ul>
    <li><strong>Sprint 3 (20 Oct – 2 Nov)</strong>
      <ul>
        <li>Profiles screen UI with input fields for personal goals</li>
        <li>Display daily/weekly Whakataukī (from static JSON)</li>
      </ul>
    </li>
    <li><strong>Sprint 4 (3–16 Nov)</strong>
      <ul>
        <li>Condition library with list/detail screens (static JSON first)</li>
        <li>Search bar with keyword filter (FlatList)</li>
        <li>Hooks left for future CMS API swap</li>
      </ul>
    </li>
  </ul>

  <h3>Phase 3: Tracking &amp; Data</h3>
  <ul>
    <li><strong>Sprint 5 (17–30 Nov)</strong>
      <ul>
        <li>Symptoms tracker with logging + visual weekly grid</li>
        <li>Local storage (expo-sqlite or react-native-mmkv)</li>
      </ul>
    </li>
    <li><strong>Sprint 6 (1–14 Dec)</strong>
      <ul>
        <li>Data model schemas (Profile, Symptom, Medicine)</li>
        <li>Sync service (scaffold push/pull, even if stubbed)</li>
        <li>Integration into tracker &amp; profile features</li>
      </ul>
    </li>
    <li><strong>Sprint 7 (15–28 Dec)</strong>
      <ul>
        <li>Medicines CRUD + Rongoā section</li>
        <li>Notes field</li>
        <li>Link medicines to user profiles</li>
      </ul>
    </li>
  </ul>

  <h3>Phase 4: Completion &amp; Release</h3>
  <ul>
    <li><strong>Sprint 8 (29 Dec – 11 Jan)</strong>
      <ul>
        <li>Reminders (local push notifications)</li>
        <li>Checklist functionality</li>
        <li>UI polish</li>
      </ul>
    </li>
    <li><strong>Sprint 9 (12–25 Jan)</strong>
      <ul>
        <li>Contacts (whānau/providers)</li>
        <li>Learning resources (links/docs via WebView)</li>
        <li>Offline mode (cache with expo-file-system)</li>
      </ul>
    </li>
    <li><strong>Sprint 10 (26 Jan – 8 Feb)</strong>
      <ul>
        <li>Accessibility: Māori/English toggle, text scaling</li>
        <li>Data export (JSON/CSV)</li>
        <li>“Delete My Data” feature</li>
        <li>Testing &amp; release (Expo EAS → App Store/Play Store)</li>
      </ul>
    </li>
  </ul>

  <h2>🛠 Tech Stack</h2>
  <ul>
    <li><strong>Frontend:</strong> React Native (Expo), React Navigation</li>
    <li><strong>Backend:</strong> Node.js + Express</li>
    <li><strong>Database:</strong> SQLite (expo-sqlite, react-native-mmkv for local storage)</li>
    <li><strong>Auth:</strong> Firebase / Auth0 / Supabase (TBC)</li>
    <li><strong>Other:</strong> Expo Notifications, Expo File System, Expo Sharing</li>
  </ul>

  <h2>⚙️ Setup Instructions</h2>
  <ol>
    <li>Clone the repo:
      <pre><code>git clone &lt;repo-url&gt;
cd kete-of-knowledge</code></pre>
    </li>
    <li>Install dependencies:
      <pre><code>npm install</code></pre>
    </li>
    <li>Run the app in development:
      <pre><code>npx expo start</code></pre>
    </li>
    <li>Backend (optional local run):
      <pre><code>cd server
npm install
npm run dev</code></pre>
    </li>
  </ol>

  <h2>📂 Folder Structure</h2>
  <pre>
/kete-of-knowledge
  /src
    /navigation   -&gt; Stack/Tab navigators
    /screens      -&gt; Placeholder + sprint-specific pages
    /components   -&gt; Shared UI components
    /theme        -&gt; Colors, fonts, spacing
  /server
    /controllers  -&gt; Route controllers
    /routes       -&gt; API routes
    /db           -&gt; SQLite config + migrations
  </pre>

  <h2>✅ Sprint Progress</h2>
  <ul>
    <li>[x] Sprint 1: Foundation complete</li>
    <li>[ ] Sprint 2: Auth &amp; Onboarding</li>
    <li>[ ] Sprint 3: Profiles &amp; Whakataukī</li>
    <li>[ ] Sprint 4: Condition Library</li>
    <li>[ ] Sprint 5: Symptoms Tracker</li>
    <li>[ ] Sprint 6: Backend &amp; Data Model</li>
    <li>[ ] Sprint 7: Medicines &amp; Rongoā</li>
    <li>[ ] Sprint 8: Reminders &amp; Checklist</li>
    <li>[ ] Sprint 9: Contacts &amp; Learning Resources</li>
    <li>[ ] Sprint 10: Accessibility &amp; Release</li>
  </ul>
</body>
</html>
