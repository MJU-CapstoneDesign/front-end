import { Text, Image, StyleSheet, View, Dimensions } from "react-native";
import styled from "styled-components/native";
import { partyApi } from "../../api";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Location from "react-native-vector-icons/Ionicons";
import People from "react-native-vector-icons/MaterialIcons";
import React, { useContext, useEffect, useState } from "react";
import { useQueryClient, useQuery } from "react-query";
import Loader from "../../components/Loader";
import { TokenContext } from "./TokenContext";
import {
  RefreshControl,
  ScrollView,
  FlatList,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import moment from "moment";
import 'moment/locale/ko';

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const GContent = styled.View`
  flex-direction: column;
  margin-top: 20px;
  //background-color: beige;
  align-items: center;
`;

const GBoard = styled.View`
  width: ${SCREEN_WIDTH * 0.9}px;
  height: 110px;
  flex-direction: row;
  border-radius: 10;
  background-color: white;
  //align-items:center;
  //margin-left:10px;
`;

const ProfileContainer = styled.View`
  width: 110px;
  height: 100%;
  //background-color: beige;
  align-items: center;
  justify-content: center;
`;

const Column = styled.View`
  flex-direction: column;
  margin-top: 3px;
  //background-color:beige;
`;

const Row = styled.View`
  flex-direction: row;
  margin-top: 5px;
`;

const GroupTitle = styled.Text`
  font-size: 17px;
  font-weight: bold;
  margin-top: 8px;
`;

const DateText = styled.Text`
  font-size: 12px;
  margin-left: 5px;
  margin-top: 1px;
  color: #4d4d4d;
`;

const LocationText = styled(DateText)`
  margin-top: 3px;
`;

const NumofPerson = styled(DateText)``;

const MainText = styled.Text``;

const TagText = styled.Text`
  font-size: 15px;
  margin-left: 170px;
  margin-top: -30px;
  color: #a43131;
  font-weight: bold;
`;

const PBoard = styled.View`
  width: 60px;
  height: 20px;
  border-radius: 10px;
  background-color: #f1d7d7;
  margin-left: 25px;
  align-items: center;
  justify-content: center;
`;

const WeekText = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

const Absolute = styled.View`
  position: absolute;
  top: 100;
  right: 10;
`;

const MyContainer = styled.View`
  align-items: center;
  margin-top: 30px;
`;
const Content = styled.View`
  width: ${SCREEN_WIDTH * 0.9}px;
  height: 170px;
  background-color: white;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const NoticeText = styled.Text`
  color: #a43131;
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
`;

export default function MyMeeting({ navigation }) {
  const { token } = useContext(TokenContext);
  console.log(token);
  const queryClient = useQueryClient();

  const {
    isLoading: partyMyInfoLoading,
    data: partyMyInfoData,
    isRefetching: isRefetchingPartyMyInfo,
  } = useQuery(["party", "partyMyInfo"], () => partyApi.partyMyInfo(token), {
    enabled: Boolean(token),
  });

  const onRefresh = async () => {
    queryClient.refetchQueries(["party"]);
  };

  const loading = partyMyInfoLoading;
  const refreshing = isRefetchingPartyMyInfo;

  if (!partyMyInfoData) {
    console.log("No data");
  }

  function RenderGroup({ item }) {
    //주 횟수 필터링
    str = item.alarmFrequency;
    const filteredStr = str.split("").filter((char) => {
      return char >= "가" && char <= "힣";
    });
    const count = filteredStr.length;

    //시작일, 종료일 필터링
    const formattedDate = moment(item.startAt).format("MM/DD(dd)");
    const formattedEndDate = moment(item.endDate).format("MM/DD(dd)");

    return (
      <GContent>
        <GBoard>
          <ProfileContainer>
            <Image
              source={{ uri: item.partyImg }}
              style={{ width: 80, height: 70, borderRadius: 10 }}
            />
          </ProfileContainer>
          <Column>
            <GroupTitle>{item.groupName}</GroupTitle>
            <Row>
              <Icon name="calendar-range-outline" size={18} />
              <DateText>{formattedDate} ~ {formattedEndDate}</DateText>
              <PBoard>
                <WeekText>주 {count}일</WeekText>
              </PBoard>
            </Row>
            <Row>
              <Location name="location-outline" size={18} />
              <LocationText>{item.location}</LocationText>
            </Row>
            <Row>
              <People name="people-alt" size={18} />
              <NumofPerson>
                {item.members.length}/{item.max}
              </NumofPerson>
            </Row>
          </Column>
          <Absolute>
            <TagText>#{item.groupType}</TagText>
          </Absolute>
        </GBoard>
      </GContent>
    );
  }

  return loading ? (
    <Loader />
  ) : (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {!partyMyInfoData || partyMyInfoData.length === 0 ? (
        <MyContainer>
          <Content>
            <Feather name="frown" size={30} color="#A43131" />
            <NoticeText>현재 참여하고 있는 모임이 없어요!</NoticeText>
          </Content>
        </MyContainer>
      ) : (
        <Container>
          <FlatList
            horizontal={false}
            data={partyMyInfoData}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <RenderGroup item={item} />
              </TouchableOpacity>
            )}
          />
        </Container>
      )}
    </GestureHandlerRootView>
  );
}
