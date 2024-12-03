import { FlatList, StyleSheet, View, Text } from "react-native";
import ChatItem from "./ChatItem";

export default function ChatList({ chats, onChatPress }) {
    if (!chats || chats.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No chats yet</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={chats}
            renderItem={({ item }) => (
                <ChatItem 
                    chat={item} 
                    onPress={() => onChatPress(item._id)}
                />
            )}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 20,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 16,
        color: '#94A3B8',
    },
});
