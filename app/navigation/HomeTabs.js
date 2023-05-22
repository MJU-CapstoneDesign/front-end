import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Meeting from "../screens/Home/Meeting";
import MyMeeting from "../screens/Home/MyMeeting";
import { SafeAreaView } from "react-native-safe-area-context";
import { TokenContext } from "../screens/Home/TokenContext";
import { useContext } from "react";

const Tab = createMaterialTopTabNavigator();

function HomeTabs() {

  const {token} = useContext(TokenContext);
  console.log(token);

  return (
    <>
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 0.001, backgroundColor: "white" }}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: "bold",
            //fontFamily: "SpoqaHanSansNeo-Bold",
          },
          tabBarIndicatorStyle: { backgroundColor: "#C28080" },

          //tabBarActiveTintColor: isDark ? WHITE_COLOR : BLACK_COLOR,
          //tabBarInactiveTintColor: LIGHT_GRAY,
        }}
      >
        <Tab.Screen name="모임 둘러보기" >{() => <Meeting token={token} />}</Tab.Screen>
        <Tab.Screen name="내 모임" component={MyMeeting} />
      </Tab.Navigator>
    </>
  );
}

export default HomeTabs;
