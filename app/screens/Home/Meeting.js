import { StatusBar } from "expo-status-bar";
import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import Feed from "../Feed";
import FeedTabs from "../../navigation/FeedTab";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const MainText = styled.Text``;

export default function Meeting({ navigation }) {
  return (
    <Container>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(FeedTabs);
        }}
      >
        <MainText>Meeting</MainText>
      </TouchableOpacity>
    </Container>
  );
}
