/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { View, Text, Pressable } from "react-native"

export default function RemindersPreview({ items = [], onAdd }) {
  return (
    <View style={{ gap: 8 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "600" }}>
          Reminders
        </Text>
        <Pressable onPress={onAdd}>
          <Text style={{ color: "#007AFF" }}>Add</Text>
        </Pressable>
      </View>

      {items.length === 0 ? (
        <Text style={{ opacity: 0.6 }}>
          No reminders set for today
        </Text>
      ) : (
        items.map((item) => (
          <View
            key={item.id}
            style={{
              padding: 12,
              borderRadius: 8,
              backgroundColor: "#f3f3f3",
            }}
          >
            <Text style={{ fontWeight: "500" }}>{item.title}</Text>
            {item.time ? (
              <Text style={{ opacity: 0.6 }}>{item.time}</Text>
            ) : null}
          </View>
        ))
      )}
    </View>
  )
}
