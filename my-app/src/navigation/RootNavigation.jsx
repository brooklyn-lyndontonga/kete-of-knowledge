import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from "../screens/HomeScreen"
import ProfilesScreen from "../screens/ProfilesScreen"
import LibraryScreen from "../screens/LibraryScreen"
import SettingsScreen from "../screens/SettingsScreen"
import { colors } from "../theme"

const Tab = createBottomTabNavigator()

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: colors.primary
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profiles" component={ProfilesScreen} />
        <Tab.Screen name="Library" component={LibraryScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
