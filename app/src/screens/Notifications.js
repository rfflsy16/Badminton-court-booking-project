import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Notifications() {
    const navigation = useNavigation();
    
    const notifications = [
        {
            id: '1',
            title: 'Booking Confirmed! 🎉',
            message: 'Your court booking for tomorrow at 15:00 has been confirmed',
            time: '2 hours ago',
            isRead: false
        },
        {
            id: '2',
            title: 'Payment Successful 💰',
            message: 'Payment for court booking has been processed successfully',
            time: '5 hours ago',
            isRead: true
        },
        {
            id: '3',
            title: 'Special Offer! 🔥',
            message: 'Get 20% off on your next booking this weekend',
            time: '1 day ago',
            isRead: true
        }
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={[
                styles.notificationItem,
                !item.isRead && styles.unreadItem
            ]}
        >
            <View style={styles.notificationContent}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.message}>{item.message}</Text>
                <Text style={styles.time}>{item.time}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <View style={styles.placeholder} />
            </View>
            
            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    placeholder: {
        width: 40,
    },
    listContainer: {
        padding: 16,
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    unreadItem: {
        backgroundColor: '#F8FAFC',
        borderColor: '#E2E8F0',
    },
    notificationContent: {
        flex: 1,
        marginRight: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    message: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 8,
    },
    time: {
        fontSize: 12,
        color: '#94A3B8',
    },
});
