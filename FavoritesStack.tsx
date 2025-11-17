// FavoritesStack.tsx — Stack per Preferiti + Dettaglio

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FavoritesScreen from "./screens/FavoritesScreen";
import DetailScreen from "./screens/DetailScreen"; // ⭐ IMPORTANTE

const Stack = createNativeStackNavigator();

export default function FavoritesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{
          title: "Preferiti",
        }}
      />

      {/* ⭐ AGGIUNGIAMO DetailScreen ANCHE QUI */}
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{
          title: "Dettaglio Post",
        }}
      />
    </Stack.Navigator>
  );
}
