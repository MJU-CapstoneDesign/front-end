import React, { useState, useEffect, useContext , useRef} from "react";
import Root from "./navigation/Root";
import { NavigationContainer ,NavigationContainerRef} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LogIn from "./screens/Home/Login";
import { TokenProvider } from "./screens/Home/TokenContext";
import { QueryClient, QueryClientProvider } from "react-query";
import notifee, { EventType } from "@notifee/react-native";



const queryClient = new QueryClient();
import Loading from "./screens/Home/Loading";


export default function App() {
  const navigationRef = useRef<NavigationContainerRef>(null);
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


  useEffect(() => {
    console.log("category!!!!!!!");
    (async () => {
      await notifee.setNotificationCategories([
        {
          id: "new-episode",
          actions: [
            { id: "default", title: "Watch Now" },
            { id: "bookmark", title: "Save For Later" },
          ],
        },
      ]);
    })();
  
  }, []);
  
  // Subscribe to events
  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log("User dismissed notification", detail.notification);
          break;
        case EventType.PRESS:
          console.log("User pressed notification", detail.notification);
            // messaging()
            //   .unsubscribeFromTopic(detail.notification?.data?.partyId)
            //   .then(() => console.log('Unsubscribed from topic!'));
          break;
      }
    });
  }, []);

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

