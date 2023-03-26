import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeBottomTabs from "./HomeBottomTabs";

const Nav = createNativeStackNavigator();

function Root() {
  return (
    <Nav.Navigator screenOptions={{ headerShown: false }}>
      <Nav.Screen name="HomeBottomTabs" component={HomeBottomTabs} />
    </Nav.Navigator>
  );
}

export default Root;
