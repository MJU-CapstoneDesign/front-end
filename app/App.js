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
      <MainText>형이 준 파일 빌드 안되잖아요 app.js</MainText>
    </Container>
  );
}
