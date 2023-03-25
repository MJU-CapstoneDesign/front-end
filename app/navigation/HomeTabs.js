import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Meeting from "../screens/Home/Meeting";
import MyMeeting from "../screens/Home/MyMeeting";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();

function HomeTabs() {
  return (
    <>
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 0.001, backgroundColor: "white" }}
      />
      <Tab.Navigator>
        <Tab.Screen name="Meeting" component={Meeting} />
        <Tab.Screen name="MyMeeting" component={MyMeeting} />
      </Tab.Navigator>
    </>
  );
}

export default HomeTabs;
