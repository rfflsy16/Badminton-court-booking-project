import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import { TabStack } from "./BottomTabNavigator";
import CourtDetail from "../screens/CourtDetail";
import ChatDetail from "../screens/chat/ChatDetail";
import Maps from '../screens/Maps';
import BuildingCourts from '../screens/BuildingCourts';
import EditProfile from '../screens/profile/EditProfile';
import NotificationSettings from '../screens/profile/NotificationSettings';
import PaymentMethods from '../screens/profile/PaymentMethods';
import Language from '../screens/profile/Language';
import DarkMode from '../screens/profile/DarkMode';
import HelpCenter from '../screens/profile/HelpCenter';
import TermsOfService from '../screens/profile/TermsOfService';
import PrivacyPolicy from '../screens/profile/PrivacyPolicy';
import Notifications from '../screens/Notifications';
import Invoice from '../screens/Invoice';
import useIsSignedOut from "../hooks/useIsSignedOut";
import useIsSignedIn from "../hooks/useIsSignedIn";  
import Midtrans from "../screens/Midtrans";  

const RootStack = createNativeStackNavigator({
    // initialRouteName: "MainApp",
    screenOptions: {
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
    },
    screens: {
        // Authentication
        // Test: {
        //     screen: Test,
        // },
        Login: {
            if: useIsSignedOut,
            screen: Login,
        },
        Register: {
            if: useIsSignedOut,
            screen: Register
        },
        // Main App
        MainApp: {
            if: useIsSignedIn,
            screen: TabStack
        },
        // Other Screens
        CourtDetail: {
            if: useIsSignedIn,
            screen: CourtDetail
        },
        Midtrans: {
            if: useIsSignedIn,
            screen: Midtrans
        },
        ChatDetail: {
            if: useIsSignedIn,
            screen: ChatDetail
        },
        Maps: {
            if: useIsSignedIn,
            screen: Maps
        },
        BuildingCourts: {
            if: useIsSignedIn,
            screen: BuildingCourts
        },
        EditProfile: {
            if: useIsSignedIn,
            screen: EditProfile
        },
        NotificationSettings: {
            if: useIsSignedIn,
            screen: NotificationSettings
        },
        PaymentMethods: {
            if: useIsSignedIn,
            screen: PaymentMethods
        },
        Language: {
            if: useIsSignedIn,
            screen: Language
        },
        DarkMode: {
            if: useIsSignedIn,
            screen: DarkMode
        },
        HelpCenter: {
            if: useIsSignedIn,
            screen: HelpCenter
        },
        TermsOfService: {
            if: useIsSignedIn,
            screen: TermsOfService
        },
        PrivacyPolicy: {
            if: useIsSignedIn,
            screen: PrivacyPolicy
        },
        Notifications: {
            if: useIsSignedIn,
            screen: Notifications
        },
        Invoice: {
            if: useIsSignedIn,
            screen: Invoice
        },
    },
});

export default RootStack;