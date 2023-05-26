import React, { useState, useEffect, useContext } from "react";
import Root from "./navigation/Root";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LogIn from "./screens/Home/Login";
import { TokenProvider } from "./screens/Home/TokenContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem("jwts");
        if (value !== null) {
          const data = JSON.parse(value);
          setToken(data.accessToken);
        } else {
          console.log("저장된 JWT 토큰이 없습니다.");
        }
      } catch (error) {
        console.log("JWT 토큰을 검색하는 동안 오류가 발생했습니다:", error);
      }
    };
    getToken();
  }, []);

  if (token !== null) {
    return (
      <TokenProvider>
        <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Root token={token} />
        </NavigationContainer>
        </QueryClientProvider>
      </TokenProvider>
    );
  } else {
    return <LogIn />;
  }
}
