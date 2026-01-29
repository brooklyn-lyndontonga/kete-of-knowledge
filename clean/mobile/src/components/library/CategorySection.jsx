/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { View, Text } from "react-native"
import ResourceCard from "../ResourceCard.jsx/index.js"

export default function CategorySection({ title, items }) {
  if (!items.length) return null

  return (
    <View>
      <Text style={{ fontSize: 20, marginBottom: 8 }}>{title}</Text>
      {items.map((item) => (
        <ResourceCard key={item.id} item={item} />
      ))}
    </View>
  )
}
