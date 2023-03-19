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

export default function App() {
  return (
    <Container>
      <MainText>Open up App.js to start working on your app!</MainText>
    </Container>
  );
}
