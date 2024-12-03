import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'

export default function CourtTimeSlots({ selectedDate, selectedTimes, onTimeSelect, timeSlots }) {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Time Slots</Text>
            {selectedDate ? (
                <>
                    <Text style={styles.timeSlotHint}>Select your preferred time slots</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.timeSlotContainer}>
                            {timeSlots.map((slot) => (
                                <TouchableOpacity
                                    key={slot.id}
                                    style={[
                                        styles.timeSlot,
                                        !slot.available && styles.timeSlotUnavailable,
                                        selectedTimes.includes(slot.id) && styles.timeSlotSelected
                                    ]}
                                    disabled={!slot.available}
                                    onPress={() => onTimeSelect(slot.id)}
                                >
                                    <Text style={[
                                        styles.timeSlotText,
                                        !slot.available && styles.timeSlotTextUnavailable,
                                        selectedTimes.includes(slot.id) && styles.timeSlotTextSelected
                                    ]}>{slot.time}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                    {selectedTimes.length > 0 && (
                        <View style={styles.selectedTimesContainer}>
                            <Text style={styles.selectedTimesText}>
                                Selected times: {timeSlots
                                    .filter(slot => selectedTimes.includes(slot.id))
                                    .map(slot => slot.time)
                                    .join(', ')}
                            </Text>
                        </View>
                    )}
                </>
            ) : (
                <Text style={styles.selectDateHint}>Please select a date first</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 24,
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 16,
        letterSpacing: 0.5,
    },
    timeSlotContainer: {
        flexDirection: 'row',
        paddingBottom: 8,
    },
    timeSlot: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        marginRight: 12,
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
    },
    timeSlotSelected: {
        backgroundColor: '#EA580C',
        borderColor: '#EA580C',
    },
    timeSlotUnavailable: {
        backgroundColor: '#F1F5F9',
        borderColor: '#E2E8F0',
        opacity: 0.6,
    },
    timeSlotText: {
        fontSize: 15,
        color: '#1F2937',
        fontWeight: '600',
    },
    timeSlotTextSelected: {
        color: '#fff',
    },
    timeSlotTextUnavailable: {
        color: '#94A3B8',
    },
    timeSlotHint: {
        fontSize: 13,
        color: '#64748B',
        marginBottom: 12,
        fontStyle: 'italic',
    },
    selectedTimesContainer: {
        marginTop: 12,
        padding: 12,
        backgroundColor: '#F1F5F9',
        borderRadius: 8,
    },
    selectedTimesText: {
        fontSize: 14,
        color: '#1F2937',
        fontWeight: '500',
    },
    selectDateHint: {
        textAlign: 'center',
        fontSize: 15,
        color: '#64748B',
        fontStyle: 'italic',
    },
})