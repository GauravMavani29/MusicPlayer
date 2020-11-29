import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./components/MainScreen";
import MusicAlbum from "./components/MusicAlbum";
const AppStack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: true }}>
        <AppStack.Screen name="Music Player" component={MainScreen} />
        <AppStack.Screen name="Music Album" component={MusicAlbum} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
