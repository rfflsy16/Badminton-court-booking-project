import { createStaticNavigation } from "@react-navigation/native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import RootStack from "./src/navigators/AppNavigator";
import AuthContext from "./src/context/AuthContext";
import { ChatProvider } from "./src/context/ChatContext";
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useEffect, useState, useRef } from "react";
import * as SecureStore from 'expo-secure-store';

const Navigation = createStaticNavigation(RootStack);

function handleRegistrationError(errorMessage) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Failed to get push token for push notification!');
      return;
    }
    const projectId = 
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      // console.log(pushTokenString);
      return pushTokenString;
    } catch (e) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch((error) => setExpoPushToken(`${error}`));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      // setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(()=>{
    getValueFor()
  },[])


  useEffect(() => {
    const getNearestCourts = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            

            const sorted = courtsWithDistance.sort((a, b) => a.distance - b.distance);
            
        } catch (error) {
            console.log(error);
          
            
        }
    };

    getNearestCourts();
}, []);


  async function getValueFor() {
    let result = await SecureStore.getItemAsync('userToken');
    
    if (result) {
      setIsLogin(true)

    }
  }
  
  
  return (
  <AuthContext.Provider value={{ isLogin, setIsLogin, expoPushToken }}>
  <ChatProvider>
  <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    
        <Navigation />
      </SafeAreaView>
    </SafeAreaProvider>
    </ChatProvider>
    </AuthContext.Provider>

  )
}