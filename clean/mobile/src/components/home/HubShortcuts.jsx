 
 

import { View, Text, Pressable, StyleSheet } from "react-native"
import { colors, radii, shadow, spacing, typography } from "../../theme"

export default function HubShortcuts({ onNavigate }) {
  const items = [
    { 
      label: "Symptoms", 
      subtitle: "Tohumate", 
      desc: "Track and monitor heart symptoms", 
      bg: "rgba(143, 163, 143, 0.08)", // Light dusty eucalyptus tint
      accent: colors.olive,
      actionIcon: "+"
    },
    { 
      label: "Rongoā", 
      subtitle: "Medicines", 
      desc: "Daily heart medicine logger", 
      bg: "rgba(194, 168, 143, 0.06)", // Warm sand tint
      accent: colors.russet,
      actionIcon: "→"
    },
    { 
      label: "Notes", 
      subtitle: "Tuhipoka", 
      desc: "Journal your thoughts and feelings", 
      bg: "#FFFFFF", 
      accent: colors.laurel,
      actionIcon: "+"
    },
    { 
      label: "Checklists", 
      subtitle: "Rārangi arowhai", 
      desc: "Health tasks & lifestyle goals", 
      bg: "#FFFFFF", 
      accent: colors.camel,
      actionIcon: "✓"
    },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Health Tools & Tracking</Text>
      <View style={styles.grid}>
        {items.map((item) => (
          <Pressable
            key={item.label}
            onPress={() => onNavigate(item.label)}
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: item.bg },
              pressed && styles.cardPressed,
            ]}
          >
            <View style={styles.cardHeader}>
              <View>
                <Text style={[styles.label, { color: colors.text }]}>{item.label}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>
            </View>
            <Text style={styles.descText}>{item.desc}</Text>
            
            {/* Mockup Action Button Circle at the bottom right */}
            <View style={[styles.actionCircle, { backgroundColor: item.accent }]}>
              <Text style={styles.actionIcon}>{item.actionIcon}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  sectionHeader: {
    ...typography.title,
    fontSize: 18,
    color: colors.text,
    fontFamily: "Manrope_700Bold",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
    justifyContent: "space-between",
  },
  card: {
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    width: "47.5%",
    minHeight: 140,
    ...shadow.card,
    position: "relative",
    justifyContent: "space-between",
  },
  cardPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.92,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    ...typography.bodyStrong,
    fontSize: 17,
  },
  subtitle: {
    ...typography.caption,
    fontSize: 12,
    color: colors.muted,
    textTransform: "uppercase",
    letterSpacing: 0.3,
    marginTop: 1,
  },
  descText: {
    ...typography.caption,
    color: colors.muted,
    fontSize: 12,
    marginTop: spacing.xs,
    paddingRight: 24, // Keep text away from the action button
    lineHeight: 16,
  },
  actionCircle: {
    position: "absolute",
    bottom: spacing.md,
    right: spacing.md,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    ...shadow.card,
    shadowOpacity: 0.15,
  },
  actionIcon: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
})

