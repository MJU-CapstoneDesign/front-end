import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeBottomTabs from "./HomeBottomTabs";
import Feed from "../screens/Feed";
import MyMeeting from "../screens/Home/MyMeeting";
import Meeting from "../screens/Home/Meeting";
import FeedTabs from "./FeedTab";
import HomeTabs from "./HomeTabs";
import HomeFeedStack from "./HomeFeedStack";

const Nav = createNativeStackNavigator();

function Root() {
  return (
    <Nav.Navigator screenOptions={{ headerShown: false }}>
      <Nav.Screen name="HomeBottomTabs" component={HomeBottomTabs} />
      <Nav.Screen name="HomeFeedStack" component={HomeFeedStack} />
      <Nav.Screen name="FeedTabs" component={FeedTabs} />
      <Nav.Screen name="HomeTabs" component={HomeTabs} />
    </Nav.Navigator>
  );
}

export default Root;
