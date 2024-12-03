import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ChatItem({ chat, onPress }) {
    const lastMessage = chat.lastMessage || 'No messages yet';
    const time = chat.lastMessageTime 
        ? new Date(chat.lastMessageTime).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        }) 
        : '';

    return (
        <TouchableOpacity style={styles.chatItem} onPress={onPress}>
            <View style={styles.avatar}>
                <Ionicons name="person" size={24} color="#fff" />
            </View>
            <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                    <Text style={styles.chatName} numberOfLines={1}>
                        {chat.name}
                    </Text>
                    {time && <Text style={styles.chatTime}>{time}</Text>}
                </View>
                <View style={styles.chatFooter}>
                    <Text style={styles.lastMessage} numberOfLines={1}>
                        {lastMessage}
                    </Text>
                    {chat.unreadCount > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadText}>{chat.unreadCount}</Text>
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
        borderBottomColor: '#E2E8F0',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#115E59',
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor: '#115E59',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    unreadText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
});
