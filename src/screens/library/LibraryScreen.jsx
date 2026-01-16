import React from "react"
import { View, Text, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function LibraryScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={heading}>Resources</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <LibraryCard />
        <LibraryCard />
        <LibraryCard />
      </ScrollView>

      <Text style={heading}>Latest</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <LibraryCard />
        <LibraryCard />
      </ScrollView>

      <Text style={heading}>Other resources</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <LibraryCard />
        <LibraryCard />
      </ScrollView>
    </ScrollView>
    </SafeAreaView>
  )
}

function LibraryCard() {
  return (
    <View style={card}>
      <Text>Resource</Text>
    </View>
  )
}

const heading = {
  fontSize: 18,
  marginVertical: 12,
}

const card = {
  width: 140,
  height: 90,
  borderRadius: 12,
  backgroundColor: "#F5F5F5",
  marginRight: 12,
  justifyContent: "center",
  alignItems: "center",
}
