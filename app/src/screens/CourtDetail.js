import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, Modal, TextInput, PanResponder, Animated } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from "@expo/vector-icons";
import { useRoute, useNavigation } from '@react-navigation/native';
import { useState, useEffect, useRef } from 'react';
import { Calendar } from 'react-native-calendars';

export default function CourtDetail() {
    const route = useRoute();
    const navigation = useNavigation();
    const { court } = route.params;
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [paymentType, setPaymentType] = useState('full'); // 'full' or 'dp'
    const [promoCode, setPromoCode] = useState('');
    const [promoDiscount, setPromoDiscount] = useState(0);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isSwipeCompleted, setIsSwipeCompleted] = useState(false);
    const swipeAnim = useRef(new Animated.Value(0)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gesture) => {
                const { dx } = gesture;
                const maxSwipe = 280;
                if (dx >= 0 && dx <= maxSwipe) {
                    swipeAnim.setValue(dx);
                    progressAnim.setValue(dx / maxSwipe);
                }
            },
            onPanResponderRelease: (_, gesture) => {
                const { dx } = gesture;
                const maxSwipe = 280;
                if (dx >= maxSwipe * 0.7) {
                    Animated.parallel([
                        Animated.timing(swipeAnim, {
                            toValue: maxSwipe,
                            duration: 200,
                            useNativeDriver: true,
                        }),
                        Animated.timing(progressAnim, {
                            toValue: 1,
                            duration: 200,
                            useNativeDriver: false,
                        })
                    ]).start(() => {
                        setShowConfirmModal(false);
                        setShowPaymentModal(false);
                        navigation.navigate('MainApp');
                    });
                } else {
                    Animated.parallel([
                        Animated.spring(swipeAnim, {
                            toValue: 0,
                            useNativeDriver: true,
                        }),
                        Animated.spring(progressAnim, {
                            toValue: 0,
                            useNativeDriver: false,
                        })
                    ]).start();
                }
            },
        })
    ).current;

    const timeSlots = [
        { id: 1, time: '08:00', available: true },
        { id: 2, time: '09:00', available: false },
        { id: 3, time: '10:00', available: true },
        { id: 4, time: '11:00', available: true },
        { id: 5, time: '13:00', available: true },
        { id: 6, time: '14:00', available: false },
        { id: 7, time: '15:00', available: true },
        { id: 8, time: '16:00', available: true },
    ];

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Calculate min and max dates (today to 3 months from now)
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    const maxDateStr = maxDate.toISOString().split('T')[0];

    const handleTimeSelection = (slotId) => {
        setSelectedTimes(prev => {
            if (prev.includes(slotId)) {
                return prev.filter(id => id !== slotId);
            } else {
                return [...prev, slotId].sort((a, b) => a - b);
            }
        });
    };

    // Calculate total price whenever selected times change
    useEffect(() => {
        const pricePerHour = parseInt(court.price.replace(/[^0-9]/g, ''));
        const totalAmount = pricePerHour * selectedTimes.length;
        setTotalPrice(totalAmount);
    }, [selectedTimes, court.price]);

    const reviews = [
        { id: 1, user: 'John Doe', rating: 5, comment: 'Excellent court condition!', date: '2023-10-15' },
        { id: 2, user: 'Jane Smith', rating: 4, comment: 'Great facilities, but parking can be difficult', date: '2023-10-10' },
        { id: 3, user: 'Mike Johnson', rating: 5, comment: 'Professional setup, will come again', date: '2023-10-05' },
    ];

    const paymentMethods = [
        {
            id: 'ewallet',
            title: 'E-Wallet',
            options: [
                { id: 'gopay', name: 'GoPay', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/2560px-Gopay_logo.svg.png' },
                { id: 'ovo', name: 'OVO', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_ovo_purple.svg/2560px-Logo_ovo_purple.svg.png' },
                { id: 'dana', name: 'DANA', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/2560px-Logo_dana_blue.svg.png' },
            ]
        },
        {
            id: 'va',
            title: 'Virtual Account',
            options: [
                { id: 'bca', name: 'BCA Virtual Account', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png' },
                { id: 'bni', name: 'BNI Virtual Account', image: 'https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/2560px-BNI_logo.svg.png' },
                { id: 'mandiri', name: 'Mandiri Virtual Account', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/2560px-Bank_Mandiri_logo_2016.svg.png' },
            ]
        },
        {
            id: 'qris',
            title: 'QRIS',
            options: [
                { id: 'qris', name: 'QRIS', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/QRIS_logo.svg/2560px-QRIS_logo.svg.png' },
            ]
        }
    ];

    const handlePaymentSelect = (methodId, optionId) => {
        setSelectedPayment({ methodId, optionId });
    };

    const formatTimeSlot = (timeSlots, selectedIds) => {
        return selectedIds.map(id => {
            const slot = timeSlots.find(s => s.id === id);
            return slot.time;
        }).join(', ');
    };

    const getPaymentAmount = () => {
        if (paymentType === 'dp') {
            return totalPrice * 0.5; // 50% for DP
        }
        return totalPrice;
    };

    const validatePromoCode = () => {
        // Mock promo codes
        const promoCodes = {
            'FIRST10': 10,  // 10% discount
            'SAVE20': 20,   // 20% discount
            'SUPER30': 30   // 30% discount
        };

        const discount = promoCodes[promoCode.toUpperCase()] || 0;
        setPromoDiscount(discount);
    };

    const getFinalAmount = () => {
        const baseAmount = getPaymentAmount();
        const discountAmount = (baseAmount * promoDiscount) / 100;
        return baseAmount - discountAmount;
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Court Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: court.image }}
                        style={styles.courtImage}
                    />
                    <TouchableOpacity style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.imageOverlay}>
                        <View style={styles.badgeContainer}>
                            <Text style={styles.badge}>Premium</Text>
                        </View>
                    </View>
                </View>

                {/* Court Details */}
                <View style={styles.detailsContainer}>
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.courtName}>{court.name}</Text>
                            <View style={styles.locationContainer}>
                                <Ionicons name="location-outline" size={16} color="#64748B" />
                                <Text style={styles.locationText}>123 Sports Avenue, City</Text>
                            </View>
                        </View>
                        <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={20} color="#EA580C" />
                            <Text style={styles.rating}>{court.rating}</Text>
                            <Text style={styles.ratingCount}>(120)</Text>
                        </View>
                    </View>

                    <View style={styles.priceSection}>
                        <Text style={styles.price}>{court.price}</Text>
                        <Text style={styles.perHour}>/hour</Text>
                    </View>

                    {/* Calendar Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Select Date</Text>
                        <Calendar
                            minDate={today}
                            maxDate={maxDateStr}
                            onDayPress={day => setSelectedDate(day.dateString)}
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

                    {/* Time Slots */}
                    {selectedDate ? (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Available Time Slots</Text>
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
                                            onPress={() => handleTimeSelection(slot.id)}
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
                                        Selected times: {selectedTimes.map(id => {
                                            const slot = timeSlots.find(s => s.id === id);
                                            return slot.time;
                                        }).join(', ')}
                                    </Text>
                                </View>
                            )}
                        </View>
                    ) : (
                        <View style={styles.section}>
                            <Text style={styles.selectDateHint}>Please select a date first</Text>
                        </View>
                    )}

                    {/* Facilities */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Facilities</Text>
                        <View style={styles.facilitiesContainer}>
                            {[
                                { icon: 'wifi', label: 'Free WiFi', type: 'ion' },
                                { icon: 'car-sport', label: 'Parking', type: 'ion' },
                                { icon: 'water', label: 'Shower', type: 'font' },
                                { icon: 'fast-food', label: 'Cafeteria', type: 'ion' },
                                { icon: 'snowflake', label: 'AC', type: 'font' },
                                { icon: 'dumbbell', label: 'Gym', type: 'font' },
                                { icon: 'basketball', label: 'Sport Shop', type: 'ion' },
                                { icon: 'medical', label: 'First Aid', type: 'ion' }
                            ].map((facility, index) => (
                                <View key={index} style={styles.facilityItem}>
                                    {facility.type === 'ion' && <Ionicons name={facility.icon} size={24} color="#EA580C" />}
                                    {facility.type === 'material' && <MaterialIcons name={facility.icon} size={24} color="#EA580C" />}
                                    {facility.type === 'font' && <FontAwesome5 name={facility.icon} size={24} color="#EA580C" />}
                                    <Text style={styles.facilityLabel}>{facility.label}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Description */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.description}>
                            Experience top-quality badminton at our premium court. Featuring professional-grade flooring, 
                            excellent lighting, and climate control for your comfort. Perfect for both casual games and 
                            serious training sessions.
                        </Text>
                    </View>

                    {/* Reviews */}
                    <View style={styles.section}>
                        <View style={styles.reviewHeader}>
                            <Text style={styles.sectionTitle}>Reviews</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAll}>See all</Text>
                            </TouchableOpacity>
                        </View>
                        {reviews.map((review) => (
                            <View key={review.id} style={styles.reviewItem}>
                                <View style={styles.reviewHeader}>
                                    <Text style={styles.reviewUser}>{review.user}</Text>
                                    <View style={styles.reviewRating}>
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Ionicons key={i} name="star" size={14} color="#EA580C" />
                                        ))}
                                    </View>
                                </View>
                                <Text style={styles.reviewComment}>{review.comment}</Text>
                                <Text style={styles.reviewDate}>{review.date}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Button */}
            <View style={styles.bottomContainer}>
                <View style={styles.bottomContent}>
                    <View>
                        <Text style={styles.totalLabel}>Total Price ({selectedTimes.length} hours)</Text>
                        <Text style={styles.totalPrice}>Rp {totalPrice.toLocaleString()}</Text>
                    </View>
                    <TouchableOpacity 
                        style={[
                            styles.bookButton, 
                            (!selectedDate || selectedTimes.length === 0) && styles.bookButtonDisabled
                        ]}
                        disabled={!selectedDate || selectedTimes.length === 0}
                        onPress={() => setShowPaymentModal(true)}
                    >
                        <Text style={styles.bookButtonText}>Book Now</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Payment Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showPaymentModal}
                onRequestClose={() => setShowPaymentModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity 
                                style={styles.closeButton}
                                onPress={() => {
                                    setShowPaymentModal(false);
                                    setSelectedPayment(null);
                                }}
                            >
                                <Ionicons name="close" size={24} color="#1F2937" />
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>Payment</Text>
                            <View style={{ width: 40 }} />
                        </View>

                        <ScrollView 
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.modalScrollContent}
                        >
                            {/* Booking Summary */}
                            <View style={[styles.section, { marginTop: 0 }]}>
                                <Text style={styles.sectionTitle}>Booking Summary</Text>
                                <View style={styles.summaryCard}>
                                    <Text style={styles.summaryTitle}>{court.name}</Text>
                                    <View style={styles.summaryRow}>
                                        <Text style={styles.summaryLabel}>Date</Text>
                                        <Text style={styles.summaryValue}>{selectedDate}</Text>
                                    </View>
                                    <View style={styles.summaryRow}>
                                        <Text style={styles.summaryLabel}>Time</Text>
                                        <Text style={styles.summaryValue}>{formatTimeSlot(timeSlots, selectedTimes)}</Text>
                                    </View>
                                    <View style={styles.summaryRow}>
                                        <Text style={styles.summaryLabel}>Duration</Text>
                                        <Text style={styles.summaryValue}>{selectedTimes.length} hours</Text>
                                    </View>
                                    <View style={styles.summaryRow}>
                                        <Text style={styles.summaryLabel}>Total Price</Text>
                                        <Text style={styles.summaryValue}>Rp {totalPrice.toLocaleString()}</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Payment Type Selection */}
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Payment Type</Text>
                                <View style={styles.paymentTypeContainer}>
                                    <TouchableOpacity
                                        style={[
                                            styles.paymentTypeOption,
                                            paymentType === 'full' && styles.paymentTypeSelected
                                        ]}
                                        onPress={() => setPaymentType('full')}
                                    >
                                        <View style={styles.radioButton}>
                                            {paymentType === 'full' && <View style={styles.radioButtonSelected} />}
                                        </View>
                                        <View style={styles.paymentTypeContent}>
                                            <Text style={styles.paymentTypeTitle}>Full Payment</Text>
                                            <Text style={styles.paymentTypeAmount}>
                                                Rp {totalPrice.toLocaleString()}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.paymentTypeOption,
                                            paymentType === 'dp' && styles.paymentTypeSelected
                                        ]}
                                        onPress={() => setPaymentType('dp')}
                                    >
                                        <View style={styles.radioButton}>
                                            {paymentType === 'dp' && <View style={styles.radioButtonSelected} />}
                                        </View>
                                        <View style={styles.paymentTypeContent}>
                                            <Text style={styles.paymentTypeTitle}>Down Payment (50%)</Text>
                                            <Text style={styles.paymentTypeAmount}>
                                                Rp {(totalPrice * 0.5).toLocaleString()}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Promo Code Section */}
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Promo Code</Text>
                                <View style={styles.promoContainer}>
                                    <TextInput
                                        style={styles.promoInput}
                                        placeholder="Enter promo code"
                                        value={promoCode}
                                        onChangeText={setPromoCode}
                                        autoCapitalize="characters"
                                    />
                                    <TouchableOpacity
                                        style={styles.promoButton}
                                        onPress={validatePromoCode}
                                    >
                                        <Text style={styles.promoButtonText}>Apply</Text>
                                    </TouchableOpacity>
                                </View>
                                {promoDiscount > 0 && (
                                    <Text style={styles.promoApplied}>
                                        {promoDiscount}% discount applied!
                                    </Text>
                                )}
                            </View>

                            {/* Payment Methods */}
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Payment Method</Text>
                                {paymentMethods.map((method) => (
                                    <View key={method.id} style={styles.methodSection}>
                                        <Text style={styles.methodTitle}>{method.title}</Text>
                                        {method.options.map((option) => (
                                            <TouchableOpacity
                                                key={option.id}
                                                style={[
                                                    styles.paymentOption,
                                                    selectedPayment?.methodId === method.id && 
                                                    selectedPayment?.optionId === option.id && 
                                                    styles.paymentOptionSelected
                                                ]}
                                                onPress={() => handlePaymentSelect(method.id, option.id)}
                                            >
                                                <Image
                                                    source={{ uri: option.image }}
                                                    style={styles.paymentLogo}
                                                    resizeMode="contain"
                                                />
                                                <Text style={styles.paymentName}>{option.name}</Text>
                                                <View style={styles.radioButton}>
                                                    {selectedPayment?.methodId === method.id && 
                                                     selectedPayment?.optionId === option.id && 
                                                     <View style={styles.radioButtonSelected} />}
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                ))}
                            </View>
                        </ScrollView>

                        {/* Bottom Button */}
                        <View style={styles.modalBottom}>
                            <View style={styles.totalContainer}>
                                <Text style={styles.totalLabel}>
                                    {paymentType === 'dp' ? 'Down Payment' : 'Total Payment'}
                                </Text>
                                <View>
                                    {promoDiscount > 0 && (
                                        <Text style={styles.discountText}>
                                            -{promoDiscount}% OFF
                                        </Text>
                                    )}
                                    <Text style={styles.totalValue}>
                                        Rp {getFinalAmount().toLocaleString()}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity 
                                style={[styles.payButton, !selectedPayment && styles.payButtonDisabled]}
                                disabled={!selectedPayment}
                                onPress={() => setShowConfirmModal(true)}
                            >
                                <Text style={styles.payButtonText}>Pay Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Confirmation Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showConfirmModal}
                onRequestClose={() => setShowConfirmModal(false)}
            >
                <View style={styles.confirmModalContainer}>
                    <View style={styles.confirmModalContent}>
                        <View style={styles.confirmModalHeader}>
                            <TouchableOpacity 
                                style={styles.closeButton}
                                onPress={() => setShowConfirmModal(false)}
                            >
                                <Ionicons name="close" size={24} color="#1F2937" />
                            </TouchableOpacity>
                            <Text style={styles.confirmModalTitle}>Confirm Payment</Text>
                            <View style={{ width: 40 }} />
                        </View>

                        <ScrollView style={styles.confirmModalScroll}>
                            <View style={styles.confirmSection}>
                                <Text style={styles.confirmSectionTitle}>Payment Details</Text>
                                <View style={styles.confirmDetailItem}>
                                    <Text style={styles.confirmLabel}>Court</Text>
                                    <Text style={styles.confirmValue}>{court.name}</Text>
                                </View>
                                <View style={styles.confirmDetailItem}>
                                    <Text style={styles.confirmLabel}>Date</Text>
                                    <Text style={styles.confirmValue}>{selectedDate}</Text>
                                </View>
                                <View style={styles.confirmDetailItem}>
                                    <Text style={styles.confirmLabel}>Time</Text>
                                    <Text style={styles.confirmValue}>{formatTimeSlot(timeSlots, selectedTimes)}</Text>
                                </View>
                                <View style={styles.confirmDetailItem}>
                                    <Text style={styles.confirmLabel}>Duration</Text>
                                    <Text style={styles.confirmValue}>{selectedTimes.length} hours</Text>
                                </View>
                            </View>

                            <View style={styles.confirmSection}>
                                <Text style={styles.confirmSectionTitle}>Payment Method</Text>
                                <View style={styles.selectedPaymentMethod}>
                                    <Image
                                        source={{ uri: paymentMethods
                                            .find(m => m.id === selectedPayment?.methodId)
                                            ?.options.find(o => o.id === selectedPayment?.optionId)
                                            ?.image }}
                                        style={styles.selectedPaymentLogo}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.selectedPaymentName}>
                                        {paymentMethods
                                            .find(m => m.id === selectedPayment?.methodId)
                                            ?.options.find(o => o.id === selectedPayment?.optionId)
                                            ?.name}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.confirmSection}>
                                <Text style={styles.confirmSectionTitle}>Price Details</Text>
                                <View style={styles.confirmDetailItem}>
                                    <Text style={styles.confirmLabel}>Subtotal</Text>
                                    <Text style={styles.confirmValue}>Rp {totalPrice.toLocaleString()}</Text>
                                </View>
                                {promoDiscount > 0 && (
                                    <View style={styles.confirmDetailItem}>
                                        <Text style={styles.confirmLabel}>Discount ({promoDiscount}%)</Text>
                                        <Text style={[styles.confirmValue, styles.discountValue]}>
                                            -Rp {((getPaymentAmount() * promoDiscount) / 100).toLocaleString()}
                                        </Text>
                                    </View>
                                )}
                                <View style={[styles.confirmDetailItem, styles.totalItem]}>
                                    <Text style={styles.totalLabel}>Total Payment</Text>
                                    <Text style={styles.totalValue}>Rp {getFinalAmount().toLocaleString()}</Text>
                                </View>
                            </View>
                        </ScrollView>

                        <View style={styles.swipeContainer}>
                            <View style={styles.swipeTrack}>
                                <Animated.View 
                                    style={[
                                        styles.progressBar,
                                        {
                                            width: progressAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ['0%', '100%']
                                            }),
                                            backgroundColor: progressAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ['#EA580C', '#EA580C']
                                            }),
                                            borderTopRightRadius: 32,
                                            borderBottomRightRadius: 32,
                                        }
                                    ]}
                                />
                                <Animated.View
                                    style={[
                                        styles.swipeThumb,
                                        {
                                            transform: [{
                                                translateX: swipeAnim
                                            }]
                                        }
                                    ]}
                                    {...panResponder.panHandlers}
                                >
                                    <View style={styles.swipeThumbContent}>
                                        <Feather name="chevron-right" size={24} color="#fff" />
                                    </View>
                                </Animated.View>
                                <Animated.Text 
                                    style={[
                                        styles.swipeText,
                                        {
                                            opacity: progressAnim.interpolate({
                                                inputRange: [0, 0.7],
                                                outputRange: [1, 0]
                                            })
                                        }
                                    ]}
                                >
                                    Swipe to confirm payment
                                </Animated.Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageContainer: {
        position: 'relative',
        height: 250,
        backgroundColor: '#f5f5f5',
    },
    courtImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 12,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    imageOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    badgeContainer: {
        position: 'absolute',
        top: 50,
        right: 20,
    },
    badge: {
        backgroundColor: '#EA580C',
        color: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 25,
        fontSize: 13,
        fontWeight: '600',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    detailsContainer: {
        padding: 24,
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    courtName: {
        fontSize: 26,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        padding: 8,
        borderRadius: 8,
        marginTop: 4,
    },
    locationText: {
        marginLeft: 6,
        color: '#64748B',
        fontSize: 14,
        fontWeight: '500',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEF3C7',
        padding: 10,
        borderRadius: 12,
    },
    rating: {
        marginLeft: 6,
        fontSize: 16,
        fontWeight: '700',
        color: '#EA580C',
    },
    ratingCount: {
        marginLeft: 2,
        fontSize: 14,
        color: '#EA580C',
        opacity: 0.8,
    },
    priceSection: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: 16,
        backgroundColor: '#F8FAFC',
        padding: 16,
        borderRadius: 12,
    },
    price: {
        fontSize: 28,
        color: '#EA580C',
        fontWeight: '700',
    },
    perHour: {
        marginLeft: 6,
        fontSize: 16,
        color: '#64748B',
        fontWeight: '500',
    },
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
    facilitiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
    },
    facilityItem: {
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    facilityLabel: {
        marginLeft: 12,
        fontSize: 15,
        color: '#1F2937',
        fontWeight: '500',
    },
    description: {
        fontSize: 15,
        lineHeight: 24,
        color: '#64748B',
        backgroundColor: '#F8FAFC',
        padding: 16,
        borderRadius: 12,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    seeAll: {
        color: '#EA580C',
        fontSize: 15,
        fontWeight: '600',
    },
    reviewItem: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    reviewUser: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1F2937',
    },
    reviewRating: {
        flexDirection: 'row',
        marginLeft: 8,
    },
    reviewComment: {
        marginTop: 12,
        fontSize: 15,
        color: '#64748B',
        lineHeight: 22,
    },
    reviewDate: {
        marginTop: 12,
        fontSize: 13,
        color: '#94A3B8',
        fontWeight: '500',
    },
    bottomContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
    },
    bottomContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 4,
        fontWeight: '500',
    },
    totalPrice: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1F2937',
    },
    bookButton: {
        backgroundColor: '#EA580C',
        paddingHorizontal: 36,
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
        shadowColor: '#EA580C',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    bookButtonDisabled: {
        backgroundColor: '#94A3B8',
        shadowOpacity: 0.1,
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
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
    selectDateHint: {
        textAlign: 'center',
        fontSize: 15,
        color: '#64748B',
        fontStyle: 'italic',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: '90%',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    modalScrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        marginBottom: 24,
    },
    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    modalBottom: {
        padding: 24,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    summaryCard: {
        backgroundColor: '#F8FAFC',
        borderRadius: 16,
        padding: 20,
    },
    summaryTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 16,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        fontSize: 15,
        color: '#64748B',
    },
    summaryValue: {
        fontSize: 15,
        color: '#1F2937',
        fontWeight: '500',
    },
    totalRow: {
        marginTop: 8,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    totalValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#EA580C',
    },
    methodSection: {
        marginBottom: 24,
    },
    methodTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#64748B',
        marginBottom: 12,
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    paymentOptionSelected: {
        borderColor: '#EA580C',
        backgroundColor: '#FFF7ED',
    },
    paymentLogo: {
        width: 60,
        height: 24,
        marginRight: 12,
    },
    paymentName: {
        flex: 1,
        fontSize: 15,
        color: '#1F2937',
        fontWeight: '500',
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#CBD5E1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButtonSelected: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#EA580C',
    },
    payButton: {
        backgroundColor: '#EA580C',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    payButtonDisabled: {
        backgroundColor: '#94A3B8',
    },
    payButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    paymentTypeContainer: {
        marginTop: 8,
    },
    paymentTypeOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    paymentTypeSelected: {
        borderColor: '#EA580C',
        backgroundColor: '#FFF7ED',
    },
    paymentTypeContent: {
        marginLeft: 12,
        flex: 1,
    },
    paymentTypeTitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#1F2937',
        marginBottom: 4,
    },
    paymentTypeAmount: {
        fontSize: 14,
        color: '#64748B',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    promoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    promoInput: {
        flex: 1,
        height: 48,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        paddingHorizontal: 16,
        marginRight: 12,
        fontSize: 15,
        color: '#1F2937',
    },
    promoButton: {
        height: 48,
        paddingHorizontal: 24,
        backgroundColor: '#EA580C',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    promoButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
    promoApplied: {
        marginTop: 8,
        color: '#059669',
        fontSize: 14,
        fontWeight: '500',
    },
    discountText: {
        color: '#059669',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'right',
        marginBottom: 4,
    },
    confirmModalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'flex-end',
    },
    confirmModalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: '80%',
    },
    confirmModalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    confirmModalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    confirmModalScroll: {
        flex: 1,
    },
    confirmSection: {
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    confirmSectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 16,
    },
    confirmDetailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    confirmLabel: {
        fontSize: 15,
        color: '#64748B',
    },
    confirmValue: {
        fontSize: 15,
        color: '#1F2937',
        fontWeight: '500',
    },
    selectedPaymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
    },
    selectedPaymentLogo: {
        width: 60,
        height: 24,
        marginRight: 12,
    },
    selectedPaymentName: {
        fontSize: 15,
        color: '#1F2937',
        fontWeight: '500',
    },
    totalItem: {
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
    },
    discountValue: {
        color: '#059669',
    },
    swipeContainer: {
        padding: 24,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    swipeTrack: {
        height: 64,
        backgroundColor: '#F1F5F9',
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    progressBar: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        backgroundColor: '#EA580C',
        zIndex: 1,
    },
    swipeThumb: {
        position: 'absolute',
        left: 4,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
    },
    swipeThumbContent: {
        width: '100%',
        height: '100%',
        backgroundColor: '#EA580C',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    swipeText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#64748B',
        zIndex: 2,
    },
});