import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
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
    webClientId:
      "847692404644-r5vm3f0m515r5f84h8au9tm804544due.apps.googleusercontent.com",
    iosClientId:
      "847692404644-hms7b07e79r46p93pvta3q5jh5ru7d8o.apps.googleusercontent.com",
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
