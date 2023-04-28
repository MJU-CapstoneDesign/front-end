// Purpose: This file contains the code for the Alarm screen.
// Import necessary libraries
import React from 'react';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: 'rgb(242, 223, 223)';
`;

const getDay = function(day) {
	switch(day) {
	case 0:
		return '일';
	case 1:
		return '월';
	case 2:
		return '화';
	case 3:
		return '수';
	case 4:
		return '목';
	case 5:
		return '금';
	case 6:
		return '토';
	}
};

const SubText = styled.Text`
`;

const MainText = styled.Text`
	font-size: 80px;
	font-weight: bold;
	color: 'rgb(104, 38, 38)';
`;

const AlarmOffContainer = styled.TouchableOpacity`
	margin-top: 155px;
	margin-bottom: -125px;
`;

export default function Alarm() {
	let today = new Date();   

	let year = today.getFullYear(); // 년도
	let month = today.getMonth() + 1;  // 월
	let date = today.getDate();  // 날짜
	let day = today.getDay();  // 요일
	let hour = today.getHours(); // 시
	let minute = today.getMinutes();  // 분

	return (
		<Container>
			<SubText>{year}/{month}/{date} {getDay(day)}</SubText>
			<MainText>{hour}:{minute}</MainText>
			<AlarmOffContainer onPress={() => console.log('touched')}>
				<MaterialIcons name="cancel" size={114} color="rgb(228, 111, 111)" />
			</AlarmOffContainer>
		</Container>
	);
}

