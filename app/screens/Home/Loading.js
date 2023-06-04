import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const Container = styled(LinearGradient).attrs({
  colors: ["#ECC8C8", "#ECC8C8", "#ECC8C8", "#ECC8C8", "#F9DCE1", "#FDF4F5"],
  start: { x: 0, y:0 },
  end: { x:0, y: 1 },
})`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Loading = () => {
  return (
    <Container>
      <Text
        style={{
          fontSize: 50,
          fontWeight: "bold",
          marginTop: -300,
          color: "#A43131",
        }}
      >
        DanRarm
      </Text>
      <Text>Capston</Text>
    </Container>
  );
};

export default Loading;
