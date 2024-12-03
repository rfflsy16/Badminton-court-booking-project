import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useChat } from '../context/ChatContext';
import Header from "../components/chat/Header";
import SearchBar from "../components/chat/SearchBar";
import ChatList from "../components/chat/ChatList";

export default function Chat({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const { chatData: chats, markAsRead, updateUnreadCount } = useChat();

    useEffect(() => {
        updateUnreadCount();
    }, []);

    const handleChatPress = (chatId) => {
        const chat = chats.find(c => c.id === chatId);
        markAsRead(chatId);
        navigation.navigate('ChatDetail', {
            chatId,
            name: chat.name
        });
    };

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