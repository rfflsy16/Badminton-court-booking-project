import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function TransactionCard({ item }) {
    const navigation = useNavigation();

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'paid':
                return '#22C55E';
            case 'ongoing':
                return '#EAB308';
            case 'cancelled':
                return '#EF4444';
            default:
                return '#94A3B8';
        }
    };

    return (
        <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('Invoice', { item })}
        >
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.venueName}>{item.venueName}</Text>
                        <Text style={styles.courtNumber}>{item.courtNumber}</Text>
                    </View>
                    <View style={[styles.statusContainer, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                        <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                            {item.status}
                        </Text>
                    </View>
                </View>
                <View style={styles.locationContainer}>
                    <Ionicons name="location-outline" size={16} color="#94A3B8" />
                    <Text style={styles.locationText}>{item.location}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.dateTimeContainer}>
                        <Ionicons name="calendar-outline" size={16} color="#94A3B8" />
                        <Text style={styles.detailText}>{item.date}</Text>
                    </View>
                    <View style={styles.dateTimeContainer}>
                        <Ionicons name="time-outline" size={16} color="#94A3B8" />
                        <Text style={styles.detailText}>{item.time}</Text>
                    </View>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{item.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    cardImage: {
        width: '100%',
        height: 160,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    cardContent: {
        padding: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    headerLeft: {
        flex: 1,
        marginRight: 12,
    },
    venueName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    courtNumber: {
        fontSize: 14,
        color: '#64748B',
    },
    statusContainer: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    locationText: {
        marginLeft: 4,
        fontSize: 14,
        color: '#94A3B8',
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    dateTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        marginLeft: 4,
        fontSize: 14,
        color: '#64748B',
    },
    priceContainer: {
        marginTop: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        color: '#EA580C',
    },
});
