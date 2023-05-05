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

//문제: 하루만 울리는걸 만들고 싶으면 day 파라메터가 없는 함수 만들기
const requestPermissions = (hours, minute, seconds, day) => {
	const now = new Date();
	const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getDate());
	targetDate.setHours(hours, minute, seconds, 0); // 오후 4시로 설정합니다.

	console.log('targetDate: ', targetDate.getDate());

	PushNotification.localNotificationSchedule({
		title: 'My Notification Title', //파티 이름
		message: 'My Notification Message', // 알아서
		autoCancel: false,
		vibrate: true,
		channelId: 'danram', //얘는 고정
		id: 1, //partyId-memberId
		playSound: true,
		soundName: 'default', //소리 긴걸로 바꿔야 함
		repeatType: 'week', //'week' | 'day' | 'hour' | 'minute' | 'time' | undefined;
		date: targetDate.getDate(),
		repeatTime: day, //반복할 요일
		userInteraction: true,
	});

	// 예약된 알림 정보 출력
	PushNotification.getScheduledLocalNotifications((notifications) => {
		console.log('Scheduled notifications: ', notifications);
	});
};


//권한 확인 함수 => 필요 없을거 같은데 남겨 놨음
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
	PushNotification.getScheduledLocalNotifications((nots)=>console.log(nots)); //예약된 알람 정보 출력
	PushNotification.cancelAllLocalNotifications(); // 모든 알람 삭제
	//PushNotification.cancelLocalNotification('1'); // 특정 알람 삭제
};  

export default function PushNotificationsHandler() {
	useEffect(() => {
		checkPermission();
	}, []);

	return (
		<Container>
			<MainButton onPress={requestPermissions}>
				<MainText>make alarm</MainText>
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