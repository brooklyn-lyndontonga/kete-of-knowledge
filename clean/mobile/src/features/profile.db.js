import { getDB } from "../db/index.js";

export function getProfile() {
  const db = getDB();

  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM profiles ORDER BY id DESC LIMIT 1",
        [],
        (_, { rows }) => resolve(rows._array[0] || null)
      );
    });
  });
}

export function saveProfile(profile) {
  const db = getDB();
  const {
    name,
    dob,
    photo_uri,
    health_info,
    health_providers,
    emergency_contacts,
  } = profile;

  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        INSERT INTO profiles
        (name, dob, photo_uri, health_info, health_providers, emergency_contacts)
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
          name,
          dob,
          photo_uri || null,
          health_info,
          JSON.stringify(health_providers || []),
          JSON.stringify(emergency_contacts || []),
        ],
        () => resolve()
      );
    });
  });
}
