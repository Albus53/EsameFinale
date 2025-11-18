import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoritesScreen from "./screens/FavoritesScreen";
import DetailScreen from "./screens/DetailScreen";

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
