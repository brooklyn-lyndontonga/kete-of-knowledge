/* eslint-disable no-undef */
function OnboardingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Consent" component={ConsentScreen} />
      <Stack.Screen name="OnboardingWelcome" component={OnboardingWelcome} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
      <Stack.Screen name="Done" component={Done} />
    </Stack.Navigator>
  )
}

export default OnboardingStack