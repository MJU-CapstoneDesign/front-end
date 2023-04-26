import React from "react";
import styled from "styled-components/native";
import Root from "./navigation/Root";
import { NavigationContainer } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const MainText = styled.Text``;

export default function App() {
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
}
