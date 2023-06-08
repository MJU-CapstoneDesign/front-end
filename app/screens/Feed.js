import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import notifee, { TimestampTrigger, TriggerType } from "@notifee/react-native";
import {
  FlatList,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { URL } from "../api";
import { useContext } from "react";
import { TokenContext } from "./Home/TokenContext";
import { ActivityIndicator } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { adminToken } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { Entypo } from "@expo/vector-icons";
import notifee, { TimestampTrigger, TriggerType } from "@notifee/react-native";

// 화면 전체를 채우는 컨테이너 (사용할지 안할지 정해지지않음)
const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

// 하나의 피드를 컴포넌트화
const FeedComponentContainer = styled.View`
  flex: 1;
  background-color: white;
  width: 100%;
  /* margin-bottom: 10px; */
  margin-top: 20px;
`;

// 프로필 사진, 닉네임, 시간을 담는 뷰
const ProfileContainer = styled.View`
  flex: 1;
  flex-direction: row;
  margin-left: 10px;
`;

// 피드에 프로필 이미지를 담는 뷰
const ProfileImageView = styled.View`
  flex: 0.15;
`;

// 피드에 닉네임과 올린시간을 담는 뷰
const NickTimeView = styled.View`
  flex: 1;
  margin-top: 5px;
`;

// 사용자 닉네임을 담는 뷰
const NicknameView = styled.View`
  flex: 1;
`;

// 피드를 올린 시간을 담는 뷰
const TimeView = styled.View`
  flex: 1;
`;

// 피드의 이미지를 담는 뷰
const ImageContainer = styled.View`
  flex: 1;
  align-items: center;
`;

// 피드의 내용을 담는 뷰
const ContentContainer = styled.View`
  flex: 1;
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
`;

// 댓글 부분 컨테이너
const CommentsContainer = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: 25px;
  background-color: white;
`;

// 댓글 프로필 사진을 담는 뷰
const CommentProfileView = styled.View`
  flex: 0.1;
  margin-left: 20;
`;

// 댓글을 달 수 있는 폼을 담는 뷰
const CommentFormView = styled.View`
  flex: 1;
  margin-bottom: 15px;
  flex-direction: row;
`;

// 그룹의 백그라운드 이미지
const BackImgView = styled.View`
  flex: 1;
`;

// 인포메이션 뷰 (그룹장의 프로필과 상세정보 전체 담음.)
const InfoView = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: white;
  margin-top: -20px;
  border-top-left-radius: 20;
  border-top-right-radius: 20;
  height: 135px;
  background-color: white;
`;

// 그룹장의 프로필을 담는 뷰
const ProfileView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-right: -20px;
  margin-top: -10px;
`;

// 그룹의 이름과 인원수 시간 설명 전체 담는 뷰
const GroupInfoView = styled.View`
  flex: 2.5;
  margin-top: 10px;
`;

// 그룹의 이름을 담는 뷰
const GroupNameView = styled.View`
  flex: 1.3;
  margin-bottom: 3px;
  margin-top: 4px;
  justify-content: flex-end;
`;

// 모임장소, 현재 멤버 담는뷰
const LocationMemberContainer = styled.View`
  flex: 0.5;
`;

// 날짜담는뷰
const DateView = styled.View`
  flex: 0.7;
  margin-bottom: 5px;
  background-color: "red";
`;

// 설명글 담는 뷰
const DescriptionView = styled.View`
  flex: 2;
  margin-bottom: -7px;
  margin-right: 35px;
`;

// 참여하기 버튼 컨테이너
const JoinButtonContainer = styled.View`
  bottom: 0;
`;

// 글쓰기 버튼 컨테이너
const WriteButtonContainer = styled.View`
  position: absolute;
  bottom: 10;
  right: 10;
`;

// 댓글 피드 하나 Container
const CommentContainer = styled.View`
  margin-bottom: 10px;
  flex: 1;
  margin-right: 10px;
`;

// 댓글 시간 닉네임 담는 뷰
const CommentNickTimeView = styled.View`
  flex: 1;
  flex-direction: row;
`;

// 시간 담는뷰
const CommentTimeView = styled.View`
  flex: 1;
  align-items: flex-start;
  margin-left: 10px;
`;

// 닉네임 담는 뷰
const CommentNicknameView = styled.View`
  flex: 1;
  flex-direction: row;
  margin-left: 20px;
  justify-content: flex-start;
`;

// 댓글과 프로필 사진 담는뷰
const CommentProfileAndCommentView = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: 5px;
`;

// 댓글 담는 뷰
const CommentView = styled.View`
  flex: 1;
  align-items: flex-start;
`;

// 댓글 프로필사진 담는뷰
const CommentProfilePhoto = styled.View`
  flex: 0.1;
  align-items: flex-start;
  margin-left: 30px;
`;

// 피드 컴포넌트
function Feed({ navigation }) {
  // 예약된 알림 보내기
  const sendScheduledNotification = async (groupInfo) => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    const timeString = groupInfo.alarmTime;
    const timeParts = timeString.split(":"); // 구분자 ":"를 기준으로 문자열을 분할하여 배열로 반환
    const hour = timeParts[0]; // 배열의 첫 번째 요소는 시간
    const minute = timeParts[1]; // 배열의 두 번째 요소는 분
    console.log("시간" + hour);
    console.log("시간" + minute);
    const date = new Date(Date.now());
    date.setHours(hour);
    date.setMinutes(minute);


    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), 
    };
    console.log(trigger);
    
    await notifee.createTriggerNotification(
      {
        id: "partyId",
        title: groupInfo.groupName,
        body: "약속한 시간이에요",
        ios: {
          categoryId: "new-episode",
          sound:'ringtone.wav',
          attachments: [], // Add any attachments here
          targetContentId:'Alarm',
        },
        android: {
          channelId: "custom-sound", // Android channel ID
          //sound:"alarm",
          smallIcon: "ic_stat_name", // Optional: Specify the small icon
          actions: [
            { pressAction: { id: "dismiss" }, title: "Dismiss" },
            { pressAction: { id: "default" }, title: "See more" },
          ],
          
        },
      },
      trigger
    );

    
  };

  // 토큰 저장할 것
  const { token, partyIdContext, joinCheck, setJoinCheck } =
    useContext(TokenContext);

  // 피드 api 호출
  const [feed, setFeed] = useState(null);

  // 파티 아이디 저장
  // const feed_id = 14;
  const [feed_id, setFeed_id] = useState(null);
  useEffect(() => {
    setFeed_id(partyIdContext);
  }, [feed_id]);

  // 로딩화면 결정
  const [isLoading, setIsLoading] = useState(true);

  // 피드 api와 멤버 api 결과 합친 결과값
  const [assembleData, setAssembleData] = useState(null);

  // useEffect(() => {
  //   console.log(assembleData[0].comments);
  // }, [assembleData]);

  // 게시글 올리기 혹은 취소 눌렀을때 화면 재렌더링(로딩화면)
  const isFocused = useIsFocused();
  useEffect(() => {
    fetchFeed();
    if (commentUpdate === true && isFocused === false) {
      setCommentUpdate(false);
    }
  }, [isFocused]);

  // 피드 api 호출 함수
  const fetchFeed = async () => {
    try {
      setIsLoading(true); // isLoading 값을 true로 설정
      const response = await fetch(`${URL}/feed/find/${feed_id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setFeed(data);
    } catch (error) {
      console.log(error);
      console.log("Error in fetchFeed");
    }
  };
  // assembleData 재배열 api
  useEffect(() => {
    if (feed && feed.posts) {
      Promise.all(
        feed.posts.map((item) => {
          return fetch(`${URL}/member/info/${item.memberId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          })
            .then((response) => response.json())
            .then((member) => {
              const commentsPromise = item.comments.map((comment) => {
                return fetch(`${URL}/member/info/${comment.memberId}`, {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${adminToken}`,
                  },
                })
                  .then((response) => response.json())
                  .then((commentMember) => {
                    return {
                      ...comment,
                      name: commentMember.name,
                      profile: commentMember.profile,
                    };
                  });
              });

              return Promise.all(commentsPromise).then((comments) => {
                return {
                  ...item,
                  comments,
                  name: member.name,
                  profile: member.profile,
                };
              });
            });
        })
      )
        .then((newData) => {
          setAssembleData(newData.reverse());
        })
        .then(() => {
          setIsLoading(false);
        });
    }
  }, [feed]);

  // 최초 실행시 피드 api 호출
  useEffect(() => {
    fetchFeed(feed_id);
  }, [feed_id]);

  // 댓글 저장할 Ref
  const commentRef = useRef("");

  // 사용자 정보 저장 state
  const [user, setUser] = useState(null);

  // 댓글 작성후 재렌더링위한 함수
  const [commentCount, setCommentCount] = useState(true);

  // 현재 사용자의 기본정보 (후에 홈화면에 받아와야함)
  useEffect(() => {
    fetch(`${URL}/member/info`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 댓글 하나 컴포넌트화
  const CommentComponent = ({ content, profile, time, name }) => {
    let formattedDate;
    let amOrPm;
    let formattedHours;
    let formattedMinutes;
    let hours;
    let minutes;
    // 서버에서 받은 게시글 작성시간을 ui에 맞게변환
    const dateString = time;
    const date = new Date(Date.parse(dateString));
    const now = new Date();

    if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    ) {
      hours = date.getHours();
      minutes = date.getMinutes();
      amOrPm = hours >= 12 ? "오후" : "오전";
      formattedHours = hours % 12 || 12;
      formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      formattedDate = `${amOrPm} ${formattedHours}:${formattedMinutes}`;
    } else {
      hours = date.getHours();
      minutes = date.getMinutes();
      amOrPm = hours >= 12 ? "오후" : "오전";
      formattedHours = hours % 12 || 12;
      formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      formattedDate = `${
        date.getMonth() + 1
      }월 ${date.getDate()}일 ${amOrPm} ${formattedHours}:${formattedMinutes}`;
    }

    return (
      <CommentContainer>
        {/* <View
          style={{ backgroundColor: "#F0F0F0", height: 1, marginBottom: 5 }}
        ></View> */}
        <CommentNickTimeView>
          <CommentNicknameView>
            <Text style={{ fontSize: 11, fontWeight: "bold" }}>{name}</Text>
            <Text style={{ fontSize: 10, color: "#9B9B9B" }}>
              {"   "}
              {formattedDate}
            </Text>
          </CommentNicknameView>
        </CommentNickTimeView>
        <CommentProfileAndCommentView>
          <CommentProfilePhoto>
            <Image
              source={{ uri: profile }}
              style={{ width: 20, height: 20, borderRadius: 50 }}
            />
          </CommentProfilePhoto>
          <CommentView>
            <View
              style={{
                backgroundColor: "#EFEFEF",
                borderRadius: 10,
                borderTopLeftRadius: 0,
                paddingVertical: 5,
                paddingHorizontal: 8,
              }}
            >
              <Text style={{ fontSize: 12 }}>{content}</Text>
            </View>
          </CommentView>
        </CommentProfileAndCommentView>
      </CommentContainer>
    );
  };

  // 피드 하나를 컴포넌트화
  const FeedComponent = ({
    content,
    profile,
    time,
    image,
    name,
    postId,
    comments,
  }) => {
    let formattedDate;
    let amOrPm;
    let formattedHours;
    let formattedMinutes;
    let hours;
    let minutes;
    // 서버에서 받은 게시글 작성시간을 ui에 맞게변환
    const dateString = time;
    const date = new Date(Date.parse(dateString));
    const now = new Date();

    if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    ) {
      hours = date.getHours();
      minutes = date.getMinutes();
      amOrPm = hours >= 12 ? "오후" : "오전";
      formattedHours = hours % 12 || 12;
      formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      formattedDate = `${amOrPm} ${formattedHours}:${formattedMinutes}`;
    } else {
      hours = date.getHours();
      minutes = date.getMinutes();
      amOrPm = hours >= 12 ? "오후" : "오전";
      formattedHours = hours % 12 || 12;
      formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      formattedDate = `${
        date.getMonth() + 1
      }월 ${date.getDate()}일 ${amOrPm} ${formattedHours}:${formattedMinutes}`;
    }
  };
  // 예약된 알림 보내기
  const sendScheduledNotification = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    const date = new Date(Date.now());
    date.setHours(3);
    date.setMinutes(17);

    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
    };
    console.log(trigger);

    await notifee.createTriggerNotification(
      {
        id: "message",
        title: "name",
        body: "introduce",
        ios: {
          categoryId: "new-episode",
          sound: "ringtone.wav",
          attachments: [], // Add any attachments here
          targetContentId: "Alarm",
        },
        android: {
          channelId: "general", // Android channel ID
          smallIcon: "ic_stat_name", // Optional: Specify the small icon
          actions: [
            { pressAction: { id: "dismiss" }, title: "Dismiss" },
            { pressAction: { id: "default" }, title: "See more" },
          ],
        },
      },
      trigger
    );
    return (
      <>
        <FeedComponentContainer>
          <ProfileContainer>
            <ProfileImageView>
              <Image
                source={{ uri: profile }}
                style={{ width: 40, height: 40, borderRadius: 50 }}
              />
            </ProfileImageView>
            <NickTimeView>
              <NicknameView>
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>{name}</Text>
              </NicknameView>
              <TimeView>
                <Text style={{ fontSize: 10, color: "#9B9B9B" }}>
                  {formattedDate}
                </Text>
              </TimeView>
            </NickTimeView>
          </ProfileContainer>
          <ImageContainer>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{
                  width: "95%",
                  height: 400,
                  borderRadius: 10,
                  marginTop: 15,
                }}
              />
            ) : (
              <></>
            )}
          </ImageContainer>
          <ContentContainer>
            <Text style={{ fontSize: 13 }}>{content}</Text>
          </ContentContainer>
        </FeedComponentContainer>
        <CommentsContainer>
          <CommentProfileView>
            <Image
              source={{ uri: user.profile }}
              style={{ width: 28, height: 28, borderRadius: 50 }}
            />
          </CommentProfileView>

          <CommentFormView>
            <TextInput
              placeholder="댓글 달기"
              onChangeText={(text) => (commentRef.current = text)}
              style={{
                backgroundColor: "#EFEFEF",
                borderRadius: 8,
                paddingLeft: 10,
                marginRight: 20,
                height: 25,
                flex: 1,
              }}
              editable={isJoin}
            />
            <TouchableOpacity
              style={{ marginLeft: -50, marginRight: 30, marginTop: 5 }}
              onPress={async () => {
                const comment = commentRef.current;
                if (comment !== "") {
                  setCommentUpdate(true);
                  await commentUpload(comment, postId);
                  fetchFeed(feed_id);
                }
              }}
            >
              <FontAwesome name="send" size={15} color="green" />
            </TouchableOpacity>
          </CommentFormView>
        </CommentsContainer>
        {comments.map((item) => (
          <CommentComponent
            content={item.content}
            profile={item.profile}
            time={item.createdAt}
            name={item.name}
          />
        ))}

        <View style={{ backgroundColor: "#F0F0F0", height: 2 }}></View>
      </>
    );
  };

  // 그룹 기본정보 api (후에 홈화면에서 받아올 정보)
  // const GroupInfoApi = {
  //   groupCapProfile:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBzJTaqg2nmYXRpi_Kmmd256-OqiOB0oZfKA&usqp=CAU",
  //   groupBackImg:
  //     "https://eventusstorage.blob.core.windows.net/evs/Image/fastfive/17836/ProjectInfo/Cover/bdb851079dd14c57a63304758e7d7e9b.jpg",
  //   groupName: "코딩 공부",
  //   groupLocation: "영통동",
  //   groupDays: "월,수,금",
  //   groupAlarmTime: "07:00",
  //   groupMemberNum: 4,
  //   groupDate: "3/16 (목) ~ 5주",
  //   groupDescription:
  //     "월, 수, 금 주 3일 한시간이라도 좋으니 함께 코딩 공부해요!초보자도 실력자도 모두 환영입니다. :)",
  // };

  // 그룹 기본정보에서 날짜 지정하는 함수
  const PartyComponent = ({ startAt, endAt }) => {
    // startAt과 endAt 값을 moment 객체로 변환합니다.
    const startDate = moment(startAt);
    const endDate = moment(endAt);

    // 'M월 D일' 형식으로 날짜를 포맷합니다.
    const formattedStartDate = startDate.format("M월 D일");
    const formattedEndDate = endDate.format("M월 D일");

    // 결과 문자열을 생성합니다.
    const dateString = `${formattedStartDate} ~ ${formattedEndDate}`;

    return dateString;
  };

  // 그룹 기본정보 api 호출
  const [groupInfo, setGroupInfo] = useState(null);
  const [groupMemNum, setGroupMemNum] = useState(null);
  const [groupDate, setGroupDate] = useState(null);

  useEffect(() => {
    fetch(`${URL}/party/info/${partyIdContext}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setGroupInfo(res);
        //setGroupMemNum(groupInfo?.members.length);
        setGroupMemNum(groupInfo?.members.length);
        //console.log("Feed" + groupInfo?.members.length);
        const dateString = PartyComponent({
          startAt: res.startAt,
          endAt: res.endAt,
        });
        setGroupDate(dateString);
      });
  }, [partyIdContext, groupMemNum, groupDate]);

  // 사용자 화면 크기에 맞게 화면 비율 세팅
  const { width } = Dimensions.get("window");

  // 그룹에 참여해있는지 여부
  const [isJoin, setIsJoin] = useState(false);

  // 참여했는지 여부 확인후 참여하기 버튼 노출결정
  useEffect(() => {
    AsyncStorage.getItem(`partyId${partyIdContext}`).then((res) => {
      if (res === "join") {
        setIsJoin(true);
      }
    });
  }, []);

  // 참여하기 눌렀을때 함수
  const JoinButton = () => {
    setIsJoin(!isJoin);
    AsyncStorage.setItem(`partyId${partyIdContext}`, "join");
    fetch(`${URL}/party/add/${partyIdContext}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 댓글 재렌더링 처리부분
  // 댓글 업데이트 확인하는 state
  const [commentUpdate, setCommentUpdate] = useState(false);

  // 댓글 올리기 함수호출 api
  const commentUpload = (comment, postId) => {
    fetch(`${URL}/comment/add/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: comment,
        postId: postId,
        parentComment: 0,
      }),
    })
      .then((res) => res.json())

      .catch((err) => {
        console.log(err);
      });

    commentRef.current = "";
  };

  const WriteButton = () => {
    navigation.navigate("FeedWrite");
  };

  // api가 로딩중일 때
  if (isLoading && !commentUpdate) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );

    // 최초 화면 시작시 api 연동끝났을때
  } else if (
    (!isLoading && groupInfo && groupMemNum) ||
    (isLoading && commentUpdate)
  ) {
    return (
      <>
        <ScrollView
          stickyHeaderIndices={[1]}
          style={{ backgroundColor: "white" }}
        >
          <BackImgView>
            <Image
              source={{ uri: groupInfo.partyImg }}
              style={{ width: 400, height: 155 }}
            />
          </BackImgView>

          <View>
            <InfoView>
              <ProfileView>
                <Image
                  source={{ uri: groupInfo.members[0].profile }}
                  style={{ width: 50, height: 50, borderRadius: 50 }}
                />
              </ProfileView>
              <GroupInfoView>
                <GroupNameView>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {groupInfo.groupName}
                  </Text>
                </GroupNameView>
                <LocationMemberContainer>
                  <Text style={{ fontSize: 11 }}>
                    <Entypo name="location" size={11} color="black" />{" "}
                    {groupInfo.location} ∙ 멤버 {groupMemNum}
                  </Text>
                </LocationMemberContainer>
                <DateView>
                  <Text style={{ fontSize: 11 }}>
                    <MaterialCommunityIcons
                      name="calendar-range-outline"
                      size={11}
                      color="black"
                    />{" "}
                    {groupDate}[{groupInfo.alarmFrequency}]{"  "}
                    <Ionicons
                      name="ios-alarm-outline"
                      size={12}
                      color="black"
                    />{" "}
                    {groupInfo.alarmTime.slice(0, 5)}
                  </Text>
                </DateView>
                <DescriptionView>
                  <Text style={{ fontSize: 11 }}>
                    📌 {groupInfo.description}
                  </Text>
                </DescriptionView>
              </GroupInfoView>
            </InfoView>
            <View style={{ backgroundColor: "#F0F0F0", height: 2 }}></View>
          </View>
          <View style={{ backgroundColor: "#F0F0F0", height: 3 }}></View>
          <View>
            <FlatList
              data={assembleData}
              renderItem={({ item }) => (
                <FeedComponent
                  content={item.content}
                  profile={item.profile}
                  time={item.time}
                  image={item.img}
                  name={item.name}
                  time={item.createdAt}
                  comments={item.comments}
                  postId={item.postId}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </ScrollView>
        {!isJoin ? (
          <JoinButtonContainer>
            <TouchableOpacity
              style={{
                width: width,
                height: 55,
                backgroundColor: "#F7E5E5",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}

              onPress={() =>{
                JoinButton();
                sendScheduledNotification(groupInfo);

              }}
            >
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>참여하기</Text>
            </TouchableOpacity>
          </JoinButtonContainer>
        ) : (
          <WriteButtonContainer>
            <TouchableOpacity
              style={{
                backgroundColor: "#DFA5A5",
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 50,
              }}
              onPress={WriteButton}
            >
              <MaterialCommunityIcons
                name="pencil-outline"
                size={27}
                color="black"
              />
            </TouchableOpacity>
          </WriteButtonContainer>
        )}
      </>
    );
  }
}

export default Feed;
