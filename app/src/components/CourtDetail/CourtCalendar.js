import { View, Text, StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars'

export default function CourtCalendar({ selectedDate, onDateSelect }) {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0]

    // Calculate min and max dates (today to 3 months from now)
    const maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + 3)
    const maxDateStr = maxDate.toISOString().split('T')[0]

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Date</Text>
            <Calendar
                minDate={today}
                maxDate={maxDateStr}
                onDayPress={day => onDateSelect(day.dateString)}
                markedDates={{
                    [selectedDate]: {
                        selected: true,
                        selectedColor: '#EA580C',
                    }
                }}
                theme={{
                    todayTextColor: '#EA580C',
                    selectedDayBackgroundColor: '#EA580C',
                    selectedDayTextColor: '#ffffff',
                    textDayFontWeight: '500',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '500',
                    textDayFontSize: 14,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 14,
                }}
                style={styles.calendar}
            />
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
    calendar: {
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        backgroundColor: '#fff',
        padding: 8,
    },
})