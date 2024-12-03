import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useChat } from '../context/ChatContext';
import * as SecureStore from 'expo-secure-store';

const MessageBubble = ({ message, isUser }) => {
    const time = new Date(message.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    return (
        <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.otherBubble]}>
            <Text style={[styles.messageText, isUser ? styles.userText : styles.otherText]}>
                {message.text}
            </Text>
            <Text style={[styles.timeText, isUser ? styles.userTime : styles.otherTime]}>
                {time}
            </Text>
        </View>
    );
};

export default function ChatDetail({ route }) {
    const navigation = useNavigation();
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { roomId, name } = route.params;
    const flatListRef = useRef(null);
    const { messages, sendMessage, loadMessages, joinRoom } = useChat();
    const roomMessages = messages[roomId] || [];

    useEffect(() => {
        const setup = async () => {
            try {
                const userInfo = await SecureStore.getItemAsync('userInfo');
                if (userInfo) {
                    const { userId: id } = JSON.parse(userInfo);
                    setUserId(id);
                }
                
                await loadMessages(roomId);
                joinRoom(roomId);
            } catch (error) {
                console.error('Setup error:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        setup();

        // Refresh messages periodically
        const interval = setInterval(() => {
            loadMessages(roomId);
        }, 5000);

        return () => clearInterval(interval);
    }, [roomId, loadMessages, joinRoom]);

    // Scroll to bottom when new messages arrive
    useEffect(() => {
        if (flatListRef.current && roomMessages.length > 0) {
            setTimeout(() => {
                flatListRef.current.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [roomMessages]);

    const handleSend = async () => {
        if (!message.trim()) return;
        
        try {
            await sendMessage(roomId, message.trim());
            setMessage('');
            // Scroll to bottom after sending
            if (flatListRef.current) {
                flatListRef.current.scrollToEnd({ animated: true });
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate('MainApp', { screen: 'Chat' });
        }
    };

    if (isLoading) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color="#115E59" />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#115E59" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{name}</Text>
            </View>

            <FlatList
                ref={flatListRef}
                data={roomMessages}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <MessageBubble 
                        message={item} 
                        isUser={item.userId === userId}
                    />
                )}
                contentContainerStyle={styles.messageList}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type a message..."
                    multiline
                />
                <TouchableOpacity 
                    onPress={handleSend}
                    style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
                    disabled={!message.trim()}
                >
                    <Ionicons 
                        name="send" 
                        size={24} 
                        color={message.trim() ? "#115E59" : "#A8A8A8"}
                    />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        backgroundColor: '#fff',
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#115E59',
    },
    messageList: {
        padding: 16,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 16,
        marginVertical: 4,
    },
    userBubble: {
        backgroundColor: '#115E59',
        alignSelf: 'flex-end',
        borderBottomRightRadius: 4,
    },
    otherBubble: {
        backgroundColor: '#F3F4F6',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: 16,
        marginBottom: 4,
    },
    userText: {
        color: '#fff',
    },
    otherText: {
        color: '#000',
    },
    timeText: {
        fontSize: 12,
    },
    userTime: {
        color: '#E5E5E5',
    },
    otherTime: {
        color: '#6B7280',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        maxHeight: 100,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonDisabled: {
        opacity: 0.5,
    },
});
