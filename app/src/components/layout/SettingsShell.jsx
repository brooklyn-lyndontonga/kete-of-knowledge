/* eslint-disable react/prop-types */
import React from "react"
import PageShell from "./PageShell"
import Section from "./Section"

export default function SettingsShell({ title, children }) {
  return (
    <PageShell>
      <Section title={title}>
        {children}
      </Section>
    </PageShell>
  )
}
