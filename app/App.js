import { createStaticNavigation } from "@react-navigation/native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import RootStack from "./src/navigators/AppNavigator";

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <Navigation />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}