import React, { useState } from "react"
import { View, Text, Switch } from "react-native"

export default function NotificationSettingsScreen() {
  const [enabled, setEnabled] = useState(false)

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>
        Notifications
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text>Enable reminders</Text>
        <Switch value={enabled} onValueChange={setEnabled} />
      </View>
    </View>
  )
}
