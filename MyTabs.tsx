import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import MyStacks from "./MyStacks";
import FavoritesStack from "./FavoritesStack";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#1d3557",
          tabBarInactiveTintColor: "#8d99ae",

          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#e0e0e0",
            height: 75,
            paddingTop: 12,
            paddingBottom: 2,
            elevation: 0,
            shadowOpacity: 0,
          },

          tabBarHideOnKeyboard: true,

          tabBarIcon: ({ focused, color }) => {
            let iconName = "";

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Favorites") {
              iconName = focused ? "star" : "star-outline";
            }

            return (
              <View style={{ marginBottom: 0 }}>
                <Ionicons name={iconName as any} size={26} color={color} />
              </View>
            );
          },
        })}
      >
        {/* HOME → usa MyStacks (HomeScreen + DetailScreen) */}
        <Tab.Screen
          name="Home"
          component={MyStacks}
          options={{ title: "Home" }}
        />

        <Tab.Screen
          name="Favorites"
          component={FavoritesStack}
          options={{
            title: "Preferiti",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? "star" : "star-outline"}
                size={26}
                color={color}
              />
            ),
          }}
        />

      </Tab.Navigator>
    </SafeAreaView>
  );
}
