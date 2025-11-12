/* eslint-disable react/react-in-jsx-scope */
import { NavigationContainer } from '@react-navigation/native'
import AppTabs from './tabs/AppTabs'

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <AppTabs />   {/* <-- Your 5 main bottom tabs */}
    </NavigationContainer>
  )
}
