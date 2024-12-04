import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export default function ChatItem({ chat, onPress }) {
    const [lastMessage, setLastMessage] = useState("");
    const [userToken, setUserToken] = useState("");

    useEffect(() => {
        getToken();
    }, []);

    useFocusEffect(
        useCallback(() => {
            const loadMessage = async () => {
                if (userToken) {
                    await fetchLastMessage();
                }
            };
            loadMessage();
        }, [userToken, chat._id])
    );

    async function getToken() {
        try {
            const token = await SecureStore.getItemAsync('userToken');
            if (token) {
                setUserToken(token);
            } else {
                console.log("No token found");
            }
        } catch (error) {
            console.error("Error retrieving token:", error);
        }
    }

    const fetchLastMessage = async () => {
        try {
            if (!userToken) {
                console.log("No token available for request");
                return;
            }

            const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/message/${chat._id}`, {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data && response.data.messages && response.data.messages.length > 0) {
                setLastMessage(response.data.messages[0]?.text);
            }
        } catch (error) {
            if (error.response?.status === 401) {
                console.log("Token expired or invalid, attempting to refresh...");
                await getToken();
            } else {
                console.error("Error fetching last message:", error);
            }
        }
    };

    return (
        <TouchableOpacity style={styles.chatItem} onPress={onPress}>
            <Image source={{ uri: "https://lh4.googleusercontent.com/proxy/ElNJBofC5Bx_BPHcyLtNKL6tb90TKY0O1RzSW4i8UB7ZzuVGqitPVR43wJbwCxCPwaNPCTmNhsp3PTEXaza1NivZS2LdfGHBqqDfmInrTtO_K1g8" }} style={styles.avatar} />
            <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                    <Text style={styles.chatName}>{chat.courtDetails.buildingDetails.name} - {chat.name.split(' ')[1]}</Text>
                    <Text style={styles.chatTime}>{new Date(chat.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit' })} </Text>
                </View>
                <View style={styles.chatFooter}>
                    <Text style={styles.lastMessage} numberOfLines={1}>
                        {lastMessage || "No messages yet"}
                    </Text>
                    {chat.unread > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadText}>{chat.unread}</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    chatContent: {
        flex: 1,
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    chatName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    chatTime: {
        fontSize: 12,
        color: '#94A3B8',
    },
    chatFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lastMessage: {
        flex: 1,
        fontSize: 14,
        color: '#64748B',
        marginRight: 8,
    },
    unreadBadge: {
        backgroundColor: '#EA580C',
        borderRadius: 12,
        minWidth: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    unreadText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
});