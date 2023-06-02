import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Button,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Class from "react-native-vector-icons/MaterialIcons";
import Name from "react-native-vector-icons/MaterialCommunityIcons";
import People from "react-native-vector-icons/MaterialIcons";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Feather, Ionicons, FontAwesome } from "react-native-vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { Dropdown } from "react-native-element-dropdown";
import { launchImageLibrary } from "react-native-image-picker";
import storage from "@react-native-firebase/storage";
import DatePicker from "react-native-date-picker";
import moment from "moment";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const TopTap = styled.View`
  height: 30px;
  margin-bottom: 20px;
  flex-direction: row;
  margin-left: -5;
  //background-color: red;
`;

const TopTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
`;

const ImageContainer = styled.View`
  width: 75px;
  height: 75px;
  border-radius: 5px;
  background-color: #f0f0f0;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  padding-top: 4px;
`;

const ImageTitle = styled.Text`
  font-size: 13px;
  margin-top: 5px;
  color: #828282;
  font-weight: bold;
`;
const Row = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  //background-color: beige;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
`;

const CalendarContainer = styled.View`
  border-radius: 5px;
  border-width: 1px;
  border-color: #d9d9d9;
  width: 94px;
  height: 26px;
  margin-left: 10px;
  align-items: center;
  justify-content: center;
`;

const CalendarText = styled.Text`
  font-size: 12px;
`;
const EndTitle = styled(Title)`
  margin-left: 10px;
`;

const Hr = styled.View`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  border-bottom-color: #d3d7dc;
  opacity: 0.3;
  border-bottom-width: 2px;
`;
const NoticeText = styled.Text`
  margin-left: 25;
  margin-bottom: 20px;
  margin-top: -5;
  font-size: 13;
  font-weight: bold;
  color: #9b9b9b;
`;

const NextButton = styled.View`
  width: ${SCREEN_WIDTH * 0.9}px;
  height: 50px;
  border-radius: 10px;
  background-color: #f7e5e5;
  justify-content: center;
  align-items: center;
`;

const NextText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  back: {},
  input: {
    width: 257,
    height: 26,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 5,
    marginLeft: 10,
    fontSize: 12,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  inputBox: {
    width: 355,
    height: 130,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    paddingTop: 20,
    padding: 20,
    fontWeight: "bold",
  },
  dropdown: {
    height: 30,
    width: 120,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginLeft: 10,
  },
  label: {
    position: "absolute",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 12,
  },
  placeholderStyle: {
    fontSize: 12,
    marginLeft: 10,
    color: "#9B9B9B",
  },
  selectedTextStyle: {
    fontSize: 12,
    paddingHorizontal: 10,
  },
  inputSearchStyle: {
    height: 30,
    fontSize: 12,
    borderRadius: 8,
  },
  itemTextStyle: {
    fontSize: 13,
  },
  end: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  button: {
    fontSize: 10,
  },
  image: {
    backgroundColor: "#f7e5e5",
  },
});

const category = [
  { num: "1", label: "스터디" },
  { num: "2", label: "독서" },
  { num: "3", label: "취미" },
  { num: "4", label: "운동/스포츠" },
  { num: "5", label: "문화/예술" },
  { num: "6", label: "생활습관" },
  { num: "7", label: "여행" },
  { num: "8", label: "반려동물" },
  { num: "9", label: "다이어트" },
  { num: "10", label: "자유주제" },
];

const numOfPerson = [
  { value: "1", label: "4" },
  { value: "2", label: "5" },
  { value: "3", label: "6" },
  { value: "4", label: "7" },
  { value: "5", label: "8" },
  { value: "6", label: "9" },
  { value: "7", label: "10" },
];

