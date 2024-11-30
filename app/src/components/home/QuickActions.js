import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function QuickActions() {
    const actions = [
        { icon: 'calendar-outline', label: 'Book Court' },
        { icon: 'time-outline', label: 'My Bookings' },
        { icon: 'star-outline', label: 'Favorites' },
        { icon: 'help-circle-outline', label: 'Help' },
    ];

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionContainer}>
                {actions.map((action, index) => (
                    <TouchableOpacity key={index} style={styles.actionButton}>
                        <View style={styles.actionIcon}>
                            <Ionicons name={action.icon} size={24} color="#EA580C" />
                        </View>
                        <Text style={styles.actionLabel}>{action.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 16,
    },
    actionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    actionButton: {
        width: '48%',
        padding: 16,
        marginBottom: 16,
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        alignItems: 'center',
    },
    actionIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFF1E6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    actionLabel: {
        fontSize: 14,
        color: '#1F2937',
        fontWeight: '500',
    },
});
