import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";

const Stack = createNativeStackNavigator();
export default function MyStacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: "Posts" }} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ title: "Dettaglio Post" }} />
    </Stack.Navigator>
  );
}
