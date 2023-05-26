import {View} from "react-native";
import React from "react";
import {styles} from "../../styles/compStyles";
import AlarmItem from "./AlarmItem";
const AlarmView = ({members}) => {
        return (
        <View style={[styles.container, {justifyContent: 'flex-start'}]}>
            {members.map((item, index) => (
                //time, title, image,
                <AlarmItem key = {index} item = {item}/>
            ))}
        </View>

    )
}

export default AlarmView;
