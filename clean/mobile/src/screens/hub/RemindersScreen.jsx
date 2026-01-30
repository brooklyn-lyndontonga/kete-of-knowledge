/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { ScrollView, Text, View, Button } from "react-native"
import { useState } from "react"

export default function RemindersScreen({ navigation }) {
  // MVP: local-only reminders
  const [reminders, setReminders] = useState([])

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Button
        title="Add Reminder"
        onPress={() => navigation.navigate("AddReminder")}
      />

      {reminders.length === 0 ? (
        <Text style={{ opacity: 0.6 }}>
          No reminders yet
        </Text>
      ) : (
        reminders.map((item, index) => (
          <View
            key={index}
            style={{
              padding: 12,
              backgroundColor: "#f3f3f3",
              borderRadius: 8,
            }}
          >
            <Text style={{ fontWeight: "600" }}>{item.title}</Text>
            <Text>{item.time}</Text>
            {item.notes ? <Text>{item.notes}</Text> : null}
          </View>
        ))
      )}
    </ScrollView>
  )
}
