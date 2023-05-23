import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput, Alert
} from 'react-native';
import styled from "styled-components/native";
import styles from '../../styles/compStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
const URL = 'http://danram-api.duckdns.org:8080';

const getToken = async () => {
    try{
        const value = await AsyncStorage.getItem('jwts');
        const data = JSON.parse(value);
        return data.accessToken;
    }catch (error) {
        console.log('JWT 토큰을 검색하는 동안 오류가 발생:', error);
        return null;
    }
}
export default function Nickname({navigation, route}) {
    const [str, myChangeText] = React.useState('');
    var INFO = route.params;
    console.log('nickname, information name : ', INFO.name);

    const handleChangeNickname = async (NAME) => {
        const t = await getToken();
        console.log('매개변수 : ', NAME, 'token : ', t);
        // API 요청: GET /member/name/{name}
        await fetch(URL + `/member/name/` + NAME, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + t,
                'Content-Type': 'application/json',
            },
        })
            .then(data => data.json())
            .then(data => {
                // 응답 처리
                console.log('ChangeNickname fetch succes: ' + JSON.stringify(data));
            })
            .catch(error => {
                // 오류 처리
                console.error('ChangeNickname fetch Error : ' + error);
            });
    };

    const buttonPress = async () => {
        if(str.length < 4){
            Alert.alert("문자가 너무 짧습니다");
        }
        else{
            // 닉네임 변경
            await handleChangeNickname(str)
                .then(data => {
                    // 응답 처리
                    console.log('ChangeNickname success: ' + data);
                })
                .catch(error => {
                    // 오류 처리
                    console.error('ChangeNickname Error : ' + error);
                });

            //Page 로
            navigation.navigate('Page');
        }
    };



    return(
        <View style={styles.subContainer}>

            <View>
                <Text style={[styles.normalText, {marginTop: 20}]}>닉네임</Text>
                <TextInput style={[styles.textInput, {marginTop: 10}]}
                           onChangeText={text => myChangeText(text)}
                           value={str}
                />
                <View>
                    <Text style={styles.normalText}>*변경 후 30일 동안 변경할 수 없습니다.</Text>
                </View>
                <TouchableOpacity style={styles.pinkButt}
                                  onPress={() => buttonPress()}>
                    <Text style={[styles.middleText, {justifyContent: 'center'}]}>
                        닉네임 변경
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
