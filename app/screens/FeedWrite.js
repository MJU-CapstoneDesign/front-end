import React, { useContext, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Image,
  Platform,
} from "react-native";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { launchImageLibrary } from "react-native-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { URL } from "../api";
import { useState } from "react";
import { TokenContext } from "./Home/TokenContext";
import storage from "@react-native-firebase/storage";

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

  // 이미지 선택 함수
  const openImagePicker = () => {
    launchImageLibrary(
      { mediaType: "photo", includeBase64: Platform.OS === "android" },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response) {
          setResponse(response);
          setSelectedImage(response);
        }
      }
    );
  };

  useEffect(() => {
    imageConvert();
  }, [selectedImage]);

  useEffect(() => {
    console.log(selectedImage);
  }, [selectedImage]);

  // 서버로 보낼 text 변수 저장
  const [text, setText] = useState(null);

  // 서버로 보낼 때 사용하는 함수

  const sendDataToServer = () => {
    if (text !== null) {
      fetch(`${URL}/feed/create/withoutImg/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: text,
          partyId: 14,
          img: imageUri,
        }),
      })
        .then((response) => {
          console.log("서버 응답: ", response);
        })
        .catch((error) => {
          console.log("에러 발생: ", error);
        });
    }
    navigation.goBack();
  };

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState("");

  const imageConvert = async () => {
    setLoading(true);
    let imageUrl = null;
    if (response) {
      const asset = response.assets[0];
      const reference = storage().ref(`/profile/${asset.fileName}`); // 업로드할 경로 지정
      if (Platform.OS === "android") {
        // 안드로이드
        // 파일 업로드
        await reference.putString(asset.base64, "base64", {
          contentType: asset.type,
        });
      } else {
        // iOS
        // 파일 업로드
        await reference.putFile(asset.uri);
      }
      imageUrl = response ? await reference.getDownloadURL() : null;
    }
    setImageUri(imageUrl);
    console.log("imageUrl", imageUrl);

    // imageUrl 사용 로직 ...
  };

  return (
    <>
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 0.01, backgroundColor: "white" }}
      />
      <Container>
        {loading
          ? console.log("fireStore", imageUri)
          : console.log("not loading")}
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
            <TouchableOpacity
              onPress={
                (selectedImage !== null && text !== "" && text !== null) ||
                (text !== "" && text !== null)
                  ? sendDataToServer
                  : null
              }
              disabled={
                (selectedImage !== null &&
                  text !== null &&
                  imageUri === null) ||
                (selectedImage === null && text === null)
              }
            >
              <Text
                style={[
                  {
                    fontSize: 17,
                    fontWeight: "bold",
                    color:
                      (selectedImage !== null &&
                        text !== "" &&
                        text !== null) ||
                      (text !== "" && text !== null)
                        ? "black"
                        : "grey",
                  },
                ]}
              >
                올리기
              </Text>
            </TouchableOpacity>
          </View>
        </TopContainer>
        <WriteContainer>
          <TextInput
            placeholder="이미지를 올릴때는 올리기 버튼이 활성화될때까지 잠시만 기다려주세요."
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
                source={{ uri: selectedImage?.assets[0]?.uri }}
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
