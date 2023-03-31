import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { iosClient, webClient } from "./Api";
const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const onGoogleButtonPress = async () => {
  await GoogleSignin.hasPlayServices();
  const { serverAuthCode } = await GoogleSignin.signIn();

  if (typeof str == "undefined" || str == null || str == "")
    console.log("authentication erro");
  else {
    await fetch("http://server-ip/auth/google/token", {
      method: "POST",
      body: serverAuthCode,
    }); //얘(토큰들)를 저장 해야 함
  }
};

const MainText = styled.Text``;

const googleSigninConfigure = () => {
  GoogleSignin.configure({
    webClientId: webClient,
    iosClientId: iosClient,
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
    </Container>
  );
}
