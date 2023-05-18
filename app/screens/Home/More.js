import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const MainText = styled.Text``;

export default function More() {
  const Click = () => {
    console.log(">> tokens {}", getToken());
  };

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("jwts");
      if (value !== null) {
        const data = JSON.parse(value);

        return data;
      } else {
        console.log("저장된 JWT 토큰이 없습니다.");
        return "";
      }
    } catch (error) {
      console.log("JWT 토큰을 검색하는 동안 오류가 발생했습니다:", error);
      return "";
    }
  };

  

  return (
    <Container>
      <TouchableOpacity
        onPress={async () => {
          const data = await getToken();
          console.log(data);
        }}
      >
        <Text> 토큰 </Text>
      </TouchableOpacity>
    </Container>
  );
}
