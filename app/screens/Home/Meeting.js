import { Text, Image, StyleSheet, View, Dimensions } from "react-native";
import styled from "styled-components/native";
import Category from "../../components/Category";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
//import Location from "react-native-vector-icons/EvilIcons";
import Location from "react-native-vector-icons/Ionicons";
import People from "react-native-vector-icons/MaterialIcons";
import { partyApi } from "../../api";
import React, { useContext, useEffect } from "react";
import { useQueryClient, useQuery } from "react-query";
import Loader from "../../components/Loader";
import {
  RefreshControl,
  ScrollView,
  FlatList,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Content = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //background-color: beige;
`;

const Board = styled.View`
  width: 55px;
  height: 55px;
  border-radius: 10;
  background-color: white;
  margin-top: 10px;
  margin-right: 20px;
`;

const ImageContainer = styled.View`
  width: 100%;
  height: 100%;
  //background-color: aqua;
  justify-content: center;
  align-items: center;
`;
const CategoryTitle = styled.Text`
  font-size: 13px;
  font-weight: bold;
  margin-top: 5px;
  margin-right: 18px;
  //text-align: center;
`;

const separator = styled.View`
  //width:15px;
`;

const GroupConatainer = styled.View`
  flex: 1;
  //background-color: beige;
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

const Absolute = styled.View`
  position: absolute;
  top: 100;
  right: 10;
`;
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
  margin-left: 30px;
  align-items: center;
  justify-content: center;
`;

const WeekText = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function ListItem({ item }) {
  return (
    <Content>
      <TouchableOpacity>
        <Board>
          <ImageContainer>
            <Image source={item.src} />
          </ImageContainer>
        </Board>
      </TouchableOpacity>
      <CategoryTitle>{item.title}</CategoryTitle>
    </Content>
  );
}

function RenderGroup({ item }) {
  return (
    <GContent>
      <GBoard>
        <ProfileContainer>
          <Image
            source={{ uri: item.partyImg }}
            style={{ width: 80, height: 70 }}
          />
        </ProfileContainer>
        <Column>
          <GroupTitle>{item.groupName}</GroupTitle>
          <Row>
            <Icon name="calendar-range-outline" size={18} />
            <DateText>{item.startAt}</DateText>
            <PBoard>
              <WeekText>{item.alarmFrequency}</WeekText>
            </PBoard>
          </Row>
          <Row>
            <Location name="location-outline" size={18} />
            <LocationText>{item.location}</LocationText>
          </Row>
          <Row>
            <People name="people-alt" size={18} />
            <NumofPerson>
              {item.ownerId}/{item.max}
            </NumofPerson>
          </Row>
        </Column>
        <Absolute>
          <TagText>{item.groupType}</TagText>
        </Absolute>
      </GBoard>
    </GContent>
  );
}

function Meeting({ navigation, token }) {
  // const { token } = route.params;
  //console.log("Meeing: " + token);

  const queryClient = useQueryClient();

  const {
    isLoading: partyInfoLoading,
    data: partyInfoData,
    isRefetching: isRefetchingPartyInfo,
  } = useQuery(["party", "partyInfo"], partyApi.partyInfo);

  const onRefresh = async () => {
    queryClient.refetchQueries(["party"]);
  };

  const loading = partyInfoLoading;
  const refreshing = isRefetchingPartyInfo;

  if (!partyInfoData) {
    console.log("No data");
  }

  return loading ? (
    <Loader />
  ) : (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <FlatList
          numColumns={5}
          data={Category}
          renderItem={ListItem}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={separator}
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
        />

        <FlatList
          horizontal={false}
          data={partyInfoData}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <RenderGroup item={item} />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </GestureHandlerRootView>
  );
}
export default Meeting;
