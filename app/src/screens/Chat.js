import { View, StyleSheet } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useChat } from '../context/ChatContext';
import Header from "../components/chat/Header";
import SearchBar from "../components/chat/SearchBar";
import ChatList from "../components/chat/ChatList";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


export default function Chat() {
    const [searchQuery, setSearchQuery] = useState('');
    const { chatData: chats, markAsRead, updateUnreadCount } = useChat();
    const [roomChatList, setRoomChatList] = useState([]);
    const [userToken, setUserToken] = useState("");
    const [myProfile, setMyProfile] = useState({});
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            getRoomChatList()
            getUserInfo()            
        }, [userToken])
    );

    useEffect(() => {
        const getToken = async () => {
            const token = await SecureStore.getItemAsync('userToken');
            setUserToken(token);
        };
        getToken();
    }, []);

    async function getUserInfo() {
        const profile = await SecureStore.getItemAsync('userInfo');
        if (profile) {
            setMyProfile(JSON.parse(profile));
        }
    }

    const getRoomChatList = async () => {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/room`,{
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            setRoomChatList(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        updateUnreadCount();
    }, []);

   
    const handleChatPress = (roomId, courtId, participants) => {
        const adminId = participants.find(participant => participant !== myProfile.userId);
        navigation.navigate('ChatDetail', {
            roomId,
            courtId,
            name: "Chatroom",
            adminId
        });     
    };    

    const filteredChats = roomChatList.filter(chat =>
        chat.courtDetails.buildingDetails.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <Header />
            <SearchBar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <ChatList 
                chats={filteredChats}
                onChatPress={handleChatPress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});