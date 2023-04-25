import { registerRootComponent } from 'expo';
import messaging from '@react-native-firebase/messaging'

import App from './App';

messaging().setBackgroundMessageHandler(async message => {
    console.log(message)
  })

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the danram in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
