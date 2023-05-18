import React, { useEffect } from "react";
import styled from "styled-components/native";
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

// 피드 컴포넌트
function Feed({ navigation }) {
  // 토큰 저장할 것
  const { token } = useContext(TokenContext);

  // 피드 api 호출
  const [feed, setFeed] = useState(null);

  // 파티 아이디 저장
  // const feed_id = 14;
  const [feed_id, setFeed_id] = useState(null);
  useEffect(() => {
    setFeed_id(14);
  }, []);

  // 추후에 홈화면에서 받아오는것으로 결정.

  // 로딩화면 결정
  const [isLoading, setIsLoading] = useState(true);

  // 피드 api와 멤버 api 결과 합친 결과값
  const [assembleData, setAssembleData] = useState(null);

  // 게시글 올리기 혹은 취소 눌렀을때 화면 재렌더링
  const isFocused = useIsFocused();
  useEffect(() => {
    fetchFeed();
  }, [isFocused]);

  // 피드 api 호출 (member api 호출해서 둘의 배열 합침)

  const fetchFeed = async () => {
    setIsLoading(true); // isLoading 값을 true로 설정
    try {
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

  useEffect(() => {
    if (feed && feed.posts)
      Promise.all(
        feed.posts.map((item) => {
          return fetch(`${URL}/member/info/${item.memberId}`, {
            method: "GET",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiaWF0IjoxNjgzNTU0NDUyLCJleHAiOjE2ODUwMjU2ODF9.Qyt8ThbUPhOONmgln-0uZnZZsrLJyTeAt-ICXQ_7rQ8",
            },
          })
            .then((response) => response.json())
            .then((member) => {
              return {
                ...item,
                name: member.name,
                profile: member.profile,
              };
            });
        })
      )
        .then((newData) => {
          setAssembleData(newData.reverse());
        })
        .then(() => {
          setIsLoading(false);
        });
  }, [feed]);

  useEffect(() => {
    fetchFeed(feed_id);
  }, [feed_id]);

  // 유저 닉네임
  const [nickname, setNickname] = useState(null);

  // 유저 프로필
  const [profile, setProfile] = useState(null);

  // 사용자 정보(닉네임, 프로필사진등)받아오는 api
  const [userInfo, setUserInfo] = useState(null);

  // 현재 사용자의 기본정보 (후에 홈화면에 받아와야함)
  const user = {
    name: "풀스택 유니콘",
    profile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI2mnR4-xwTqF_l0XNYbVe3NyHn24R0REgpQ&usqp=CAUg",
  };

  // 피드 하나를 컴포넌트화
  const FeedComponent = ({ content, profile, time, image, name }) => {
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
                  height: 300,
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
              style={{
                backgroundColor: "#EFEFEF",
                borderRadius: 8,
                paddingLeft: 10,
                marginRight: 20,
                height: 25,
              }}
            />
          </CommentFormView>
        </CommentsContainer>
        <View style={{ backgroundColor: "#F0F0F0", height: 2 }}></View>
      </>
    );
  };

  // 그룹 기본정보 api (후에 홈화면에서 받아올 정보)
  const GroupInfoApi = {
    groupCapProfile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBzJTaqg2nmYXRpi_Kmmd256-OqiOB0oZfKA&usqp=CAU",
    groupBackImg:
      "https://eventusstorage.blob.core.windows.net/evs/Image/fastfive/17836/ProjectInfo/Cover/bdb851079dd14c57a63304758e7d7e9b.jpg",
    groupName: "코딩 공부",
    groupLocation: "영통동",
    groupDays: "월,수,금",
    groupAlarmTime: "07:00",
    groupMemberNum: 4,
    groupDate: "3/16 (목) ~ 5주",
    groupDescription:
      "월, 수, 금 주 3일 한시간이라도 좋으니 함께 코딩 공부해요!초보자도 실력자도 모두 환영입니다. :)",
  };

  // 사용자 화면 크기에 맞게 화면 비율 세팅
  const { width } = Dimensions.get("window");

  // 그룹에 참여해있는지 여부
  const [isJoin, setIsJoin] = useState(false);

  const JoinButton = () => {
    setIsJoin(!isJoin);
  };

  // 참여하기 버튼 클릭 시 함수
  const WriteButton = () => {
    navigation.navigate("FeedWrite");
  };

  // api가 로딩중일 때
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      <ScrollView
        stickyHeaderIndices={[1]}
        style={{ backgroundColor: "white" }}
      >
        <BackImgView>
          <Image
            source={{ uri: GroupInfoApi.groupBackImg }}
            style={{ width: 400, height: 155 }}
          />
        </BackImgView>

        <View>
          <InfoView>
            <ProfileView>
              <Image
                source={{ uri: GroupInfoApi.groupCapProfile }}
                style={{ width: 45, height: 45, borderRadius: 50 }}
              />
            </ProfileView>
            <GroupInfoView>
              <GroupNameView>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {GroupInfoApi.groupName}
                </Text>
              </GroupNameView>
              <LocationMemberContainer>
                <Text style={{ fontSize: 11 }}>
                  {GroupInfoApi.groupLocation} ∙ 멤버{" "}
                  {GroupInfoApi.groupMemberNum}
                </Text>
              </LocationMemberContainer>
              <DateView>
                <Text style={{ fontSize: 11 }}>
                  <MaterialCommunityIcons
                    name="calendar-range-outline"
                    size={11}
                    color="black"
                  />{" "}
                  {GroupInfoApi.groupDate}[{GroupInfoApi.groupDays}]{"  "}
                  <Ionicons name="ios-alarm-outline" size={12} color="black" />
                  {GroupInfoApi.groupAlarmTime}
                </Text>
              </DateView>
              <DescriptionView>
                <Text style={{ fontSize: 11 }}>
                  📌 {GroupInfoApi.groupDescription}
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
            onPress={JoinButton}
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

export default Feed;
