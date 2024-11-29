import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as OutlineIcons from 'react-native-heroicons/outline';
import * as SolidIcons from 'react-native-heroicons/solid';
import Home from '../screens/Home';
// Uncomment these when screens are available
// import BookingScreen from '../screens/BookingScreen';
// import ChatScreen from '../screens/ChatScreen';
// import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#fff',
                    borderTopWidth: 1,
                    borderTopColor: '#f1f1f1',
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                    elevation: 4,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.03,
                    shadowRadius: 8,
                },
                tabBarActiveTintColor: '#EA580C',
                tabBarInactiveTintColor: '#94A3B8',
            }}
        >
            {/* Home Tab */}
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused, color }) =>
                        focused ? (
                            <SolidIcons.HomeIcon size={24} color={color} />
                        ) : (
                            <OutlineIcons.HomeIcon size={24} color={color} />
                        ),
                }}
            />
            {/* Uncomment other tabs when the screens are ready */}
            {/* <Tab.Screen
                name="Booking"
                component={BookingScreen}
                options={{
                    tabBarIcon: ({ focused, color }) =>
                        focused ? (
                            <SolidIcons.BookmarkIcon size={24} color={color} />
                        ) : (
                            <OutlineIcons.BookmarkIcon size={24} color={color} />
                        ),
                }}
            />
            <Tab.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    tabBarIcon: ({ focused, color }) =>
                        focused ? (
                            <SolidIcons.ChatBubbleLeftIcon size={24} color={color} />
                        ) : (
                            <OutlineIcons.ChatBubbleLeftIcon size={24} color={color} />
                        ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused, color }) =>
                        focused ? (
                            <SolidIcons.UserIcon size={24} color={color} />
                        ) : (
                            <OutlineIcons.UserIcon size={24} color={color} />
                        ),
                }}
            /> */}
        </Tab.Navigator>
    );
}
