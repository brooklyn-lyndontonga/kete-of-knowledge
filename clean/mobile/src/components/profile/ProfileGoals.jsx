/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { View, Text, Pressable } from "react-native"

export default function ProfileGoals({ goals = [], onToggle, onAdd }) {
  const active = goals.filter((g) => g.active === 1)
  const achieved = goals.filter((g) => g.active === 0)

  return (
    <View style={{ gap: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>My Goals</Text>

      {/* Active goals */}
      {active.length === 0 ? (
        <Text style={{ opacity: 0.6 }}>No active goals</Text>
      ) : (
        active.map((goal) => (
          <Pressable
            key={goal.id}
            onPress={() => onToggle(goal)}
            style={{
              padding: 12,
              borderRadius: 8,
              backgroundColor: "#e8f5e9",
            }}
          >
            <Text style={{ fontWeight: "600" }}>{goal.title}</Text>
            {goal.description ? <Text>{goal.description}</Text> : null}
          </Pressable>
        ))
      )}

      {/* Add */}
      <Pressable
        onPress={onAdd}
        style={{
          padding: 12,
          borderRadius: 8,
          backgroundColor: "#ddd",
          alignItems: "center",
        }}
      >
        <Text>Add Goal</Text>
      </Pressable>

      {/* Achieved */}
      {achieved.length > 0 && (
        <View style={{ gap: 8 }}>
          <Text style={{ fontWeight: "600" }}>Achieved</Text>
          {achieved.map((goal) => (
            <Pressable
              key={goal.id}
              onPress={() => onToggle(goal)}
            >
              <Text style={{ textDecorationLine: "line-through", opacity: 0.6 }}>
                {goal.title}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  )
}
