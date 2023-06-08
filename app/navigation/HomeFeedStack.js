import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTabs from "./HomeTabs";
import FeedTabs from "./FeedTab";
import Meeting from "../screens/Home/Meeting";
import MyMeeting from "../screens/Home/MyMeeting";
import Feed from "../screens/Feed";
import Chatting from "../screens/Home/Chatting";
import FeedWrite from "../screens/FeedWrite";
import { TokenContext } from "../screens/Home/TokenContext";
import AddNext from "../screens/Home/AddNext";
import Add from "../screens/Home/Add";
import Calendar from "../components/Calendar";

const Stack = createNativeStackNavigator();

function HomeFeedStack({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeTabs} />
      <Stack.Screen name="Meeting" component={Meeting} />
      <Stack.Screen name="MyMeeting" component={MyMeeting} />
      <Stack.Screen name="AddNext" component={AddNext}/>
      <Stack.Screen name="Add" component={Add}/>
      <Stack.Screen name="Calendar" component={Calendar}/>
      <Stack.Screen name="FeedTabs" component={FeedTabs} />
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="Chatting" component={Chatting} />
      <Stack.Screen name="FeedWrite" component={FeedWrite} />

    </Stack.Navigator>
  );
}

export default HomeFeedStack;
