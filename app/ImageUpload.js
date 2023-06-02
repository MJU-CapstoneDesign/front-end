import React, { useState } from "react";
import styled from "styled-components/native";
import { launchImageLibrary } from "react-native-image-picker";
import { Platform } from "react-native";
//import firebase from '@react-native-firebase/app';
import storage from "@react-native-firebase/storage";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ImageButton = styled.Button`
  width: 100px;
  height: 100px;
  background-color: #000;
`;

const Image = styled.Image`
  width: 100px;
  height: 100px;
`;

export default function ImageUpload() {
  const [response, setResponse] = useState(null);
  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === "android",
      },
      (res) => {
        console.log(res);
        if (res.didCancel) return;
        setResponse(res);
      }
    );
  };

  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState("");
  const imageUpload = async () => {
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
    <Container>
      <ImageButton title="show image" onPress={onSelectImage} />
      <Image source={{ uri: response?.assets[0]?.uri }} />
      <ImageButton title="upload upload to firestore" onPress={imageUpload} />
      {loading
        ? //<Image source={{uri: imageUri}} />
          console.log("firestore: ", imageUri)
        : console.log("not loading")}
    </Container>
  );
}
