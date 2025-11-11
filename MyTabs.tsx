// MyTabs.tsx — Versione corretta al 100%

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native"; // IMPORTANTE

const Tab = createBottomTabNavigator();

// Schermata provvisoria per test
function PlaceholderScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* ✅ Testo ora dentro <Text> */}
      <Text>Questa è la Tab Home (provvisoria)</Text>
    </View>
  );
}

export default function MyTabs() {
  return (
    <Tab.Navigator>
      {/* Nessun NavigationContainer qui! */}
      <Tab.Screen name="Home" component={PlaceholderScreen} />
    </Tab.Navigator>
  );
}
