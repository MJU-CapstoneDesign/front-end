import React, { useEffect } from "react";
import { TouchableOpacity, Text, View, TextInput, Image } from "react-native";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { launchImageLibrary } from "react-native-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

import { useState } from "react";

// 전체 컨테이너
const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

// 상단 뒤로가기 버튼/ 완료 버튼 컨테이너
const TopContainer = styled.View`
  flex: 0.08;
  flex-direction: row;
  justify-content: space-between;
`;

// 글 작성 컨테이너
const WriteContainer = styled.View`
  flex: 1.4;
  border-top-width: 1;
  border-bottom-width: 1;
  border-color: #d9d9d9;
`;

// 이미지 첨부 컨테이너
const ImageContainer = styled.View`
  flex: 0.1;
  margin-top: 10;
`;

function FeedWrite({ navigation }) {
  // 뒤로가기 버튼
  const goBack = () => {
    navigation.goBack();
  };

  // 이미지 스테이트
  // const [imageUri, setImageUri] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // 이미지 선택 함수
  const openImagePicker = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response) {
        setSelectedImage(response);
      }
    });
  };
  // useEffect(() => {
  //   console.log(selectedImage.assets[0].uri);
  // }, [selectedImage]);

  return (
    <>
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 0.01, backgroundColor: "white" }}
      />
      <Container>
        <TopContainer>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <AntDesign name="left" size={25} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              marginRight: 10,
              marginTop: 2,
            }}
          >
            <TouchableOpacity>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>올리기</Text>
            </TouchableOpacity>
          </View>
        </TopContainer>
        <WriteContainer>
          <TextInput
            placeholder="내용을 입력해주세요."
            multiline={true}
            style={{ marginTop: 15, marginLeft: 15, fontSize: 17 }}
          />
        </WriteContainer>
        {selectedImage !== undefined ? (
          <>
            <View style={{ flex: 0.23, flexDirection: "row" }}>
              <Image
                source={{ uri: selectedImage.assets[0].uri }}
                style={{ width: 100, height: 100 }}
              />
            </View>
          </>
        ) : (
          <></>
        )}
        {/* <View style={{ flex: 0.3, marginBottom: 5 }}>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage.assets[0].uri }}
              style={{ width: 100, height: 100 }}
            />
          )} */}
        {/* </View> */}
        <ImageContainer>
          <TouchableOpacity onPress={openImagePicker}>
            <MaterialIcons
              name="add-photo-alternate"
              size={24}
              color="black"
              style={{ marginLeft: 14, marginBottom: 20 }}
            />
          </TouchableOpacity>
        </ImageContainer>
      </Container>
    </>
  );
}

export default FeedWrite;
