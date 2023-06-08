import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createStackNavigator} from '@react-navigation/stack';
import Page from '../Mores/Page';
import Nickname from '../Mores/Nickname';
import Quit from '../Mores/Quit';

const Stack = createStackNavigator();


export default function More() {
  const Click = () => {
    console.log(">> tokens {}", getToken());
  };

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("jwts");
      if (value !== null) {
        const data = JSON.parse(value);

        return data;
      } else {
        console.log("저장된 JWT 토큰이 없습니다.");
        return "";
      }
    } catch (error) {
      console.log("JWT 토큰을 검색하는 동안 오류가 발생했습니다:", error);
      return "";
    }
  };

  

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