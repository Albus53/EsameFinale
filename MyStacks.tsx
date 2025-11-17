// MyStacks.tsx — STEP 3
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Button } from "react-native"; // [NUOVO] UI base per placeholder
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";


const Stack = createNativeStackNavigator();

// [NUOVO] Schermata principale dello stack (Home)
function HomePlaceholder({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home (Stack)</Text>
      <Button title="Vai ai dettagli" onPress={() => navigation.navigate("DetailScreen")} />
    </View>
  );
}

function DetailPlaceholder() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Dettaglio</Text>
    </View>
  );
}

export default function MyStacks() {
  return (
    <Stack.Navigator>
      {/* [NUOVO] Registriamo le due schermate nello stack */}
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: "Posts" }} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ title: "Dettaglio Post" }} />
    </Stack.Navigator>
  );
}
