import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const onGoogleButtonPress = async () => {
  await GoogleSignin.hasPlayServices();
  const { idToken } = await GoogleSignin.signIn();
  console.log(idToken);
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);
};

const MainText = styled.Text``;

const googleSigninConfigure = () => {
  GoogleSignin.configure({
    webClientId: "web-client-id",
    iosClientId: "ios-client-id",
    offlineAccess: true,
    forceCodeForRefreshToken: true,
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
