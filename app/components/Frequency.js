import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TagSelector from "react-native-tag-selector";

const styles = StyleSheet.create({
  tagStyle: {
    backgroundColor: "#F0F0F0",
    width: 33,
    height: 33,
    marginLeft: 15,
    borderRadius:10,
    fontSize: 13,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  btnStyle: {
    width: 10,
  },
  selectStyle:{
    backgroundColor: "#F7E5E5",
    width: 33,
    height: 33,
    marginLeft: 15,
    borderRadius: 10,
    fontSize: 13,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

});
export default function Frequency(props) {
  const tags = [
    {
      id: "월",
      name: "월",
    },
    {
      id: "화",
      name: "화",
    },
    {
      id: "수",
      name: "수",
    },
    {
      id: "목",
      name: "목",
    },
    {
      id: "금",
      name: "금",
    },
    {
      id: "토",
      name: "토",
    },
    {
      id: "일",
      name: "일",
    },
  ];

  return (
    <View>
      <TagSelector
        maxHeight={70}
        tags={tags}
        tagStyle={styles.tagStyle}
        selectedTagStyle={styles.selectStyle}
        onChange={(selected) => {
          props.onFrequencyChange(selected);
        }}
      />
    </View>
  );
}
