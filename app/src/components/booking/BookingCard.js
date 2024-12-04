import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BookingCard({ item }) {
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Today':
                return {
                    backgroundColor: '#4ADE8020',  // Bright green with opacity
                    textColor: '#4ADE80'  // Bright green
                };
            case 'Upcoming':
                return {
                    backgroundColor: '#FBBF2420',  // Yellow with opacity
                    textColor: '#FBBF24'  // Yellow
                };
            case 'Expired':
                return {
                    backgroundColor: '#EF444420',  // Bright red with opacity
                    textColor: '#EF4444'  // Bright red
                };
            default:
                return {
                    backgroundColor: '#F3F4F6',
                    textColor: '#6B7280'
                };
        }
    };

    const statusStyle = getStatusStyle(item.status);

    return (
        <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <View>
                        <Text style={styles.venueName}>{item.venueName}</Text>
                        <View style={styles.courtIdContainer}>
                            <Ionicons name="card-outline" size={14} color="#94A3B8" />
                            <Text style={styles.courtId}>ID: {item._id}</Text>
                        </View>
                        <View style={styles.courtTypeContainer}>
                            <Ionicons name="basketball-outline" size={14} color="#94A3B8" />
                            <Text style={styles.courtNumber}>{item.courtNumber}</Text>
                        </View>
                    </View>
                    <View style={[styles.statusBadge, 
                        { backgroundColor: statusStyle.backgroundColor }
                    ]}>
                        <Text style={[styles.statusText, 
                            { color: statusStyle.textColor }
                        ]}>{item.status}</Text>
                    </View>
                </View>
                <View style={styles.bookingDetails}>
                    <View style={styles.detailItem}>
                        <Ionicons name="location-outline" size={16} color="#94A3B8" />
                        <Text style={styles.detailText}>{item.location}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Ionicons name="calendar-outline" size={16} color="#94A3B8" />
                        <Text style={styles.detailText}>{item.date}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Ionicons name="time-outline" size={16} color="#94A3B8" />
                        <Text style={styles.detailText}>{item.time}</Text>
                    </View>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={[styles.price, { color: '#E11D48' }]}>{item.price}</Text>
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
    venueName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    courtIdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    courtTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    courtId: {
        fontSize: 12,
        color: '#94A3B8',
        marginLeft: 4,
        fontFamily: 'monospace',
    },
    courtNumber: {
        fontSize: 14,
        color: '#64748B',
        marginLeft: 4,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
    },
    bookingDetails: {
        marginBottom: 12,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
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
        color: '#E11D48',
    },
});
