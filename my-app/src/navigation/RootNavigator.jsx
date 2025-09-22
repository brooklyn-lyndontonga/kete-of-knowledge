/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
import { NavigationContainer } from "@react-navigation/native";   // ✅ add this
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./stacks/HomeStack";
import ProfilesStack from "./stacks/ProfilesStack";
import LibraryStack from "./stacks/LibraryStack";
import SettingsStack from "./stacks/SettingsStack";
import { colors } from "../theme";

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
        }}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Profiles" component={ProfilesStack} />
        <Tab.Screen name="Library" component={LibraryStack} />
        <Tab.Screen name="Settings" component={SettingsStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}