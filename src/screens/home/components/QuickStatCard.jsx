/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { Pressable } from "react-native"
import { Card, Text, Spacer } from "../../../ui"

export default function QuickStatCard({
  title,
  value,
  subtitle,
  onPress,
}) {
  return (
    <Pressable onPress={onPress}>
      <Card>
        <Text variant="section">{title}</Text>

        <Spacer size="xs" />

        <Text>{value}</Text>

        {subtitle && (
          <>
            <Spacer size="xs" />
            <Text variant="muted">{subtitle}</Text>
          </>
        )}
      </Card>
    </Pressable>
  )
}
