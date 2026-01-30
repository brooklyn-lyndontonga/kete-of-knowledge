/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { View, TextInput, Button } from "react-native";
import { useState } from "react";
import { saveProfile } from "../../features/profile.db.js";

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [healthInfo, setHealthInfo] = useState("");

  async function save() {
    if (!name) return;

    await saveProfile({
      name,
      dob,
      health_info: healthInfo,
      health_providers: [],
      emergency_contacts: [],
    });

    navigation.goBack();
  }

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Date of birth" value={dob} onChangeText={setDob} />
      <TextInput
        placeholder="Health info (conditions, allergies, etc)"
        value={healthInfo}
        onChangeText={setHealthInfo}
        multiline
      />

      <Button title="Save Profile" onPress={save} />
    </View>
  );
}
