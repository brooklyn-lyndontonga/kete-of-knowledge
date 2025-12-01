/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import { ScrollView, View } from "react-native"
import WhakataukiCard from "./WhakataukiCard"
import ReflectionTile from "./ReflectionTile"
import ProgressSnapshot from "./ProgressSnapshot"

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <WhakataukiCard />
      <ReflectionTile />
      <ProgressSnapshot />
    </ScrollView>
  )
}
