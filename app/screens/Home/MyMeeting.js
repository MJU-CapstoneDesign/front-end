import { StatusBar } from "expo-status-bar";
import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const MainText = styled.Text``;

export default function MyMeeting() {
  return (
    <Container>
      <MainText>MyMeeting</MainText>
    </Container>
  );
}
