import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

export default function doPushNotification() {
	// Must be outside of any component LifeCycle (such as `componentDidMount`).
	PushNotification.configure({
	// (optional) Called when Token is generated (iOS and Android)
		onRegister: function (token) {
			console.log('TOKEN:', token);
		},

		// (required) Called when a remote is received or opened, or local notification is opened
		onNotification: function (notification) {
			console.log('When alarm is NOTIFICATION:', notification);

			// process the notification
			console.log('This alarm is from: ', notification.channelId);

			// (required) Called when a remote is received or opened, or local notification is opened
			notification.finish(PushNotificationIOS.FetchResult.NoData);
		},

		// (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
		onAction: function (notification) {
			console.log('ACTION:', notification.action);
			console.log('NOTIFICATION:', notification);

		// process the action
		},

		channelId: 'danram', // (required) channelId, if the channel doesn't exist, notification will not trigger.

		// (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
		onRegistrationError: function(err) {
			console.error(err.message, err);
		},

		// IOS ONLY (optional): default: all - Permissions to register.
		permissions: {
			alert: true,
			badge: true,
			sound: true,
		},

		// Should the initial notification be popped automatically
		// default: true
		popInitialNotification: true, //앱이 실행될 때, 기존에 예약된 알림이 있는 경우 이를 처리해 줄 것인지 여부를 결정합니다.

		/**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   * - 백그라운드일 떄 푸시 알림을 받을 수 있도록 허용할 것인지 여부를 결정합니다.
   */
		requestPermissions: true,
	});

	// 채널을 통해 푸시알람에 대한 디테일한 설정이 가능하다.
	// 공지사항용, 광고용, 단순 알람용 등등 ..
	// 유저는 특정 채널을 수신 거부하는 등의 개별 설정이 가능하다.
	PushNotification.createChannel({
		channelId: 'danram', // (required)
		channelName: '단람 알람', // (required)
		vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
	},
	(created) =>
		// (optional) callback returns whether the channel was created, false means it already existed.
		console.log(`createChannel riders returned '${created}'`) 
	);
}