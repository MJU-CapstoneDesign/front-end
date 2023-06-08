import { registerRootComponent } from "expo";
import messaging from "@react-native-firebase/messaging";
import doPushNotification from "./PushNotificationsConfig";
import { AppRegistry } from "react-native";
import notifee, { EventType } from "@notifee/react-native";

import App from "./App";

messaging().setBackgroundMessageHandler(async (message) => {
  console.log(message);
});

doPushNotification();

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the danram in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);


notifee.onBackgroundEvent(async ({ type, detail }) => {
  console.log("type", EventType[type], detail);
  const { notification, pressAction } = detail;

  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction.id === "default") {
    // Update external API
    console.log("Confirm action pressed");
    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});

AppRegistry.registerComponent("app", () => App);
