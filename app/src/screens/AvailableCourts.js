import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Modal,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

const courts = [
    {
        id: '1',
        name: 'Shuttle Arena',
        image: 'https://via.placeholder.com/150',
        price: 'Rp 150.000/jam',
        rating: 4.8,
        experience: '5 Years',
        availability: 'Available Now',
    },
    {
        id: '2',
        name: 'Smash Court',
        image: 'https://via.placeholder.com/150',
        price: 'Rp 200.000/jam',
        rating: 4.9,
        experience: '6 Years',
        availability: 'Available Now',
    },
];

const availableTimes = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'];

export default function AvailableCourts() {
    // console.log("masuk sini")
    const [selectedCourt, setSelectedCourt] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const openModal = (court) => {
        setSelectedCourt(court);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedCourt(null);
        setModalVisible(false);
        setSelectedDate('');
        setSelectedTime('');
    };

    const renderCourt = ({ item }) => (
        <TouchableOpacity style={styles.courtCard} onPress={() => openModal(item)}>
            <Image source={{ uri: item.image }} style={styles.courtImage} />
            <View style={styles.courtInfo}>
                <Text style={styles.courtName}>{item.name}</Text>
                <Text style={styles.courtExperience}>{item.experience} of Experience</Text>
                <Text style={styles.courtPrice}>{item.price}</Text>
            </View>
            <View style={styles.courtRating}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={courts}
                renderItem={renderCourt}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
            {selectedCourt && (
                <Modal
                    visible={isModalVisible}
                    transparent
                    animationType="slide"
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Image source={{ uri: selectedCourt.image }} style={styles.modalImage} />
                            <Text style={styles.modalName}>{selectedCourt.name}</Text>
                            <Text style={styles.modalPrice}>{selectedCourt.price}</Text>
                            <Text style={styles.modalAvailability}>{selectedCourt.availability}</Text>

                            {/* Calendar */}
                            <Text style={styles.sectionTitle}>Select Date</Text>
                            <Calendar
                                onDayPress={(day) => setSelectedDate(day.dateString)}
                                markedDates={{
                                    [selectedDate]: { selected: true, selectedColor: '#1e3c72' },
                                }}
                                theme={{
                                    selectedDayBackgroundColor: '#1e3c72',
                                    todayTextColor: '#EA580C',
                                }}
                            />

                            {/* Time Selection */}
                            <Text style={styles.sectionTitle}>Select Time</Text>
                            <FlatList
                                data={availableTimes}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.timeContainer}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[
                                            styles.timeSlot,
                                            selectedTime === item && styles.timeSlotSelected,
                                        ]}
                                        onPress={() => setSelectedTime(item)}
                                    >
                                        <Text
                                            style={[
                                                styles.timeSlotText,
                                                selectedTime === item && styles.timeSlotTextSelected,
                                            ]}
                                        >
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />

                            <TouchableOpacity
                                style={styles.proceedButton}
                                onPress={() => {
                                    alert(`Booked for ${selectedDate} at ${selectedTime}`);
                                    closeModal();
                                }}
                                disabled={!selectedDate || !selectedTime}
                            >
                                <Text style={styles.proceedButtonText}>
                                    Confirm Booking
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    listContainer: {
        paddingBottom: 20,
    },
    courtCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    courtImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    courtInfo: {
        flex: 1,
        marginLeft: 12,
    },
    courtName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    courtExperience: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    courtPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#EA580C',
        marginBottom: 8,
    },
    courtRating: {
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 14,
        color: '#333',
        marginLeft: 4,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    modalImage: {
        width: 150,
        height: 150,
        borderRadius: 8,
        marginBottom: 12,
    },
    modalName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    modalPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#EA580C',
        marginBottom: 12,
    },
    modalAvailability: {
        fontSize: 14,
        color: 'green',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    timeContainer: {
        marginBottom: 20,
    },
    timeSlot: {
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    timeSlotSelected: {
        backgroundColor: '#1e3c72',
    },
    timeSlotText: {
        fontSize: 14,
        color: '#333',
    },
    timeSlotTextSelected: {
        color: '#fff',
    },
    proceedButton: {
        backgroundColor: '#1e3c72',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginBottom: 10,
    },
    proceedButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    closeButton: {
        paddingVertical: 8,
    },
    closeButtonText: {
        fontSize: 14,
        color: '#333',
    },
});
