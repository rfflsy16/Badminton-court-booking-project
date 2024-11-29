import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as OutlineIcons from 'react-native-heroicons/outline';
import * as SolidIcons from 'react-native-heroicons/solid';
import Home from '../screens/Home';
import Booking from '../screens/Booking';
import Chat from '../screens/Chat';
import Profile from '../screens/Profile';
import AvailableCourts from '../screens/AvailableCourts';


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
                    height: 85,
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
            <Tab.Screen
                name="Courts"
                component={AvailableCourts}
                options={{
                    tabBarIcon: ({ focused, color }) =>
                        focused ? (
                            <SolidIcons.HomeIcon size={24} color={color} />
                        ) : (
                            <OutlineIcons.HomeIcon size={24} color={color} />
                        ),
                }}
            />
            <Tab.Screen
                name="Booking"
                component={Booking}
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
                component={Chat}
                options={{
                    tabBarIcon: ({ focused, color }) =>
                        focused ? (
                            <SolidIcons.ChatBubbleOvalLeftEllipsisIcon size={24} color={color} />
                        ) : (
                            <OutlineIcons.ChatBubbleOvalLeftEllipsisIcon size={24} color={color} />
                        ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused, color }) =>
                        focused ? (
                            <SolidIcons.UserCircleIcon size={24} color={color} />
                        ) : (
                            <OutlineIcons.UserCircleIcon size={24} color={color} />
                        ),
                }}
            />

        </Tab.Navigator>
    );
}
