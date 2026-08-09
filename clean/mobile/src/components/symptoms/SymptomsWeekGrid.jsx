import { useCallback, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { useFocusEffect } from "@react-navigation/native"

import { getSymptomsForWeek, toKey } from "../../features/symptoms.db.js"
import { useLanguage } from "../../i18n/LanguageContext"
import { colors, radii, shadow, spacing, typography } from "../../theme"

const DAY_LABELS = {
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  mi: ["Hin", "Tūr", "Apa", "Par", "Mer", "Hār", "Rāt"],
}

/**
 * Severity is stored 1-5. Colour intensity gives an at-a-glance read of
 * the week without needing to open each entry. Days with entries but no
 * severity still show as marked.
 */
function severityStyle(entries) {
  if (!entries.length) return { backgroundColor: colors.surface }

  const values = entries
    .map((e) => Number(e.severity))
    .filter((n) => !Number.isNaN(n) && n > 0)

  if (!values.length) return { backgroundColor: colors.meringue }

  const peak = Math.max(...values)
  const opacity = 0.25 + Math.min(peak, 5) * 0.15
  return { backgroundColor: colors.olive, opacity }
}

export default function SymptomsWeekGrid({ onSelectDay }) {
  const [week, setWeek] = useState(null)
  const [selected, setSelected] = useState(null)
  const { t, language } = useLanguage()

  const load = useCallback(() => {
    getSymptomsForWeek()
      .then(setWeek)
      .catch((err) => console.warn("Could not load week:", err?.message))
  }, [])

  useFocusEffect(
    useCallback(() => {
      load()
    }, [load])
  )

  if (!week) return null

  const keys = Object.keys(week.days)
  const labels = DAY_LABELS[language] || DAY_LABELS.en
  const total = keys.reduce((n, k) => n + week.days[k].length, 0)
  const selectedEntries = selected ? week.days[selected] || [] : []
  const todayKey = toKey(new Date())

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header">
          {t("symptoms.week")}
        </Text>
        <Text style={styles.count}>{total}</Text>
      </View>

      <View style={styles.row}>
        {keys.map((key) => {
          const entries = week.days[key]
          const date = new Date(`${key}T00:00:00`)
          const dayLabel = labels[(date.getDay() + 6) % 7]
          const isSelected = selected === key
          const isToday = key === todayKey

          return (
            <Pressable
              key={key}
              onPress={() => {
                const next = isSelected ? null : key
                setSelected(next)
                onSelectDay?.(next, entries)
              }}
              style={styles.dayColumn}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={`${dayLabel}, ${
                entries.length === 0
                  ? t("symptoms.noneToday")
                  : `${entries.length}`
              }`}
            >
              <Text style={[styles.dayLabel, isToday && styles.dayLabelToday]}>
                {dayLabel}
              </Text>
              <View
                style={[
                  styles.cell,
                  severityStyle(entries),
                  isSelected && styles.cellSelected,
                  isToday && styles.cellToday,
                ]}
              >
                {entries.length > 0 ? (
                  <Text style={styles.cellCount}>{entries.length}</Text>
                ) : null}
              </View>
              <Text style={styles.dayNumber}>{date.getDate()}</Text>
            </Pressable>
          )
        })}
      </View>

      {selected ? (
        <View style={styles.detail}>
          {selectedEntries.length === 0 ? (
            <Text style={styles.detailEmpty}>{t("symptoms.noneToday")}</Text>
          ) : (
            selectedEntries.map((entry) => (
              <View key={entry.id} style={styles.entry}>
                <Text style={styles.entryTitle}>{entry.symptom}</Text>
                {entry.severity ? (
                  <Text style={styles.entryMeta}>
                    {t("symptoms.severity")} {entry.severity}/5
                  </Text>
                ) : null}
                {entry.notes ? (
                  <Text style={styles.entryNotes}>{entry.notes}</Text>
                ) : null}
              </View>
            ))
          )}
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
    ...shadow.card,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { ...typography.bodyStrong, color: colors.text },
  count: { ...typography.caption, color: colors.muted },
  row: { flexDirection: "row", justifyContent: "space-between" },
  dayColumn: { alignItems: "center", gap: 4, flex: 1, minHeight: 44 },
  dayLabel: { ...typography.caption, color: colors.muted, fontSize: 11 },
  dayLabelToday: {
    color: colors.olive,
    fontFamily: typography.bodyStrong.fontFamily,
  },
  cell: {
    width: 32,
    height: 32,
    borderRadius: radii.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  cellSelected: { borderWidth: 2, borderColor: colors.russet },
  cellToday: { borderWidth: 1, borderColor: colors.olive },
  cellCount: { ...typography.caption, color: colors.white, fontSize: 12 },
  dayNumber: { ...typography.caption, color: colors.muted, fontSize: 10 },
  detail: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    gap: spacing.sm,
  },
  detailEmpty: { ...typography.caption, color: colors.muted },
  entry: { gap: 2 },
  entryTitle: { ...typography.bodyStrong, color: colors.text },
  entryMeta: { ...typography.caption, color: colors.muted },
  entryNotes: { ...typography.body, color: colors.muted },
})
