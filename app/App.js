import React, { useState, useEffect, useContext } from "react";
import Root from "./navigation/Root";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LogIn from "./screens/Home/Login";
import { TokenProvider } from "./screens/Home/TokenContext";
import { QueryClient, QueryClientProvider } from "react-query";
import notifee, { EventType } from '@notifee/react-native';


const queryClient = new QueryClient();
import Loading from "./screens/Home/Loading";

export default function App() {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

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

  // useEffect(() => {
  //   (async () => {
  //     await notifee.setNotificationCategories([
  //       {
  //         id: "new-episode",
  //         actions: [
  //           { id: "default", title: "Watch Now", foreground: true },
  //           { id: "bookmark", title: "Save For Later" },
  //         ],
  //       },
  //     ]);
  //   })();

  //   return notifee.onForegroundEvent(async ({ type, detail }) => {
  //     if (
  //       type === EventType.ACTION_PRESS &&
  //       detail.pressAction?.id === "bookmark"
  //     ) {
  //       setBookmarks([
  //         ...bookmarks,
  //         parseInt(detail.notification?.data?.showId as string),
  //       ]);
  //     } else if (
  //       detail.pressAction?.id === "dismiss" &&
  //       detail.notification?.id
  //     ) {
  //       await notifee.cancelNotification(detail.notification.id);
  //     }
  //   });
  // }, []);
  

  if (token !== null) {
    return (
      <TokenProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            {isLoading ? <Loading /> : <Root token={token} />}
          </NavigationContainer>
        </QueryClientProvider>
      </TokenProvider>
    );
  } else {
    return <LogIn />;
  }
}
