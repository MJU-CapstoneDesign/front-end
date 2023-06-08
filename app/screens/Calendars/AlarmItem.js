import {View, Text,  Image, Switch,} from "react-native";
import React, { useState } from "react";
import {calStyles, styles} from "../../styles/compStyles";

//style={calStyles.dateView}
//
 const AlarmItem = (item) => {
     const [isSwitchOn, setIsSwitchOn] = useState(false);

     const toggleSwitch = () => {
         setIsSwitchOn(!isSwitchOn);
     };
    console.log('item : ',item.item.name);
    return(
        <View style={[calStyles.scheduleItem, {width: '80%'}]}>
            <View>
                {
                    item.item.profile !== undefined ? (
                        <Image source={{ uri: item.item.profile }} style={[styles.image]} resizeMode="cover"/>
                    ) : (
                        <Image source={require("../../image/profile.jpg")} style={styles.image}></Image>
                    )
                }
            </View>
            <View style={{marginLeft: 10, alignItems: 'flex-start'}}>
                <Text style={[styles.bigText, {marginLeft: 10, marginTop: 0}]}>{item.item.name}</Text>
                <Text style={[styles.bigText, {marginLeft: 10, marginTop: 5}]}>{item.item.time}</Text>
            </View>
            <View style={{justifyContent: 'flex-end', flex: 1,}}>
                <Switch value={isSwitchOn} onValueChange={toggleSwitch} />
            </View>

        </View>
    )
}

export default AlarmItem;
