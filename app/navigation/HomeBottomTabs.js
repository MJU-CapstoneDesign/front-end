import React from "react";
import Calendar from "../screens/Home/Calendar";
import HomeTabs from "./HomeTabs";
import Chatting from "../screens/Home/Chatting";
import Add from "../screens/Home/Add";
import More from "../screens/Home/More";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function HomeBottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeTabs" component={HomeTabs} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Add" component={Add} />
      <Tab.Screen name="Chatting" component={Chatting} />
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  );
}
