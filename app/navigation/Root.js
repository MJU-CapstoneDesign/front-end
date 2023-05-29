import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeBottomTabs from "./HomeBottomTabs";
import AddStack from "./AddStack";
import FeedTabs from "./FeedTab";
import HomeTabs from "./HomeTabs";
import HomeFeedStack from "./HomeFeedStack";
import { TokenContext } from "../screens/Home/TokenContext";

const Stack = createNativeStackNavigator();

function Root({ token }) {
  const { setTokenContext } = useContext(TokenContext);
  setTokenContext(token);
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeBottomTabs" component={HomeBottomTabs} />
      <Stack.Screen name="AddStack" component={AddStack}/>
      <Stack.Screen name="HomeFeedStack" component={HomeFeedStack} />
      <Stack.Screen name="FeedTabs" component={FeedTabs} />
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
    </Stack.Navigator>
  );
}

export default Root;
