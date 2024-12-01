import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Invoice({ route }) {
    console.log('Route params:', route.params);
    const navigation = useNavigation();
    const { item } = route.params;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text style={styles.title}>Invoice</Text>
                <TouchableOpacity style={styles.shareButton}>
                    <Ionicons name="share-outline" size={24} color="#1F2937" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                {/* Invoice Header */}
                <View style={styles.invoiceHeader}>
                    <Text style={styles.invoiceNo}>Invoice #{item.id}</Text>
                    <Text style={styles.date}>{item.date}</Text>
                </View>

                {/* Venue Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Venue Info</Text>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Venue Name</Text>
                        <Text style={styles.value}>{item.venueName}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Court Number</Text>
                        <Text style={styles.value}>{item.courtNumber}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Location</Text>
                        <Text style={styles.value}>{item.location}</Text>
                    </View>
                </View>

                {/* Booking Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Booking Details</Text>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Date</Text>
                        <Text style={styles.value}>{item.date}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Time</Text>
                        <Text style={styles.value}>{item.time}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Duration</Text>
                        <Text style={styles.value}>2 Hours</Text>
                    </View>
                </View>

                {/* Payment Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Details</Text>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Court Price</Text>
                        <Text style={styles.value}>{item.price}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Service Fee</Text>
                        <Text style={styles.value}>Rp 5.000</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.infoItem}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>{item.price}</Text>
                    </View>
                </View>

                {/* Payment Status */}
                <View style={[styles.statusSection, { backgroundColor: item.status.toLowerCase() === 'paid' ? '#DCFCE7' : '#FEF9C3' }]}>
                    <Text style={[styles.statusText, { color: item.status.toLowerCase() === 'paid' ? '#22C55E' : '#EAB308' }]}>
                        {item.status}
                    </Text>
                </View>
            </ScrollView>
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
        paddingTop: 16,
        paddingBottom: 12,
    },
    backButton: {
        padding: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1F2937',
    },
    shareButton: {
        padding: 8,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    invoiceHeader: {
        marginBottom: 24,
    },
    invoiceNo: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 4,
    },
    date: {
        fontSize: 14,
        color: '#64748B',
    },
    section: {
        marginBottom: 24,
        backgroundColor: '#F8FAFC',
        padding: 16,
        borderRadius: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 12,
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        color: '#64748B',
    },
    value: {
        fontSize: 14,
        color: '#1F2937',
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#E2E8F0',
        marginVertical: 8,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    totalValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#EA580C',
    },
    statusSection: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 24,
    },
    statusText: {
        fontSize: 16,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
});