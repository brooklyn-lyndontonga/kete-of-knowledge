/* eslint-disable react/react-in-jsx-scope */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStack from '../stacks/HomeStack'
import ProfileStack from '../stacks/ProfileStack'
import HubStack from '../stacks/HubStack'
import LibraryStack from '../stacks/LibraryStack'
import SettingsStack from '../stacks/SettingsStack'

const Tab = createBottomTabNavigator()

export default function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
      <Tab.Screen name="Tāku Manawa" component={HubStack} />
      <Tab.Screen name="Library" component={LibraryStack} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  )
}
