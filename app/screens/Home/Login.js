import React, { useEffect } from "react";
import styled from "styled-components/native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import {Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginApi } from "../../api";

const Container = styled.View`
  flex: 1;
  background-color: 'rgba(242, 220, 220, 1)';
  align-items: center;
  justify-content: center;
`;



// 저장된 JWT 토큰을 검색합니다.
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

const onGoogleButtonPress = async () => {
  await GoogleSignin.hasPlayServices();
  const { serverAuthCode } = await GoogleSignin.signIn();
  console.log(serverAuthCode);

  await loginApi.google_login(serverAuthCode).then(async (tokens) => {
    try {
      console.log(">> tokens {}", tokens);
      await AsyncStorage.setItem("jwts", JSON.stringify(tokens));
      console.log("JWT 토큰이 저장되었습니다.");
    } catch (error) {
      console.log("JWT 토큰을 저장하는 동안 오류가 발생했습니다:", error);
    }
  });
};

const googleSigninConfigure = () => {
  GoogleSignin.configure({
    webClientId:
      "847692404644-hms7b07e79r46p93pvta3q5jh5ru7d8o.apps.googleusercontent.com",
    iosClientId:
      "847692404644-r5vm3f0m515r5f84h8au9tm804544due.apps.googleusercontent.com",
    offlineAccess: true,
    scopes: ["profile"],
  });
};

export default function LogIn() {
  useEffect(() => {
    googleSigninConfigure();
  }, []);

  return (
      <ImageBackground source={require('../../images/Login/Body.png')} style={styles.background}>
        <View style={styles.buttonCover}>
          <View style={{height: 250}}></View>
          <GoogleSigninButton onPress={() => onGoogleButtonPress()}/>
        </View>
      </ImageBackground>

  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // 배경 이미지를 화면에 꽉 채우도록 설정합니다
    justifyContent: 'center',
    alignItems: 'center',

  },
  buttonCover: {
    flex: 2,
    justifyContent: 'center',
    paddingTop: '33.33%', // 버튼 위쪽 여백
    paddingBottom: '33.33%', // 버튼 아래쪽 여백
  }
});
