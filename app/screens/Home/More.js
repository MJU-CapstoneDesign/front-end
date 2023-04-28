import React from 'react';
import styled from 'styled-components/native';
import Alarm from '../../Alarm';
import LogIn from './Login';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const MainText = styled.Text``;

export default function More() {
	return (
		<LogIn />
	);
}
