import { createStaticNavigation } from "@react-navigation/native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import RootStack from "./src/navigators/AppNavigator";
import AuthContext from "./src/context/AuthContext"

import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

const Navigation = createStaticNavigation(RootStack);


export default function App() {
  const[isLogin, setIsLogin] = useState(false);
  
  useEffect(()=>{
    getValueFor()
  },[])

  async function getValueFor() {
    let result = await SecureStore.getItemAsync('userToken');
    
    if (result) {
      setIsLogin(true)

    }
  }
  
  
  return (
  <AuthContext.Provider value={{ isLogin, setIsLogin }}>
  <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <Navigation />
      </SafeAreaView>
    </SafeAreaProvider>
    </AuthContext.Provider>

  )
}