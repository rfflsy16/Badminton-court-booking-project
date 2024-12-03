import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { format, addDays, isSameDay } from 'date-fns';

export default function CourtCalendar({ selectedDate, onDateSelect, excludedDates }) {
    const dates = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));

    const isExcludedDate = (date) => {
        return excludedDates.includes(format(date, 'yyyy-MM-dd'));
    };

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Date</Text>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.datesContainer}
            >
                {dates.map((date) => {
                    const formattedDate = format(date, 'yyyy-MM-dd');
                    const isSelected = selectedDate === formattedDate;
                    const isExcluded = isExcludedDate(date);

                    return (
                        <TouchableOpacity
                            key={formattedDate}
                            style={[
                                styles.dateButton,
                                isSelected && styles.selectedDate,
                                isExcluded && styles.excludedDate
                            ]}
                            onPress={() => !isExcluded && onDateSelect(formattedDate)}
                            disabled={isExcluded}
                        >
                            <Text style={[
                                styles.dayName,
                                isSelected && styles.selectedText,
                                isExcluded && styles.excludedText
                            ]}>
                                {format(date, 'EEE')}
                            </Text>
                            <Text style={[
                                styles.dayNumber,
                                isSelected && styles.selectedText,
                                isExcluded && styles.excludedText
                            ]}>
                                {format(date, 'd')}
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
    datesContainer: {
        flexDirection: 'row',
    },
    dateButton: {
        width: 56,
        height: 72,
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    selectedDate: {
        backgroundColor: '#E11D48',
    },
    excludedDate: {
        backgroundColor: '#E5E7EB',
        opacity: 0.5,
    },
    dayName: {
        fontSize: 13,
        color: '#64748B',
        marginBottom: 4,
        fontWeight: '500',
    },
    dayNumber: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    selectedText: {
        color: '#fff',
    },
    excludedText: {
        color: '#9CA3AF',
    },
});