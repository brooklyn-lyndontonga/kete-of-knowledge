/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { useOnboarding } from "../../../app/providers/OnboardingProvider"
import { useNavigation } from "@react-navigation/native"

export default function Done() {
  const { completeOnboarding } = useOnboarding()
  const navigation = useNavigation()

  const handleFinish = async () => {
    await completeOnboarding()

    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }], // AppTabs starts at Home
    })
  }

  return (
    <View>
      <Text>All done! 🎉</Text>
      <Button title="Continue to App" onPress={handleFinish} />
    </View>
  )
}
