import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { TabStack } from "./BottomTabNavigator";
import CourtDetail from "../screens/CourtDetail";

const RootStack = createNativeStackNavigator({
    initialRouteName: "Login",
    screenOptions: {
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
    },
    screens: {
        // Authentication
        Login: {
            screen: Login,
        },
        Register: {
            screen: Register
        },
        // Main App
        MainApp: {
            screen: TabStack
        },
        // Other Screens
        CourtDetail: {
            screen: CourtDetail
        }
    },
});

export default RootStack;