import React, {useEffect, useState} from 'react';
import {
    Text,
    View, Image,
    TouchableOpacity,
    Modal, Platform
} from 'react-native';
import {styles} from '../../styles/compStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "@react-navigation/native";
import {launchImageLibrary} from "react-native-image-picker";
import storage from "@react-native-firebase/storage";

let ImagePicker = require('react-native-image-picker');
const URL = 'http://danram-api.duckdns.org:8080';


export default function Page({ navigation}) {
    const [profile, setProfile] = useState(null);
    const [name, setName] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [firebaseUri, setFirebaseUri] = useState(null);

    let info;
    const getToken = async () => {
        try{
            const value = await AsyncStorage.getItem('jwts');
            const data = JSON.parse(value);
            console.log('jwt is ', data);
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
        console.log('member id', info.userId);
        if(NAME !== null) {
            setName(NAME);
            setProfile(PROFILE);
        }
        else{
            setProfile(undefined);
            setName('name');
        }
    }
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

    useFocusEffect(()=>{
        console.log('useFocusEffect called');
        initialize();

        const unsubscribe = navigation.addListener('focus', initialize);
        return unsubscribe;
    })

    useEffect(() => {
        const profileResponce = async () =>{
            if (response !== null) {
                await imageUpload();
                //await initialize();
            }
        }
        profileResponce();
    }, [response]);

    useEffect(()=>{
        console.log('the firebase uri: ', firebaseUri);
        const profileChange = async  () =>{
            if(firebaseUri !== null) {
                await handleProfileMember();
                await initialize();
            }
        }
        profileChange();
    },[firebaseUri]);

    const onSelectImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                maxWidth: 512,
                maxHeight: 512,
                includeBase64: Platform.OS === 'android',
            },
            (res) => {
                if (res.didCancel) return;
                setResponse(res);
            },
        );
    };


    const imageUpload = async () => {
        setLoading(true);
        let imageUrl = null;
        if (response) {
            const asset = response.assets[0];
            const reference = storage().ref(`/profile/${asset.fileName}`); // 업로드할 경로 지정
            if (Platform.OS === 'android') { // 안드로이드
                // 파일 업로드
                await reference.putString(asset.base64, 'base64', {
                    contentType: asset.type
                });
            } else { // iOS
                // 파일 업로드
                await reference.putFile(asset.uri);
            }
            imageUrl = response ? await reference.getDownloadURL() : null;
        }
        setFirebaseUri(imageUrl);
        console.log('imageUrl  ', imageUrl);
        // imageUrl 사용 로직 ...
    };
    const handleProfileMember = async () => {

        console.log('fire uri confirm : ', firebaseUri, ' type : ', typeof firebaseUri);
        const TOKEN = await getToken();

        await fetch(URL + '/member/profile/img',{
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + TOKEN,
                'Content-Type': 'application/json',
                //"Content-Type": "multipart/form-data",
            },
            /*body: JSON.stringify({
                img: firebaseUri,
            }),*/
            body: firebaseUri,
        })
            .then(response => response.json())
            .then(data => {
                // 응답 데이터 처리
                console.log('profile changing :  ', data);
            })
            .catch(error => {
                // 에러 처리
                console.error('profile fail : ',error);
            });
    }
    const nickSetPress = () => {
        navigation.navigate('Nickname', info);
    }
    const quitPress = () => {
        navigation.navigate('Quit', info);
    }

    const handlePress = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    console.log('prof : ', profile);
    return (
        <View style={styles.container}>

            <View style={styles.box2}>
                <Text   style={styles.bigText}>내 정보</Text>
                <View style={styles.touchable}>
                    <View style={{
                        width: 70, height: 70, marginLeft: 10,}}>
                        {profile && <Image source={{ uri: profile }} style={styles.image}/>}
                    </View>
                    <Modal
                        visible={showModal}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={handleModalClose}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <TouchableOpacity onPress={onSelectImage}>
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
