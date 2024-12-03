import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function CourtTimeSlots({ 
    selectedDate, 
    selectedTimes, 
    onTimeSelect, 
    timeSlots,
    isDateExcluded 
}) {
    if (!selectedDate) {
        return (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Select Time</Text>
                <Text style={styles.noDateText}>Please select a date first</Text>
            </View>
        );
    }

    if (isDateExcluded) {
        return (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Select Time</Text>
                <Text style={styles.noDateText}>This date is not available for booking</Text>
            </View>
        );
    }

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Time</Text>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.timeSlotsContainer}
            >
                {timeSlots.map((slot) => {
                    const isSelected = selectedTimes.includes(slot.id);
                    
                    return (
                        <TouchableOpacity
                            key={slot.id}
                            style={[
                                styles.timeSlot,
                                isSelected && styles.selectedTimeSlot,
                                !slot.available && styles.unavailableTimeSlot
                            ]}
                            onPress={() => slot.available && onTimeSelect(slot.id)}
                            disabled={!slot.available}
                        >
                            <Text style={[
                                styles.timeText,
                                isSelected && styles.selectedTimeText,
                                !slot.available && styles.unavailableTimeText
                            ]}>
                                {slot.time}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 16,
        letterSpacing: 0.5,
    },
    noDateText: {
        fontSize: 14,
        color: '#64748B',
        fontStyle: 'italic',
    },
    timeSlotsContainer: {
        flexDirection: 'row',
    },
    timeSlot: {
        width: 80,
        height: 40,
        backgroundColor: '#F8FAFC',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    selectedTimeSlot: {
        backgroundColor: '#E11D48',
    },
    unavailableTimeSlot: {
        backgroundColor: '#E5E7EB',
        opacity: 0.5,
    },
    timeText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
    },
    selectedTimeText: {
        color: '#fff',
    },
    unavailableTimeText: {
        color: '#9CA3AF',
    },
});