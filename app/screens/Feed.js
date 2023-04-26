import { StatusBar } from "expo-status-bar";
import React from "react";
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
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

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

// 그룹의 백그라운드이미지와 상세정보 컨테이너 (사용할지 안할지 정해지지않음)
const DetailContainer = styled.View`
  flex: 1;
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
  // 현재 사용자의 기본정보
  const user = {
    name: "풀스택 유니콘",
    profile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI2mnR4-xwTqF_l0XNYbVe3NyHn24R0REgpQ&usqp=CAUg",
  };
  // 피드 하나를 컴포넌트화
  const FeedComponent = ({ content, profile, time, image, name }) => {
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
                <Text style={{ fontSize: 10, color: "#9B9B9B" }}>{time}</Text>
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

  // 피드 데이터 api
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "첫번째 게시글",
      content: "오늘도 힘내서 코딩하세요~!~!",
      backColor: "red",
      time: "10분전",
      name: "코딩천재",
      profile:
        "https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2020/03/27/5561b209-4809-4c6e-9f8b-33d0e7792de8.jpg",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "두번째 게시글",
      content: "#오코완! 모두 오늘 하루도 고생하셨습니다😊",
      backColor: "blue",
      time: "1시간전",
      name: "나무늘보",
      profile: "https://d2v80xjmx68n4w.cloudfront.net/gigs/JaqkS1637331647.jpg",
      image:
        "https://fernando.kr/static/af1e2ab43e2bf121d17011feb1888657/c1b63/contributions.png",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "세번째 게시글",
      content: "챗지피티 덕분에 야근 피했습니다..!!!",
      backColor: "green",
      time: "1일전",
      name: "챗지피티짱",
      profile:
        "https://ondostudio.co.kr/wp-content/uploads/2019/12/2-5-683x1024.jpg",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb2800",
      title: "첫번째 게시글",
      content:
        "코딩 할때 박효신님 노래 들으니까 마음이 편해지네요ㅎㅎ 에러도 무섭지 않다!😎",
      backColor: "red",
      time: "2일전",
      name: "박효신하트",
      profile:
        "http://gangnamstar.co.kr/files/attach/images/119/904/027/99b6e593de5df80fd08141a0db2c2166.jpg",
      image:
        "https://wimg.mk.co.kr/meet/neds/2019/06/image_readtop_2019_472045_15618899413807825.jpg",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb2822",
      title: "첫번째 게시글",
      content: "아 1px만 옮겨달라구요..?ㅎㅎ",
      backColor: "red",
      time: "2일전",
      name: "야근그만좀",
      profile:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/%EC%98%81%ED%99%94%EB%B0%B0%EC%9A%B0_%EB%B0%95%EA%B7%BC%EB%A1%9D_%ED%94%84%EB%A1%9C%ED%95%84_%EC%82%AC%EC%A7%841.jpg/1365px-%EC%98%81%ED%99%94%EB%B0%B0%EC%9A%B0_%EB%B0%95%EA%B7%BC%EB%A1%9D_%ED%94%84%EB%A1%9C%ED%95%84_%EC%82%AC%EC%A7%841.jpg",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb2811",
      title: "첫번째 게시글",
      content: "코딩 끝내고 먹는 치맥이 최고죠😋",
      backColor: "red",
      time: "3일전",
      name: "수원왕갈비통닭",
      profile:
        "https://thumbnews.nateimg.co.kr/view610///news.nateimg.co.kr/orgImg/sw/2021/05/20/20210520514012.jpg",
      image:
        "https://mblogthumb-phinf.pstatic.net/MjAyMDEwMTZfODEg/MDAxNjAyODU0MTgxODA4.ETOK5TakyOl4gqagooA9KGg6Cf8RgJYCXaCkLTPMdlsg.NI9Q5bYtNror7q7NHKN27M2cq1zIevPD4UkxzgW2k2sg.JPEG.hoyhoy901/1602854181339.jpg?type=w800",
    },
  ];

  // 그룹 기본정보 api
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

  // 글쓰기 버튼 클릭 시 함수

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
                  <View style={{ marginTop: 20 }}>
                    <MaterialIcons name="alarm" size={12} color="black" />
                  </View>
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
            data={DATA}
            renderItem={({ item }) => (
              <FeedComponent
                content={item.content}
                profile={item.profile}
                time={item.time}
                image={item.image}
                name={item.name}
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