import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Entypo, Ionicons, Feather } from "@expo/vector-icons";
import styled from "styled-components";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useContext, useEffect, useCallback } from "react";
import Timer from "../../components/Timer";
import Frequency from "../../components/Frequency";
import HomeBottomTabs from "../../navigation/HomeBottomTabs";
import { TokenContext } from "./TokenContext";
import { URL } from "../../api";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';


const { width: SCREEN_WIDTH } = Dimensions.get("window");

const TopTap = styled.View`
  height: 30px;
  margin-bottom: 20px;
  flex-direction: row;
  margin-left: -5;
  //background-color: red;
`;

const TopTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
`;

const Row = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  //background-color: beige;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
`;

const TimerContainer = styled.View`
  margin-bottom: 40px;
`;

const CreateButton = styled.View`
  width: ${SCREEN_WIDTH * 0.9}px;
  height: 50px;
  border-radius: 10px;
  background-color: #f7e5e5;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  end: {
    position: "absolute",
    bottom: 50,
    left: 20,
  },
  back: {},
});

function AddNext({ navigation, route }) {
  //사용자 토큰
  const { token } = useContext(TokenContext);

  //Add.js에서 넘겨온 parameter
  const {
    value,
    name,
    introduce,
    num,
    dateText,
    endDateText,
    location,
    imageUri,
  } = route.params;

  // 이미지 스테이트
  const [selectedImage, setSelectedImage] = useState(null);

  //시간
  const [hour, setHour] = useState(null);
  const [min, setMin] = useState(null);
  const [noon, setNoon] = useState(null);
  const [time, setTime] = useState(null);

  //시간 설정
  const handleTimeChange = (time) => {
    setHour(time[0].value);
    setMin(time[1].value);
    setNoon(time[2].value);
    console.log("AddNext: " + time[0].value);
    console.log("AddNext: " + time[1].value);
    console.log("AddNext: " + time[2].value);
  };

  //알람 빈도
  const [frequency, setFrequency] = useState(null);

  const handleFrequencyChange = (value) => {
    setFrequency(value);
    console.log("AddNext: " + value);
  };

  //알람 시간

  //생성된 파티 아이디
  const [partyId, setPartyId] = useState(null);

  useEffect(() => {
    subscribe(); // partyId가 변경될 때마다 subscribe 함수 호출
    //sendScheduledNotification(); // partyId가 변경될 때마다 예약 메시지 보내기
  }, [partyId, subscribe]);

  //FCM topic
  const subscribe = useCallback(() => {
    if (partyId) {
      messaging()
        .subscribeToTopic(`${partyId}`) // partyId를 사용하여 FCM topic 구독
        .then(() => {
          console.log(`파티 ${partyId} 구독 성공!!`);
        })
        .catch(() => {
          console.log(`파티 ${partyId} 구독 실패!`);
        });
    }
  }, [partyId]);

  // 예약 메시지 보내기
  const scheduleNotification = (partyId, message, date) => {
    PushNotificationIOS.addNotificationRequest({
      id:"1",
      title:message,
      body:"hi",
      fireDate: new Date(Date.now()), // 예약 날짜 및 시간
    });
    console.log("ios alarm ");
  };

  const sendScheduledNotification = () => {
    const message = "알람 시간";
    const date = "2023-05-29T19:00:00"; // 예약 날짜 및 시간

    scheduleNotification(partyId, message, date);
  };

  //api 호출 함수
  const sendDataToServer = () => {
    const requestBody = {
      alarmFrequency: frequency.join(","),
      alarmTime: `${hour}:${min}:00`,
      description: introduce,
      endAt: `${endDateText}T21:12:12`,
      groupName: name,
      groupType: value,
      location: location,
      max: parseInt(num),
      partyImg: imageUri,
      startAt: `${dateText}T21:12:12`,
    };

    console.log(requestBody); // requestBody 출력

    fetch(`${URL}/party/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.partyId) {
          console.log(data.partyId);
          console.log(data.userId);
          setPartyId(data.partyId);
          // 예약 메시지 보내기
          sendScheduledNotification();
        } else {
          console.log("파티 ID가 유효하지 않습니다.");
        }
      })
      .catch((error) => {
        console.log("에러 발생: ", error);
      });
    navigation.navigate("HomeFeedStack", { screen: "Home" });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopTap>
        <TouchableOpacity
          style={styles.back}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <TopTitle>알람 설정</TopTitle>
      </TopTap>
      <Row>
        <Ionicons name="alarm-outline" size={18} color="#A43131" />
        <Title>알람 시간</Title>
      </Row>
      <TimerContainer>
        <Timer onTimeChange={handleTimeChange} />
      </TimerContainer>
      <Row>
        <Feather name="check-square" size={17} color="#A43131" />
        <Title>알람 빈도</Title>
      </Row>
      <Frequency onFrequencyChange={handleFrequencyChange} />
      <TouchableOpacity
        style={styles.end}
        onPress={() => {
          sendDataToServer();
        }}
      >
        <CreateButton>
          <ButtonText>모임 만들기</ButtonText>
        </CreateButton>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
export default AddNext;
