import React, { useEffect, useState } from "react";
import {View, Text, TouchableOpacity, Modal, Image, } from "react-native";

import {Agenda} from 'react-native-calendars';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlarmView from './AlarmView'
import {calStyles, styles} from '../../styles/compStyles';

const URL = 'http://danram-api.duckdns.org:8080';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}
const dateToString = (date) =>{
  return date.toISOString().split('T')[0];
}

const getToken = async () => {
  try{
    const value = await AsyncStorage.getItem('jwts');
    const data = JSON.parse(value);
    console.log('the doten is ', data);
    return data.accessToken;
  }catch (error) {
    console.log('JWT 토큰을 검색하는 동안 오류가 발생:', error);
    return null;
  }
}

const MyCalendar = () => {
  const [modalVisible, setModalVisible] = useState(false);

  // partyInfo는 여러 파티가 들었다.
  let partyInfo = null;

  //const dumiEndAt = "2023-05-24T21:12:12";
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
        .then(data => {
          partyInfo = data;
          console.log('call party : ', data);
        })
        .catch(error => {
          console.error('Failed : ' + error);
        });
  };


  useEffect(()=>{
    const initialize = async () => {


    };
    initialize();
  }, []);


  const [items, setItems] = React.useState({});

  const getDayString = (dayOfWeek) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[dayOfWeek];
  };

  const loadItems = async (month) => {
    const t = await getToken();
    await handleGetPartyInfo(t);

    //await handleGetPartyInfoByNum();
    console.log('whole party : ', partyInfo);
    setTimeout(() => {
      for(let i = 0; i < partyInfo.length; i++) {
        console.log('party  ',i, ': ',  partyInfo[i]);
        const startDate = new Date(partyInfo[i].startAt);
        const endDate = new Date(partyInfo[i].endAt);  // endAt 이 startAt과 같은 관계로 dumiEndAt을 임시로 사용

        // 요일을 배열로 분리합니다.
        const alarmDays = partyInfo[i].alarmFrequency.split(',');

        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
          const dayOfWeek = currentDate.getDay();
          const currentMonth = currentDate.getMonth() + 1;
          const strDate = dateToString(currentDate);
          if(!items[strDate]) {  //원래 여러 개 겹치는 게 가능해야함.
            items[strDate] = [];
          }
          if (alarmDays.includes(getDayString(dayOfWeek))
              && currentMonth === month.month)
          {
            const obj = {
              name: partyInfo[i].groupName,
              height: Math.max(10, Math.floor(Math.random() * 150)),
              day: strDate,
              time: partyInfo[i].alarmTime,
              location: partyInfo[i].location,
              members: partyInfo[i].members,
              partyNum: i,
            }
            let shouldPush = true; // push 여부를 나타내는 변수
            for (let j = 0; j < items[strDate].length; j++) {
              //console.log('per strData : ', items[strDate])
              if (items[strDate][j].partyNum === i) {
                shouldPush = false; // 조건을 만족하는 객체가 있으면 push 하지 않음
                break;
              }
            }
            if(shouldPush) {
              items[strDate].push(obj);
            }
          }

          // 다음 날로 이동합니다.
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }

      const newItems = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
    console.log('Items : ', items);
  }

  const [perDay, setPerDay] = useState(null);
  const [perName, setPerName] = useState(null);
  const [perMembers, setPerMembers] = useState(null);
  const itemPress = (day, name, members) => {
    setPerDay(day);
    setPerName(name);
    setPerMembers(members);
    setModalVisible(true);

    console.log('item pressed, members : ', perMembers);
  }

  const renderItem = (item) => {
    return (
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={[calStyles.item]} onPress={() => itemPress(item.day, item.name, item.members)}>
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
  const renderEmptyData = () => {
    return (
        <View style={{alignItems: 'center'}}>
          <View style={[calStyles.item]}>
            <View style={[{flex: 0.2}]}>
              <View style={calStyles.scheduler}>
                <Image source={require('../../images/Emoji.png')}></Image>
                <View style={{ height: 7 }} />
                <Text style={{fontSize: 20, color: 'rgba(164, 49, 49, 1)', fontWeight: 'bold'}}>
                  지금은 저장된 일정이 없어요.
                </Text>
                <View style={{ height: 10 }} />
              </View>
            </View>
          </View>
        </View>
    );
  };

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
    const d = new Date(dateString)
    return d.getDate();
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
        renderEmptyData={renderEmptyData}
        theme={{
          selectedDayBackgroundColor: '#FFFFFF',
        }}
      />
      <Modal visible={modalVisible} animationType="slide"
             onRequestClose={closeModal}
             style={[ { zIndex: 9999, flex: 1 }]}
      >
        <View>
          <View style={{flexDirection: 'row', marginLeft: 20, marginTop: 10}}>
            <Text style={[calStyles.hugeText, {color: 'rgba(164, 49, 49, 1)',}]}>{getDayOfWeek(perDay)}, </Text>
            <Text style={calStyles.hugeText}>{getPerDay(perDay)} </Text>
            <Text style={calStyles.hugeText}>{getMonth(perDay)}</Text>
          </View>
          <Text style={styles.bigText}>{perName}</Text>
        </View>
        <AlarmView members={perMembers} />
      </Modal>
    </View>
  );
}




export default MyCalendar;
