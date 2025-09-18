import { useNavigation } from "@react-navigation/native"

export default function LibraryScreen() {
  const navigation = useNavigation()

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text variant="heading">Library</Text>
      <Spacer size={12} />
      <Card>
        <Text
          onPress={() => navigation.navigate("Conditions")}
          style={{ textDecorationLine: "underline" }}
        >
          Conditions (placeholder)
        </Text>
      </Card>
      <Spacer />
      <Card>
        <Text
          onPress={() => navigation.navigate("Symptoms")}
          style={{ textDecorationLine: "underline" }}
        >
          Symptoms (placeholder)
        </Text>
      </Card>
      <Spacer />
      <Card>
        <Text
          onPress={() => navigation.navigate("Medicines")}
          style={{ textDecorationLine: "underline" }}
        >
          Medicines (placeholder)
        </Text>
      </Card>
    </View>
  )
}
