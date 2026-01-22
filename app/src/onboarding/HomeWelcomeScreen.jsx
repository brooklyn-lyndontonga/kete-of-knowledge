import React from 'react'
import { Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useOnboarding } from '../../app/providers/OnboardingProvider'

import PageShell from '../../components/layout/PageShell'
import Section from '../../components/layout/Section'
import Card from '../../components/Card'
import Button from '../../components/Button'
import { globalStyles } from '../../theme/globalStyles'

export default function HomeWelcomeScreen() {
  const navigation = useNavigation()
  const { markHomeWelcomeSeen } = useOnboarding()

  const handleContinue = async () => {
    await markHomeWelcomeSeen()
    navigation.replace('HomeMain')
  }

  return (
    <PageShell>
      <Section title="Nau mai ki tō kete">
        <Card>
          <Text style={globalStyles.text}>
            This space is here to support you on your health and wellbeing
            journey. You can move at your own pace.
          </Text>
        </Card>
      </Section>

      <Section>
        <Button title="Open Your kete" onPress={handleContinue} />
      </Section>
    </PageShell>
  )
}
