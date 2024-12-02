import { createStaticNavigation } from "@react-navigation/native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import RootStack from "./src/navigators/AppNavigator";
import AuthContext from "./src/context/AuthContext"
import useIsSignedOut from "./src/hooks/useIsSignedOut";
import useIsSignedIn from "./src/hooks/useIsSignedIn";
import { useState } from "react";

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  const[isLogin, setIsLogin] = useState(false);

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