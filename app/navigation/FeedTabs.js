import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import Feed from "../screens/Home/Feed";
import Chatting from "../screens/Home/Chatting";
import { View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();

function FeedTabs({ navigation }) {
  return (
    <>
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 0.001, backgroundColor: "white" }}
      />
      <View style={{ backgroundColor: "white" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ width: 30 }}
        >
          <AntDesign name="left" size={25} color="black" />
        </TouchableOpacity>
      </View>
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: { fontSize: 16, fontWeight: "bold" },
          indicatorStyle: { backgroundColor: "gray" },
        }}
      >
        <Tab.Screen name="피드" component={Feed} />
        <Tab.Screen name="채팅" component={Chatting} />
      </Tab.Navigator>
    </>
  );
}

export default FeedTabs;
