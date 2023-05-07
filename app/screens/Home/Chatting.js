import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

// 파티 참가했을때 Container
const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

// 파티 참가하기 전 Container
const BeforeContainer = styled.View`
  flex: 1;
  background-color: #f0f0f0;
  align-items: center;
  justify-content: center;
`;

const MainText = styled.Text``;

// 토큰을 가지고 있는지 확인하는 화면
const haveTokken = false;

// 기기화면에 맞는 변수 설정
const { width, height } = Dimensions.get("window");

// 채팅 불가 화면 텍스트
const NotJoinText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: #a43131;
`;

export default function Chatting() {
  return haveTokken ? (
    <Container>
      <MainText>채팅화면</MainText>
    </Container>
  ) : (
    <BeforeContainer>
      <View
        style={{
          width: width - 40,
          height: 150,
          backgroundColor: "white",
          borderRadius: 20,
          marginTop: -height / 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FontAwesome5
          name="sad-cry"
          size={24}
          color="#A43131"
          style={{ marginBottom: 11, marginTop: -10 }}
        />
        <NotJoinText>지금은 채팅을 사용할 수 없어요.</NotJoinText>
        <NotJoinText> 모임을 같이 시작해봐요!</NotJoinText>
      </View>
    </BeforeContainer>
  );
}
