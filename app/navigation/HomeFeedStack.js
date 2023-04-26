import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeTabs from "./HomeTabs";
import FeedTabs from "./FeedTabs";

const Stack = createNativeStackNavigator();

function HomeFeedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeTabs} />
      <Stack.Screen name="Feed" component={FeedTabs} />
    </Stack.Navigator>
  );
}

export default HomeFeedStack;