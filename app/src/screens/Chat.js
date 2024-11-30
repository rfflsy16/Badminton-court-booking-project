import React, { useState, useCallback } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Platform,
    KeyboardAvoidingView,
    SafeAreaView,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const { width } = Dimensions.get('window');

export default function Chat() {
    const [messages, setMessages] = useState([
        {
            _id: 1,
            text: 'Hello developer jsdnsj',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'GiftedChat',
                avatar: 'https://cdn-icons-png.flaticon.com/512/8686/8686332.png',
            },
        },
    ]);

    const onSend = useCallback((newMessages = []) => {
        setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 44 : 0}
            >
                <GiftedChat
                    messages={messages}
                    onSend={onSend}
                    user={{
                        _id: 1,
                    }}
                    alwaysShowSend
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
});
