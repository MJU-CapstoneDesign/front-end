import { registerRootComponent } from 'expo';
import messaging from '@react-native-firebase/messaging';
import doPushNotification from './PushNotificationsConfig';

import App from './App';

messaging().setBackgroundMessageHandler(async message => {
	console.log(message);
});

doPushNotification();

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the danram in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
