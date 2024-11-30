import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function AvailableTimeSlots() {
    const timeSlots = ['09:00', '10:00', '13:00', '15:00'];

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Available Slots</Text>
            <View style={styles.slotsContainer}>
                {timeSlots.map((time, index) => (
                    <TouchableOpacity key={index} style={styles.timeSlot}>
                        <Text style={styles.timeText}>{time}</Text>
                        <Text style={styles.availableText}>Available</Text>
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
    slotsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    timeSlot: {
        width: '48%',
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        alignItems: 'center',
    },
    timeText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    availableText: {
        fontSize: 14,
        color: '#EA580C',
        marginTop: 4,
    },
});
