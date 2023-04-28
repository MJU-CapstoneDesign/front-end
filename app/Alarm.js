// Purpose: This file contains the code for the Alarm screen.
// Import necessary libraries
import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: '#F2DFDF';
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

const MainText = styled.Text``;

export default function Alarm() {
	let today = new Date();   

	let year = today.getFullYear(); // 년도
	let month = today.getMonth() + 1;  // 월
	let date = today.getDate();  // 날짜
	let day = today.getDay();  // 요일

	return (
		<Container>
			<MainText>{year}/{month}/{date} {getDay(day)}</MainText>
		</Container>
	);
}

