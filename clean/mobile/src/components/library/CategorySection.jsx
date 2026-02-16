 
 
import { View, Text, StyleSheet } from "react-native"
import ResourceCard from "../ResourceCard"
import { colors, spacing, typography } from "../../theme"

export default function CategorySection({ title, items }) {
  if (!items || !items.length) return null

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>

      {items.map((item) => (
        <ResourceCard key={item.id} item={item} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
})
