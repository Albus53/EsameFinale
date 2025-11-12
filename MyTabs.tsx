// MyTabs.tsx — STEP B1
// [AGGIORNATO] La tab "Home" ora mostra il nostro Stack Navigator

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import MyStacks from "./MyStacks"; // [NUOVO] import dello stack

const Tab = createBottomTabNavigator();

// [TEMP] Placeholder per una seconda tab, così si vede la barra
function ProfilePlaceholder() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profilo (Tab 2)</Text>
    </View>
  );
}

export default function MyTabs() {
  return (
    <Tab.Navigator>
      {/* [MODIFICATO] Home ora mostra MyStacks */}
      <Tab.Screen name="Home" component={MyStacks} options={{ title: "Home" }} />

      {/* [NUOVO] Aggiunta una seconda tab di test */}
      <Tab.Screen name="Profile" component={ProfilePlaceholder} options={{ title: "Profilo" }} />
    </Tab.Navigator>
  );
}
