import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTabs from "./HomeTabs";
import FeedTabs from "./FeedTab";
import Meeting from "../screens/Home/Meeting";
import MyMeeting from "../screens/Home/MyMeeting";
import Feed from "../screens/Feed";
import Chatting from "../screens/Home/Chatting";

const Stack = createNativeStackNavigator();

function HomeFeedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeTabs} />
      <Stack.Screen name="FeedTabs" component={FeedTabs} />
      <Stack.Screen name="Meeting" component={Meeting} />
      <Stack.Screen name="MyMeeting" component={MyMeeting} />
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="Chatting" component={Chatting} />
    </Stack.Navigator>
  );
}

export default HomeFeedStack;
