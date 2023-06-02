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
import notifee, { TimestampTrigger, TriggerType } from "@notifee/react-native";
// import alarm from "../../sounds/alarm";
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
    const hourStr = time[0].value; // 시간을 문자열로 가져옴
    const isAM = time[2].value === "AM"; // AM 여부를 판단
  
    let hour = parseInt(hourStr); // 시간을 정수로 변환하여 저장
  
    // AM일 경우
    if (isAM) {
      if (hour === 12) {
        // 12AM일 경우 0으로 변경
        hour = 0;
      } else if (hour < 10) {
        // 10보다 작은 경우 앞에 0을 제거
        hour = parseInt(hourStr.replace("0", ""));
      }
    } else {
      // PM일 경우
      if (hour < 12) {
        // 12보다 작은 경우 12를 더해줌
        hour += 12;
      }
    }
  
    setHour(hour);
    setMin(time[1].value);
    setNoon(time[2].value);
    console.log("AddNext: " + hour);
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
    sendScheduledNotification(); // partyId가 변경될 때마다 예약 메시지 보내기
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

  //notifee

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
        } else {
          console.log("파티 ID가 유효하지 않습니다.");
        }
      })
      .catch((error) => {
        console.log("에러 발생: ", error);
      });
    navigation.navigate("HomeFeedStack", { screen: "Home" });
  };
  
  // 예약된 알림 보내기
  const sendScheduledNotification = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    const date = new Date(Date.now());
    date.setHours(hour);
    date.setMinutes(min);


    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), // 5 seconds from now
    };
    console.log(trigger);

    // useEffect(() => {
    //   (async () => {
    //     await notifee.setNotificationCategories([
    //       {
    //         id: "new-episode",
    //         actions: [
    //           { id: "default", title: "Watch Now", foreground: true },
    //           { id: "bookmark", title: "Save For Later" },
    //         ],
    //       },
    //     ]);
    //   })();
  
    //   return notifee.onForegroundEvent(async ({ type, detail }) => {
    //     if (
    //       type === EventType.ACTION_PRESS &&
    //       detail.pressAction?.id === "bookmark"
    //     ) {
    //       console.log("onForeground");
    //     } else if (
    //       detail.pressAction?.id === "dismiss" &&
    //       detail.notification?.id
    //     ) {
    //       await notifee.cancelNotification(detail.notification.id);
    //     }
    //   });
    // }, []);

    await notifee.createTriggerNotification(
      {
        id: 'message',
        title: "name",
        body: "introduce",
        ios: {
          categoryId: "new-episode",
          //sound: "alarm.wav",
          attachments: [], // Add any attachments here
          
        },
        android: {
          channelId: "default", // Android channel ID
          smallIcon: "ic_stat_name", // Optional: Specify the small icon
          pressAction: {
            id: "default",
          },
        },
      },
      trigger
    );

    
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

