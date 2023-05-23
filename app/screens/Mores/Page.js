import React, { useState } from 'react';
import {
    Text,
    View, Image,
    TouchableOpacity,
    Modal
} from 'react-native';
import {styles} from '../../styles/compStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "@react-navigation/native";

let ImagePicker = require('react-native-image-picker');
const URL = 'http://danram-api.duckdns.org:8080';


export default function Page({ navigation}) {
    const [profile, setProfile] = useState(null);
    const [name, setName] = useState(null);
    let info;
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

    const handleGetMyInfo = async (TOKEN) => {

        await fetch(URL + '/member/info', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + TOKEN,
                'Content-Type': 'application/json',
            },
        })
            .then(data => data.json())
            .then(data => {
                console.log('response success:' + data + 'is data');
                info = data;
            })
            .catch(error => {
                console.error('Failed : ' + error);
            });
    };
    const loadID = async () => {
        //const savedID = await getSavedID();
        const NAME = info.name;
        const PROFILE = info.profile;
        if(NAME !== null) {
            setName(NAME);
            setProfile(PROFILE);
        }
        else{
            setProfile(undefined);
            setName('name');
        }
    }
    useFocusEffect(()=>{
        const initialize = async () => {
            try {
                const t = await getToken();
                if (t !== null) {
                    await handleGetMyInfo(t);
                    console.log('handled');
                    await loadID();
                } else {
                    console.log('저장된 JWT 토큰이 없습니다.');
                }
            } catch (error) {
                console.log('JWT 토큰을 검색하는 동안 오류가 발생했습니다:', error);
            }
        };

        initialize();

        const unsubscribe = navigation.addListener('focus', initialize);
        return unsubscribe;
    })

    const handleUploadProfileImage = async (newProfile) => {
        console.log('imagefile in handle : ', newProfile);
        // 프로필 사진 업로드 로직 구현
        const t = await getToken();

        /*const formData = new FormData();
        formData.append('profileImage', {
            uri: newProfile,
            type: 'image/jpeg',
            name: 'profile.jpg',
        });*/
        // API 요청: POST /member/profile/img
        await fetch(URL + '/member/profile/img', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + t,
                'Content-Type': 'application/json',
                //'Content-Disposition': `attachment; filename=` + newProfile,
            },
            body: JSON.stringify(newProfile),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Profile upload success : ' + JSON.stringify(data));
            })
            .catch(error => {
                // 오류 처리
                console.error('Profile upload failed : ', error);
            });
    };


    const [showModal, setShowModal] = useState(false);

    const handlePress = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleImagePicker = () => {
        const options = {
            mediaType: 'photo',
            //includeBase64: true,
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                console.log('image response :', response);
                const imageData = response.assets[0].uri;
                const filename = imageData.substring(imageData.lastIndexOf('/') + 1);

                console.log('image base64 :', filename);

                handleUploadProfileImage(filename)
                    .then(()=> handleGetMyInfo())
                    .then(()=>loadID())
                    .then(()=>{
                        console.log('Saved name:  ', name);
                    });
            }
        });
    };

    const nickSetPress = () => {
        navigation.navigate('Nickname', info);
    }
    const quitPress = () => {
        navigation.navigate('Quit', info);
    }

    //jwtDelete();
    //handleGetMyInfo();

    return (
        <View style={styles.container}>

            <View style={styles.box2}>
                <Text   style={styles.bigText}>내 정보</Text>
                <View style={styles.touchable}>
                    <View style={{
                        width: 70, height: 70, marginLeft: 10,}}>
                        {
                            profile !== undefined ? (
                                <Image source={{ uri: profile }} style={styles.image}/>
                            ) : (
                                <Image source={require("../../image/profile.jpg")}></Image>
                            )
                        }
                    </View>
                    <Modal
                        visible={showModal}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={handleModalClose}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <TouchableOpacity onPress={handleImagePicker}>
                                    <Text>Change Image</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleModalClose}>
                                    <Text>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <View style={{marginLeft: 10, alignItems: 'flex-start'}}>
                        <Text style={[styles.normalText, styles.marginLeftLittle]}>닉네임</Text>
                        <Text style={[styles.bigText, {marginLeft: 10, marginTop: 5}]}>{name}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.box3}>
                <Text style={styles.bigText}>계정</Text>
                <TouchableOpacity style={styles.perButt}
                                  onPress={nickSetPress}>
                    <Text style={styles.normalText}>닉네임 설정</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.perButt}
                                  onPress={handlePress}>
                    <Text style={styles.normalText}>프로필 사전 수정</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.box4}>
                <Text style={styles.bigText}>이용 안내</Text>
                <TouchableOpacity style={styles.perButt}><Text style={styles.normalText}>공지사항</Text></TouchableOpacity>
                <TouchableOpacity style={styles.perButt}><Text style={styles.normalText}>개인 정보 처리 방침</Text></TouchableOpacity>
                <TouchableOpacity style={styles.perButt}><Text style={styles.normalText}>문의하기</Text></TouchableOpacity>
                <TouchableOpacity style={styles.perButt}><Text style={styles.normalText}>신고하기</Text></TouchableOpacity>
                <TouchableOpacity style={styles.perButt}
                                  onPress={quitPress}
                ><Text style={styles.normalText}>회원 탈퇴</Text></TouchableOpacity>
                {/*<TouchableOpacity style={styles.perButt} onPress={jwtDelete}><Text style={styles.normalText}>초기화</Text></TouchableOpacity>
*/}
            </View>

        </View>
    );
};
