import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

// 저장된 JWT 토큰을 검색합니다.
let getToken = async () => {
  try {
    const value = await AsyncStorage.getItem("jwts");
    if (value !== null) {
      const data = JSON.parse(value)

      return data;
    } else {
      console.log('저장된 JWT 토큰이 없습니다.');
      return '';
    }
  } catch (error) {
    console.log('JWT 토큰을 검색하는 동안 오류가 발생했습니다:', error);
    return '';
  }
};

const onGoogleButtonPress = async () => {
  await GoogleSignin.hasPlayServices();
  const { serverAuthCode } = await GoogleSignin.signIn();
  console.log(serverAuthCode);

  await fetch("http://api-server:8080/login/GOOGLE/token?code=" + serverAuthCode, {
    method: "GET",
  }).then(data => data.json())
  .then(async (tokens) => {
    try {
      console.log(">> tokens {}", tokens)
      await AsyncStorage.setItem("jwts", JSON.stringify(tokens));
      console.log('JWT 토큰이 저장되었습니다.');
    } catch (error) {
      console.log('JWT 토큰을 저장하는 동안 오류가 발생했습니다:', error);
    }
  })
}

const MainText = styled.Text``;

const googleSigninConfigure = () => {
  GoogleSignin.configure({
    webClientId: "847692404644-hms7b07e79r46p93pvta3q5jh5ru7d8o.apps.googleusercontent.com",
    iosClientId: "847692404644-r5vm3f0m515r5f84h8au9tm804544due.apps.googleusercontent.com",
    offlineAccess: true,
    scopes: ["profile"],
  });
};

export default function LogIn() {
  useEffect(() => {
    googleSigninConfigure();
  }, []);

  return (
    <Container>
      <GoogleSigninButton onPress={() => onGoogleButtonPress()} />
      <Button onPress={async () => {
        const data = await getToken();
        console.log(data);
      }} title="getToken"/>
      <Button onPress={async () => {
        try {
        await AsyncStorage.removeItem("jwts");
        console.log("remove success")
        } catch(error) {
          console.log(error)
        }
      }} title="remove"/>
    </Container>
  );
}
