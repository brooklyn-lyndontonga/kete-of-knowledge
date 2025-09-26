/* eslint-disable unused-imports/no-unused-vars */
 // src/navigation/stacks/PostSignInStack.jsx
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import WelcomeScreen from "../../onboarding/WelcomeScreen"
import ProfileSetupScreen from "../../onboarding/ProfileSetupScreen"
import ConsentScreen from "../../onboarding/ConsentScreen"
import PersonalisationScreen from "../../onboarding/PersonalisationScreen"
import DoneScreen from "../../onboarding/DoneScreen"

const Stack = createNativeStackNavigator()

function PostSignInStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
      <Stack.Screen name="Consent" component={ConsentScreen} />
      <Stack.Screen name="Personalisation" component={PersonalisationScreen} />
      <Stack.Screen name="Done" component={DoneScreen} />
    </Stack.Navigator>
  )
}

export default PostSignInStack
