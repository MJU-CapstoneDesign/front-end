import { useState, React, useCallback, useEffect } from "react";
import styled from "styled-components/native";
import LogIn from "./LogIn"
import messaging from '@react-native-firebase/messaging'
import { Button } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const MainText = styled.Text``;

export default function App() {
  const [pushToken, setPushToken] = useState(null)
  const [isAuthorized, setIsAuthorized] = useState(false)

  const subscribe = useCallback(() => {
    messaging()
      .subscribeToTopic("1")
      .then(() => {
        console.log(` 구독 성공!!`);
      })
      .catch(() => {
        console.log(`1 구독 실패! ㅜㅜ`);
      });
  }, []);

  const unsubscribe = useCallback(() => {
    messaging()
    .unsubscribeFromTopic("1")
    .then(() => console.log('Unsubscribed from topic!'));
  }, [])

  const handlePushToken = useCallback(async () => {
    const enabled = await messaging().hasPermission()
    if (enabled) {
      const fcmToken = await messaging().getToken()
      if (fcmToken) setPushToken(fcmToken)
      console.log("pushToken: {}", pushToken)
    } else {
      const authorized = await messaging().requestPermission()
      if (authorized) setIsAuthorized(true)
    }
  }, [])

  const saveTokenToDatabase = useCallback(async (token) => {
    const { error } = await messaging().setFcmToken(token)
    if (error) throw Error(error)
  }, [])
  
  const saveDeviceToken = useCallback(async () => {
    if (isAuthorized) {
      const currentFcmToken = await messaging().getToken()
      if (currentFcmToken !== pushToken) {
        return saveTokenToDatabase(currentFcmToken)
      }

      return messaging().onTokenRefresh((token) => saveTokenToDatabase(token))
    }
  }, [pushToken, isAuthorized])

  const foregroundListener = useCallback(() => {
    messaging().onMessage(async message => {
      console.log(message)
    })
  }, [])
      
  useEffect(() => {
    console.log("useState")
    //messaging().registerDeviceForRemoteMessages()
    foregroundListener()  
  }, [])
  
  return (
    <Container>
      <Button onPress={handlePushToken} title="getToken"/>
      <Button onPress={subscribe} title="subscribe 1"/>
      <Button onPress={unsubscribe} title="unsubscribe"/>
    </Container>
  );
}
