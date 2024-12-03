import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { useState, useEffect } from "react";
import { useChat } from '../context/ChatContext';
import Header from "../components/chat/Header";
import SearchBar from "../components/chat/SearchBar";
import ChatList from "../components/chat/ChatList";

export default function Chat({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const { chats, loadRooms, loading } = useChat();

    useEffect(() => {
        loadRooms();
    }, []);

    const handleChatPress = (chatId) => {
        navigation.navigate('ChatDetail', { roomId: chatId });
    };

    const filteredChats = chats.filter(chat =>
        chat.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color="#115E59" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header />
            {chats.length > 0 ? (
                <>
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                    <ChatList
                        chats={filteredChats}
                        onChatPress={handleChatPress}
                    />
                </>
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>No Chats Yet</Text>
                    <Text style={styles.emptyText}>
                        Your chat conversations with court owners will appear here
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 16,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 24,
    }
});
