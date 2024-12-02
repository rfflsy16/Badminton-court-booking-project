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
import Test from '../screens/test'

const RootStack = createNativeStackNavigator({
    initialRouteName: "MainApp",
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
        },
        BuildingCourts: {
            screen: BuildingCourts
        },
        EditProfile: {
            screen: EditProfile
        },
        NotificationSettings: {
            screen: NotificationSettings
        },
        PaymentMethods: {
            screen: PaymentMethods
        },
        Language: {
            screen: Language
        },
        DarkMode: {
            screen: DarkMode
        },
        HelpCenter: {
            screen: HelpCenter
        },
        TermsOfService: {
            screen: TermsOfService
        },
        PrivacyPolicy: {
            screen: PrivacyPolicy
        },
        Notifications: {
            screen: Notifications
        },
        Invoice: {
            screen: Invoice
        },
    },
});

export default RootStack;