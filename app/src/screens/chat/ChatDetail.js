import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MessageBubble = ({ message, isUser }) => (
    <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.otherBubble]}>
        <Text style={[styles.messageText, isUser ? styles.userText : styles.otherText]}>
            {message.text}
        </Text>
        <Text style={[styles.timeText, isUser ? styles.userTime : styles.otherTime]}>
            {message.time}
        </Text>
    </View>
);

export default function ChatDetail({ route }) {
    const navigation = useNavigation();
    const [message, setMessage] = useState('');
    const { chatId, name } = route.params;

    // Dummy messages data
    const messages = [
        { id: '1', text: 'Hi, I would like to book a court', time: '09:30', isUser: true },
        { id: '2', text: 'Sure! Which court are you interested in?', time: '09:31', isUser: false },
        { id: '3', text: 'Court A for tomorrow evening', time: '09:32', isUser: true },
        { id: '4', text: 'Let me check the availability', time: '09:33', isUser: false },
    ];

    const sendMessage = () => {
        if (message.trim().length > 0) {
            // Add message sending logic here
            setMessage('');
        }
    };

    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate('MainApp', { screen: 'Chat' });
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Ionicons name="arrow-back" size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{name}</Text>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerButton}>
                        <Ionicons name="call-outline" size={24} color="#1F2937" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerButton}>
                        <Ionicons name="videocam-outline" size={24} color="#1F2937" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.contentContainer}>
                <FlatList
                    data={messages}
                    renderItem={({ item }) => <MessageBubble message={item} isUser={item.isUser} />}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.messageList}
                    inverted
                />

                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.attachButton}>
                        <Ionicons name="attach" size={24} color="#64748B" />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Type a message..."
                        placeholderTextColor="#94A3B8"
                        multiline
                        maxHeight={80}
                        textAlignVertical="center"
                    />
                    <TouchableOpacity 
                        style={[styles.sendButton, message.trim().length > 0 && styles.sendButtonActive]}
                        onPress={sendMessage}
                    >
                        <Ionicons 
                            name="send" 
                            size={20} 
                            color={message.trim().length > 0 ? "#fff" : "#94A3B8"} 
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    headerTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginLeft: 16,
    },
    headerRight: {
        flexDirection: 'row',
    },
    headerButton: {
        marginLeft: 16,
    },
    messageList: {
        padding: 16,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 16,
        marginBottom: 8,
    },
    userBubble: {
        backgroundColor: '#EA580C',
        alignSelf: 'flex-end',
        borderTopRightRadius: 4,
    },
    otherBubble: {
        backgroundColor: '#F1F5F9',
        alignSelf: 'flex-start',
        borderTopLeftRadius: 4,
    },
    messageText: {
        fontSize: 16,
        marginBottom: 4,
    },
    userText: {
        color: '#fff',
    },
    otherText: {
        color: '#1F2937',
    },
    timeText: {
        fontSize: 12,
    },
    userTime: {
        color: 'rgba(255, 255, 255, 0.8)',
    },
    otherTime: {
        color: '#64748B',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        minHeight: 60,
        maxHeight: 100,
    },
    attachButton: {
        marginRight: 8,
        padding: 4,
    },
    input: {
        flex: 1,
        backgroundColor: '#F1F5F9',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        minHeight: 36,
        maxHeight: 80,
        color: '#1F2937',
        fontSize: 14,
    },
    sendButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    sendButtonActive: {
        backgroundColor: '#EA580C',
    },
});
