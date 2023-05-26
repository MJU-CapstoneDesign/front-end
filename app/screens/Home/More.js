import {createStackNavigator} from '@react-navigation/stack';
import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


import Page from '../Mores/Page';
import Nickname from '../Mores/Nickname';
import Quit from '../Mores/Quit';

const Stack = createStackNavigator();


export default function More() {

	return (
		<Stack.Navigator
			tabBarOptions={{
				showLabel: false,
				showIcon: false,
			}}>
			<Stack.Screen name="Page" component={Page} />
			<Stack.Screen name="Nickname" component={Nickname} />
			<Stack.Screen name="Quit" component={Quit} />
		</Stack.Navigator>
	);
}
