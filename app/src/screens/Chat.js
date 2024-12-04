import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useChat } from '../context/ChatContext';
import Header from "../components/chat/Header";
import SearchBar from "../components/chat/SearchBar";
import ChatList from "../components/chat/ChatList";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


export default function Chat({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const { chatData: chats, markAsRead, updateUnreadCount } = useChat();
    const [roomChatList, setRoomChatList] = useState([]);
    const [userToken, setUserToken] = useState("");

    useEffect(() => {
        const getToken = async () => {
            const token = await SecureStore.getItemAsync('userToken');
            setUserToken(token);
        };
        getToken();
    }, []);

    useEffect(() => {
        getRoomChatList()
    },[userToken])

    const getRoomChatList = async () => {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/room`,{
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            console.log("Room Chat List Response:", response.data)
            setRoomChatList(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        updateUnreadCount();
    }, []);

   
    const handleChatPress = (roomId) => {
        console.log("Room ID received:", roomId);
        console.log("Current roomChatList:", roomChatList);
        const selectedChat = roomChatList.find(chat => {
            console.log("Comparing:", chat._id, roomId);
            return chat._id === roomId;
        });
        // console.log("Selected Chat:", selectedChat);
        // console.log(selectedChat, "<<<<< selected chat")
        // navigation.navigate('ChatDetail', {
        //     courtId: selectedChat.courtId,
        //     name: selectedChat.courtDetails.buildingDetails.name,
        //     adminId: selectedChat.courtDetails.buildingDetails.userId 
        // });
    };

    // console.log(roomChatList, "<<<<< room chat list")
    

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <Header />
            <SearchBar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <ChatList 
                chats={roomChatList}
                key={roomChatList._id}
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