import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Page from '../Mores/Page';
import Nickname from '../Mores/Nickname';
import Quit from '../Mores/Quit';

const Stack = createStackNavigator();

var ID = {
	nickname: 'Minsoo',
	profile:
		'https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2020/03/27/5561b209-4809-4c6e-9f8b-33d0e7792de8.jpg' /*"https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2020/03/27/5561b209-4809-4c6e-9f8b-33d0e7792de8.jpg"*/,
};

const saveID = async id => {
	try {
		await AsyncStorage.setItem('id', JSON.stringify(id));
	} catch (error) {
		console.log('ID 저장하는 동안 오류 발생했습니다.', error.message);
	}
};
const saveExist = async () => {
	try {
		await AsyncStorage.setItem('exist', 'true');
	} catch (error) {
		console.log('exist 저장하는 동안 오류 발생했습니다.', error.message);
	}
};
const isExist = async () => {
	try {
		const exist = await AsyncStorage.getItem('exist');
		if (exist !== null) {
			console.log('Exist!!');
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.log('exist 저장하는 동안 오류 발생했습니다', error.message);
		return false;
	}
};

export default function More() {
	if (!isExist()) {
		saveID(ID);
		saveExist();
	}

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
