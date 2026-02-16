 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeStack from "./HomeStack"
import Profile from "./ProfileStack"
import HubStack from "./HubStack"
import LibraryStack from "./LibraryStack"
import SettingsStack from "./SettingsStack"
import { colors, typography } from "../theme"

const Tab = createBottomTabNavigator()

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.olive,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.cornsilk,
          borderTopColor: colors.border,
          paddingTop: 6,
          paddingBottom: 8,
          height: 64,
        },
        tabBarLabelStyle: {
          fontFamily: typography.body.fontFamily,
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Hub" component={HubStack} />
      <Tab.Screen name="Library" component={LibraryStack} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  )
}
