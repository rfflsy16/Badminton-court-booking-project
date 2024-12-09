import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import Home from "../screens/Home";
import Booking from "../screens/Booking";
import Chat from "../screens/Chat";
import Profile from "../screens/Profile";
import Venues from "../screens/Venues";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";  
import { ChatProvider, useChat } from '../context/ChatContext';

const Tab = createBottomTabNavigator();

const ChatIconWithBadge = ({ focused, color }) => {
    const { unreadCount } = useChat();
    
    return (
        <View>
            <Ionicons
                name={focused ? "chatbubble" : "chatbubble-outline"}
                size={24}
                color={color}
            />
            {unreadCount > 0 && (
                <View style={{
                    position: 'absolute',
                    right: -6,
                    top: -6,
                    backgroundColor: '#006D77',
                    borderRadius: 10,
                    minWidth: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: '#fff',
                }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 10,
                        fontWeight: '600',
                    }}>
                        {unreadCount}
                    </Text>
                </View>
            )}
        </View>
    );
};

export const TabStack = () => {
    return (
        <ChatProvider>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: "#fff",
                        borderTopWidth: 1,
                        borderTopColor: "#E2E8F0",
                        height: 64,
                        paddingBottom: 10,
                        paddingTop: 8,
                        elevation: 0,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: -2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                    },
                    tabBarActiveTintColor: "#006D77",
                    tabBarInactiveTintColor: "#94A3B8",
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: "500",
                        marginTop: 2,
                    },
                    tabBarIconStyle: {
                        marginBottom: 2,
                    },
                }}
            >
                <Tab.Screen 
                    name="Home" 
                    component={Home}
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons
                                name={focused ? "home" : "home-outline"}
                                size={24}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Booking" 
                    component={Booking}
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons
                                name={focused ? "calendar" : "calendar-outline"}
                                size={24}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Venues" 
                    component={Venues}
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            <MaterialCommunityIcons
                                name="badminton"
                                size={24}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Chat" 
                    component={Chat}
                    options={{
                        tabBarIcon: (props) => <ChatIconWithBadge {...props} />,
                    }}
                />
                <Tab.Screen 
                    name="Profile" 
                    component={Profile}
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons
                                name={focused ? "person" : "person-outline"}
                                size={24}
                                color={color}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </ChatProvider>
    );
}