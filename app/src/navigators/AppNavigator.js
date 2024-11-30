import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import { TabStack } from "./BottomTabNavigator";
import CourtDetail from "../screens/CourtDetail";
import ChatDetail from "../screens/chat/ChatDetail";
import Maps from '../screens/Maps';

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
        },
        ChatDetail: {
            screen: ChatDetail
        },
        Maps: {
            screen: Maps
        }
    },
});

export default RootStack;