/* eslint-disable react/prop-types */
// import React from 'react'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { useOnboarding } from '../../providers/OnboardingProvider'

// // Screens (features only)
// import HomeWelcomeScreen from '../../../features/home/HomeWelcomeScreen'
// import HomeScreen from '../../../features/home/HomeScreen02'
// import WriteReflectionScreen from '../../../features/hub/WriteReflectionScreen'

// const Stack = createNativeStackNavigator()

// export default function HomeStack() {
//   const { hasSeenHomeWelcome } = useOnboarding()

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {!hasSeenHomeWelcome && (
//         <Stack.Screen name="HomeWelcome" component={HomeWelcomeScreen} />
//       )}

//       <Stack.Screen name="HomeMain" component={HomeScreen} />

//       <Stack.Screen name="WriteReflection" component={WriteReflectionScreen} />
//     </Stack.Navigator>
//   )
// }

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text, TouchableOpacity } from 'react-native'

const Stack = createNativeStackNavigator()

function HomeTest({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 22 }}>HOME STACK</Text>

      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => navigation.navigate('HomeSecond')}
      >
        <Text style={{ fontSize: 18 }}>Go to second screen</Text>
      </TouchableOpacity>
    </View>
  )
}

function HomeSecond() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 22 }}>HOME SECOND SCREEN</Text>
    </View>
  )
}

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeTest} />
      <Stack.Screen name="HomeSecond" component={HomeSecond} />
    </Stack.Navigator>
  )
}
