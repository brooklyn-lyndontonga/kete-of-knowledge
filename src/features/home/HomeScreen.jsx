/* eslint-disable no-unused-vars */
import React from "react"
import { View, ActivityIndicator, Text } from "react-native"

import PageShell from "../../components/layout/PageShell"
import Section from "../../components/layout/Section"
import { globalStyles } from "../../theme/globalStyles"

import { useWhakatauki } from "../hooks/useWhakatauki"
import { useSnapshots } from "../hooks/useSnapshots"

import WhakataukiCard from "../../components/WhakataukiCard"
import ProgressSnapshotCard from "./components/ProgressSnapshotCard"

export default function HomeScreen() {
  // ✅ correct hook usage
  const {
    whakatauki,
    loading: loadingQuote,
    error: quoteError,
  } = useWhakatauki()

  const {
    snapshots = [],
    loading: loadingSnapshots,
    error: snapshotError,
  } = useSnapshots()

  const loading = loadingQuote || loadingSnapshots
  const error = quoteError || snapshotError

  if (loading) {
    return (
      <PageShell>
        <ActivityIndicator />
      </PageShell>
    )
  }

  if (error) {
    return (
      <PageShell>
        <Text style={globalStyles.mutedText}>
          Something went wrong loading your kete.
        </Text>
      </PageShell>
    )
  }

  const latestSnapshot = snapshots[0] || null

  return (
    <PageShell>
      {/* 🌿 Whakataukī */}
      <Section title="Whakataukī">
        {whakatauki ? (
          <WhakataukiCard whakatauki={whakatauki} />
        ) : (
          <Text style={globalStyles.mutedText}>
            No whakataukī available today.
          </Text>
        )}
      </Section>

      {/* 📊 Progress Snapshot */}
      <Section title="Your progress">
        {latestSnapshot ? (
          <ProgressSnapshotCard snapshot={latestSnapshot} />
        ) : (
          <Text style={globalStyles.mutedText}>
            No progress logged yet.
          </Text>
        )}
      </Section>
    </PageShell>
  )
}
