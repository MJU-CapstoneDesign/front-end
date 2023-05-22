import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Calendar from "../screens/Home/Calendar";
import HomeTabs from "./HomeTabs";
import Chatting from "../screens/Home/Chatting";
import More from "../screens/Home/More";
import AddNext from "../screens/Home/AddNext";
import Feed from "../screens/Feed";
import { TokenContext } from "../screens/Home/TokenContext";

const Stack = createNativeStackNavigator();

function AddStack({navigation}) {
  return (

    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
      <Stack.Screen name="Calendar" component={Calendar} />
      <Stack.Screen name="Chatting" component={Chatting} />
      <Stack.Screen name="More" component={More} />
      <Stack.Screen name="AddNext" component={AddNext} />
      <Stack.Screen name="Feed" component={Feed} />
    </Stack.Navigator>
  );
}

export default AddStack;
