/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { ScrollView } from "react-native"

import WhakataukiBanner from "../components/home/WhakataukiBanner"
import QuickView from "../components/home/QuickView"
import HubShortcuts from "../components/home/HubShortcuts"

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
      <WhakataukiBanner
        text="He oranga ngākau, he pikinga waiora"
        translation="Positive feelings enhance wellbeing"
      />

      <QuickView label="Symptoms today" value="3" />
      <QuickView label="Active goals" value="2" />

      <HubShortcuts onNavigate={(route) => navigation.navigate(route)} />
    </ScrollView>
  )
}
