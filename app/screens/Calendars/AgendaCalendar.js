import React, { useEffect, useState } from "react";
import {View, Text, TouchableOpacity, Modal} from "react-native";

import {Agenda} from 'react-native-calendars';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlarmView from './AlarmView'
import {calStyles, styles} from '../../styles/compStyles';

const URL = 'http://danram-api.duckdns.org:8080';

const formData = new FormData();
formData.append('alarmFrequency', '01:00');
formData.append('alarmTime', '2023-05-19');
formData.append('description', 'Moaning');
formData.append('endAt', '10:00');
formData.append('groupName', 'abc');
formData.append('groupType', 'aaa');
formData.append('location', 'school');
formData.append('max', 5);
formData.append('partyImage', {uri : 'bbb'});
formData.append('startAt', 'ccc');

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}

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

const MyCalendar = () => {
  const [partyInfo, setPartyInfo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDay, setModalDay] = useState(null);
  const [modalName, setModalName] = useState(null);

  const closeModal = () => {
    setModalVisible(false);
    console.log('close call');
    if(modalVisible)
      console.log('its true');
    else
      console.log('its false');
  };
  const handleGetPartyInfo = async (TOKEN) => {

    const response = await fetch(URL + '/party/myInfo', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + TOKEN,
        'Content-Type': 'application/json',
      },
    })
        .then(data => data.json())
        .then(data => { console.log('my party : ', data)})
        .catch(error => {
          console.error('Failed : ' + error);
        });
    return response;
  };

  const handleCreateParty = async (formdata) => {
    const TOKEN = await getToken();
    const response = await fetch(URL + '/party/create',{
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + TOKEN,
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    });

    return response;
  }

  useEffect(()=>{
    const initialize = async () => {

        const t = await getToken();
        if (t !== null) {
          console.log('formData is ', formData);
          const TOKEN = await getToken();
          const response = await fetch(URL + '/party/create',{
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + TOKEN,
              'Content-Type': 'multipart/form-data',
            },
            body: formData,
          })
          console.log('party create data : ', response);
          /*const response = await handleGetPartyInfo(t);
          console.log('party data : ', response);*/
          //await loadID();
        } else {
          console.log('실패.  ');
        }

    };
    console.log('calendar effect');
    initialize();
  }, []);

  const [items, setItems] = React.useState({});
  const loadItems = (day) => {

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        /*const times = ['2023-05-11', '2023-05-13'];

        for (let i = 0; i < times.length; i++) {
          const key = times[i];
          if (!items[key])
            items[key] = [];
        }

        items['2023-05-11'] = [];
        items['2023-05-13'] = [];
        items['2023-05-11'].push({
          day: '11',
          name: '모닝콜',
          time: '07:00',
          location: '온라인',
          height: Math.max(10, Math.floor(Math.random() * 150)),
        })
        items['2023-05-13'].push({
          day: '13',
          name: '캡스톤 회의',
          time: '22:00',
          location: '기흥역',
          height: Math.max(10, Math.floor(Math.random() * 150)),
        })*/
        if (!items[strTime]) {
          items[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 1);

          items[strTime].push({
            name: 'Item for ' + strTime,
            height: Math.max(10, Math.floor(Math.random() * 150)),
            day: strTime,
            time: '10:00',
            location: 'online',
          });
        }
      }

      const newItems = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  }
  const itemPress = (day, name) => {
    setModalVisible(true);
    setModalDay(day);
    setModalName(name);
    console.log('item pressed');
  }

  const renderItem = (item) => {
    return (
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={[calStyles.item]} onPress={() => itemPress(item.day, item.name)}>
                <View style={[calStyles.scheduleItem, {flex: 0.2}]}>
                  <View style={calStyles.dateView}>
                    <Text style={{fontSize: 25, color: 'black', fontWeight: 'bold'}}>
                      {item.day.split('-')[2]}
                    </Text>
                  </View>
                  <View style={calStyles.scheduleContent}>
                    <Text style={calStyles.title}>{item.name}</Text>
                    <Text style={calStyles.time}>{item.time}</Text>
                    <Text style={calStyles.time}>{item.location}</Text>
                  </View>
                </View>
          </TouchableOpacity>
        </View>
    );
  }
  const renderDay = (day, item) => {
    return null; // 날짜 표시를 제거하고 아무 내용도 반환하지 않음
  };

  const [selectedDate, setSelectedDate] = useState('');

  const handleSelectDate = day => {
    setSelectedDate(day.dateString);
  };
  function getDayOfWeek(dateString) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();

    return daysOfWeek[dayOfWeek];
  }
  const getMonth = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'long' });
    return month;
  };
  const getPerDay = (dateString) =>{
    //return dateString.split('-')[2];
  }
  const markedDates = {};
  if (selectedDate) {
    markedDates[selectedDate] = { selected: true,
      selectedColor: 'rgba(223, 165, 165, 01.0)',
      selectedTextColor: 'white', borderRadius: 10
    };
  }

  const data = [
    {time : '07:00', title: 'I woke up', image: undefined, name: 'kim'},
    {time : '07:01', title: 'Hello', image: undefined, name: 'han'}
  ];
  const theDate = {dayOfWeek: 'Monday', month: 'April', day: '2'};


  return (
    <View style={calStyles.container}>

      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        refreshControl={null}
        showClosingKnob={true}
        refreshing={false}
        renderItem={renderItem}
        renderDay={renderDay}
        onDayPress={handleSelectDate}
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: '#FFFFFF',
        }}
        //renderHeader={renderHead
      />
      {/*<StatusBar />*/}
      <Modal visible={modalVisible} animationType="slide"
             onRequestClose={closeModal}
             style={[ { zIndex: 9999, flex: 1 }]}
      >
        <View>
          <View style={{flexDirection: 'row', marginLeft: 20, marginTop: 10}}>
            <Text style={[calStyles.hugeText, {color: 'rgba(164, 49, 49, 1)',}]}>{getDayOfWeek(modalDay)}, </Text>
            <Text style={calStyles.hugeText}>{getPerDay(modalDay)} </Text>
            <Text style={calStyles.hugeText}>{getMonth(modalDay)}</Text>
          </View>
          <Text style={styles.bigText}>{modalName}</Text>
        </View>
        <AlarmView data={data} />
        <View>
          <TouchableOpacity onPress={closeModal}>
            <Text>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}




export default MyCalendar;
