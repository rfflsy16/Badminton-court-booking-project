import { FlatList, StyleSheet } from "react-native";
import ChatItem from "./ChatItem";

export default function ChatList({ chats, onChatPress }) {
    return (
        <FlatList
            data={chats}
            renderItem={({ item }) => (
                <ChatItem 
                    chat={item} 
                    onPress={() => onChatPress(item._id, item.courtId, item.participants)}
                />
            )}
            keyExtractor={item => `chat-${item._id}-${item.courtId}`}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 20,
    },
});