function Add({ navigation }) {
  //console.log("==================");
  //모임 종류
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  //console.log("모임 종류" + value);

  //모임 이름
  const [name, setName] = useState(null);
  //console.log("모임이름:" + name);

  //모임 소개
  const [introduce, setIntroduce] = useState(null);
  //console.log("모임 소개:" + introduce);

  //모집 인원 수
  const [num, setNum] = useState(null);
  const [isFocusNum, setIsFocusNum] = useState(false);
  //console.log("모집 인원 수:" + num);

  //시작일 설정
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dateText, setDateText] = useState(null);

  //종료일 설정
  const [endDate, setEndDate] = useState(new Date());
  const [endOpen, setEndOpen] = useState(false);
  const [endDateText, setEndDateText] = useState(null);


  //시작일 ,종료일 비교
  const handleConfirm = (selectedDate) => {
    setEndOpen(false);
    setEndDate(selectedDate);

    const formattedEndDate = moment(selectedDate).format("YYYY-MM-DD");

    if (moment(selectedDate).isBefore(dateText)) {
      // 선택한 날짜가 특정 날짜보다 앞선 경우 경고창 표시
      Alert.alert("경고", "시작 날짜보다 이전의 날짜를 선택할 수 없습니다.");
      setEndDateText(""); // endDateText를 비워줌
    } else {
      setEndDateText(formattedEndDate);
    }
  };

  //모임 장소
  const [location, setLocation] = useState(null);
  //console.log("모임 장소:" + location);

  const [selectedImage, setSelectedImage] = useState(null);

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
    //console.log("imageUrl", imageUrl);

    // imageUrl 사용 로직 ...
  };

  
  //입력 유효성 validate
  const validate = () => {
    if ( value !== null && name !== null && introduce !== null && num !== null && dateText !== null && 
      endDateText !== null && location !== null && imageUri !== null)
      {
      return true;
    } else {
      return false;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <TopTap>
          <TouchableOpacity
            style={styles.back}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Entypo name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
          <TopTitle>모임 개설하기</TopTitle>
        </TopTap>
        <TouchableOpacity onPress={openImagePicker}>
          <ImageContainer style={[selectedImage ? styles.image : null]}>
            <FontAwesome name="camera" size={30} color="gray" />
            <ImageTitle>사진 추가</ImageTitle>
          </ImageContainer>
        </TouchableOpacity>
        <Row>
          <Class name="category" size={17} color="#A43131" />
          <Title>모임 종류</Title>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "#A43131" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            activeColor="#F7E5E5"
            data={category}
            search
            maxHeight={300}
            labelField="label"
            valueField="num"
            placeholder={!isFocus ? "Select items" : "..."}
            searchPlaceholder="Search..."
            autoScroll={false} //이거 줄까? 말까?
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.label);
              setIsFocus(false);
            }}
            itemTextStyle={styles.itemTextStyle}
            renderRightIcon={() => (
              <Entypo
                style={styles.icon}
                color={isFocus ? "#A43131" : "gray"}
                name={isFocus ? "chevron-up" : "chevron-down"}
                size={20}
              />
            )}
          />
        </Row>
        <Row>
          <Name
            name="badge-account-horizontal-outline"
            size={17}
            color="#A43131"
          />
          <Title>모임 이름</Title>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setName(text)}
          />
        </Row>
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => setIntroduce(text)}
          placeholder="모임을 소개해주세요"
          placeholderTextColor="#9B9B9B"
          multiline={true}
          textAlignVertical="top" //android용 확인
        />
        <Hr />
        <Row>
          <People name="people-alt" size={17} color="#A43131" />
          <Title>모집 인원 수</Title>
          <Dropdown
            style={[styles.dropdown, isFocusNum && { borderColor: "#A43131" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            activeColor="#F7E5E5"
            data={numOfPerson}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocusNum ? "Select items" : "..."}
            searchPlaceholder="Search..."
            autoScroll={false} //이거 줄까? 말까?
            onFocus={() => setIsFocusNum(true)}
            onBlur={() => setIsFocusNum(false)}
            onChange={(item) => {
              setNum(item.label);
              setIsFocusNum(false);
            }}
            itemTextStyle={styles.itemTextStyle}
            renderRightIcon={() => (
              <Entypo
                style={styles.icon}
                color={isFocusNum ? "#A43131" : "gray"}
                name={isFocusNum ? "chevron-up" : "chevron-down"}
                size={20}
              />
            )}
          />
        </Row>
        <NoticeText>
          최소 인원 4명 최대 인원 10명으로 설정 가능합니다.
        </NoticeText>
        <Row>
          <Feather name="calendar" size={17} color="#A43131" />
          <Title>시작일</Title>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <CalendarContainer>
              <DatePicker
                modal
                mode="date"
                open={open}
                date={date}
                onConfirm={(date) => {
                  setOpen(false);
                  setDate(date);
                  const formattedDate = moment(date).format("YYYY-MM-DD");
                  setDateText(formattedDate);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
              <CalendarText>{dateText}</CalendarText>
            </CalendarContainer>
          </TouchableOpacity>
          <EndTitle> ~ 종료일</EndTitle>
          <TouchableOpacity onPress={() => setEndOpen(true)}>
            <CalendarContainer>
              <DatePicker
                modal
                mode="date"
                open={endOpen}
                date={endDate}
                onConfirm={handleConfirm}
                onCancel={() => {
                  setEndOpen(false);
                }}
              />
              <CalendarText>{endDateText}</CalendarText>
            </CalendarContainer>
          </TouchableOpacity>
        </Row>
        <Row>
          <Ionicons name="location-outline" size={17} color="#A43131" />
          <Title>모임 장소</Title>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setLocation(text)}
            placeholder="오프라인 혹은 온라인 장소를 입력하세요"
          />
        </Row>
        <Hr />
        <TouchableOpacity
          style={styles.end}
          onPress={() => {
            if (validate) {
              navigation.navigate("AddNext", {
                value,
                name,
                introduce,
                num,
                dateText,
                endDateText,
                location,
                imageUri,
              });
            } else {
              Alert.alert("모든 필수 요소를 입력해주새요.");
            }
          }}
        >
          <NextButton>
            <NextText>다음</NextText>
          </NextButton>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
export default Add;
