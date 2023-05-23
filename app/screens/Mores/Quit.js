import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput, Alert,
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

const jwtDelete = async () => {
    try {
        await AsyncStorage.removeItem('jwts');
        console.log('remove success');
    } catch(error) {
        console.log(error);
    }
}

const handleDeleteMember = async () => {
    const TOKEN = await getToken();
    // API 요청: GET /member/delete
    await fetch(URL + '/member/delete', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + TOKEN,
            'Content-Type': 'application/json',
        },
    }).catch(error => {
        console.error('delete fail: ', error);
    });
        /*.then(data => {
            console.log('quit data : ', data)
        })
        .then(data => data.json())
        .then(data => {
            console.log('delete success: ', data);
        })
        .catch(error => {
            console.error('delete fail: ', error);
        });*/
};

export default function Quit({navigation, route}) {
    const [str, myChangeText] = React.useState('');
    let INFO = route.params;

    const buttonPress = async () => {
        if(str !== INFO.name){
            Alert.alert("닉네임이 틀립니다.");
        }
        else{
            // <탈퇴
            await handleDeleteMember()
                .then(()=>{console.log('delete success')});
            await jwtDelete();
            // 탈퇴>
            navigation.navigate('Page');
        }
    };

    return(
        <View style={styles.subContainer}>

            <View>
                <Text style={[styles.normalText, {marginTop: 20, fontWeight: 'bold',}]}>닉네임 확인</Text>
                <TextInput style={[styles.textInput, {marginTop: 10}]}
                           onChangeText={text => myChangeText(text)}
                           value={str}
                />
                <View>
                    <Text style={[styles.normalText, {fontSize: 10,fontWeight: 'bold',}]}>*탈퇴 후 개인 정보, 캘린더 정보, 게시물 데이터가 삭제되며, 복구할 수 없습니다.</Text>
                    <Text style={[styles.normalText, {fontSize: 10,fontWeight: 'bold',}]}>*다시 가입 해도, 데이터는 복구되지 않습니다.</Text>
                </View>
                <TouchableOpacity style={styles.pinkButt}
                                  onPress={()=> buttonPress()}>
                    <Text style={[styles.middleText, {justifyContent: 'center'}]}>
                        회원 탈퇴
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
