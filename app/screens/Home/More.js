import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import PushNotification from 'react-native-push-notification';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const MainText = styled.Text``;

const MainButton = styled.TouchableOpacity`
	background-color: #F2DFDF;
	width: 60px;
	height: 40px;
	justify-content: center;
	align-items: center;
	border-radius: 20px;
`;

const requestPermissions = () => {
	const today = new Date();

	today.setTime(today.getTime() + (540 * 60 * 1000) + (10 * 1000));

	PushNotification.localNotificationSchedule({
		title: 'My Notification Title',
		message: 'My Notification Message',
		autoCancel: false,
		vibrate: true,
		channelId: 'danram',
		id: 1,
		playSound: true,
		soundName: 'default',
		repeatType: 'week', //'week' | 'day' | 'hour' | 'minute' | 'time' | undefined;
		date: (new Date(2023, 4, 2, 12 + 9, 47, 0)),
	//repeatTime: [1, 5], //반복할 시간
	});

	// 예약된 알림 정보 출력
	PushNotification.getScheduledLocalNotifications((notifications) => {
		console.log('Scheduled notifications: ', notifications);
	});
};

const checkPermission = () => {
	PushNotification.checkPermissions((permission) => {
		console.log('permissions: {}',permission);
	});
};

const checkChannels = () => {
	PushNotification.getChannels(function (channel_ids) {
		console.log(channel_ids); // ['channel_id_1']
	});
};

const deleteChannel = () => {
	//PushNotification.deleteChannel('dan');
	PushNotification.getScheduledLocalNotifications((nots)=>console.log(nots));
	PushNotification.cancelAllLocalNotifications();
	//PushNotification.cancelLocalNotification('1');
	//console.log(new Date(2023, 4, 2, 11 + 9, 43, 11));
};

const createChannel = () => {
	PushNotification.createChannel({
		channelId: 'dan', // (required)
		channelName: '단람 알람', // (required)
		vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
	},
	(created) =>
		// (optional) callback returns whether the channel was created, false means it already existed.
		console.log(`createChannel riders returned '${created}'`) );
};
  

export default function More() {
	useEffect(() => {
		checkPermission();
	}, []);

	return (
		<Container>
			<MainButton onPress={requestPermissions}>
				<MainText>More</MainText>
			</MainButton>
			<MainButton onPress={checkChannels}>
				<MainText>checkChannels</MainText>
			</MainButton>
			<MainButton onPress={deleteChannel}>
				<MainText>add</MainText>
			</MainButton>
		</Container>
	);
}