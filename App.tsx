// App.tsx — versione corretta
// [IMPORTANTE] Questo è l'ingresso dell'app e contiene NavigationContainer

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./MyTabs"; // usa il file MyTabs che ora è corretto

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs /> {/* Navigazione bottom-tabs */}
    </NavigationContainer>
  );
}
