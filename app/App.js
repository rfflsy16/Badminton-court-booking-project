import { createStaticNavigation } from "@react-navigation/native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import RootStack from "./src/navigators/AppNavigator";
import AuthContext from "./src/context/AuthContext"
import useIsSignedOut from "./src/hooks/useIsSignedOut";
import useIsSignedIn from "./src/hooks/useIsSignedIn";
import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const Navigation = createStaticNavigation(RootStack);


export default function App() {
  const[isLogin, setIsLogin] = useState(false);
  
  useEffect(()=>{
    getValueFor()
  },[])

  async function getValueFor() {
    let result = await SecureStore.getItemAsync('userToken');
    console.log(result, '<<<<<<<<<<<<<<<<<<<')
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