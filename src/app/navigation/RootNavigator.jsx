import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppTabs from '../../navigation/tabs/AppTabs' // ⬅️ note the TWO dots!

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  )
}
