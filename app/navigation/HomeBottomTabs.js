import React from "react";
import Calendar from "../screens/Home/Calendar";
import HomeTabs from "./HomeTabs";
import Chatting from "../screens/Home/Chatting";
import Add from "../screens/Home/Add";
import More from "../screens/Home/More";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import HomeFeedStack from "./HomeFeedStack";

const Tab = createBottomTabNavigator();

export default function HomeBottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
      tabBarOptions={{
        activeTintColor: "black",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="HomeFeedStack"
        component={HomeFeedStack}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Octicons name="home" size={21} color="black" />
            ) : (
              <Octicons name="home" size={21} color="gray" />
            ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="calendar-check-outline"
                size={24}
                color="black"
              />
            ) : (
              <MaterialCommunityIcons
                name="calendar-check-outline"
                size={24}
                color="gray"
              />
            ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={Add}
        options={{
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <MaterialIcons name="add-circle-outline" size={40} color="red" />
            ) : (
              <MaterialIcons name="add-circle" size={40} color="red" />
            ),
        }}
      />
      <Tab.Screen
        name="Chatting"
        component={Chatting}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons
                name="ios-chatbox-ellipses-outline"
                size={24}
                color="black"
              />
            ) : (
              <Ionicons
                name="ios-chatbox-ellipses-outline"
                size={24}
                color="gray"
              />
            ),
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Feather name="more-horizontal" size={24} color="black" />
            ) : (
              <Feather name="more-horizontal" size={24} color="gray" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
