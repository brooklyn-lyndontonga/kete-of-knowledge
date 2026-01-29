/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { View, Text, Pressable } from "react-native"

export default function ResourceCard({ item, onPress }) {
  if (!item) return null

  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 16,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#E5E5E5",
      }}
    >
      {/* Title */}
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          marginBottom: 4,
        }}
      >
        {item.title}
      </Text>

      {/* Description */}
      {item.description ? (
        <Text
          style={{
            fontSize: 14,
            color: "#555",
            marginBottom: 8,
          }}
        >
          {item.description}
        </Text>
      ) : null}

      {/* Meta row */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {/* Category */}
        {item.category ? (
          <Text
            style={{
              fontSize: 12,
              color: "#888",
              textTransform: "capitalize",
            }}
          >
            {item.category}
          </Text>
        ) : null}

        {/* Type */}
        {item.type ? (
          <Text
            style={{
              fontSize: 12,
              color: "#888",
            }}
          >
            {item.type}
          </Text>
        ) : null}
      </View>
    </Pressable>
  )
}
