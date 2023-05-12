import React, { useContext, useEffect } from "react";
import { TouchableOpacity, Text, View, TextInput, Image } from "react-native";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { launchImageLibrary } from "react-native-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { URL } from "../api";
import { useState } from "react";
import { TokenContext } from "./Home/TokenContext";

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
  // 이미지 스테이트
  const [selectedImage, setSelectedImage] = useState(null);

  // 토큰 값 (useContext 사용)
  const { token } = useContext(TokenContext);
  console.log(token);

  // 이미지 선택 함수
  const openImagePicker = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response) {
        setSelectedImage(response);
      }
    });
  };

  //  selectedImage 구조확인
  // useEffect(() => {
  //   console.log(selectedImage);
  // }, [selectedImage]);

  // text 스테이트 확인
  useEffect(() => {
    console.log(text);
  }, [text]);

  // 서버로 보낼 text 변수 저장
  const [text, setText] = useState("");
  ``;
  // 서버로 보낼 이미지 변수 저장
  const [image, setImage] = useState("");

  // 서버로 보낼 때 사용하는 함수

  const sendDataToServer = () => {
    fetch(`${URL}/feed/create/withoutImg/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: text,
        partyId: 14,
      }),
    })
      .then((response) => {
        console.log("서버 응답: ", response);
      })
      .catch((error) => {
        console.log("에러 발생: ", error);
      });
    // navigation.goBack();
  };

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
              style={{ width: 30 }}
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
            <TouchableOpacity onPress={sendDataToServer}>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>올리기</Text>
            </TouchableOpacity>
          </View>
        </TopContainer>
        <WriteContainer>
          <TextInput
            placeholder="내용을 입력해주세요."
            multiline={true}
            style={{ marginTop: 15, marginLeft: 15, fontSize: 17 }}
            onChangeText={(text) => setText(text)}
          />
        </WriteContainer>
        {selectedImage !== null ? (
          <>
            <View
              style={{
                flex: 0.23,
                flexDirection: "row",
                marginBottom: 10,
              }}
            >
              <Image
                source={{ uri: selectedImage.assets[0].uri }}
                style={{ width: 100, height: 100 }}
              />
            </View>
          </>
        ) : (
          <></>
        )}
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
