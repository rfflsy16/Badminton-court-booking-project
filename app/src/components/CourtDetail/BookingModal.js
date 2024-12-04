import { View, Text, Modal, ScrollView, TouchableOpacity, Image, TextInput, Animated, StyleSheet, PanResponder } from 'react-native';
import { Ionicons, Feather } from "@expo/vector-icons";
import { useState, useRef } from 'react';
import PaymentModal from './PaymentModal';

export default function BookingModal({ 
    visible, 
    onClose, 
    court, 
    selectedDate, 
    selectedTimes, 
    totalPrice, 
    paymentMethods, 
    onPaymentSelect, 
    selectedPayment, 
    promoCode, 
    setPromoCode, 
    promoDiscount, 
    validatePromoCode, 
    paymentType, 
    setPaymentType, 
    getFinalAmount, 
    handleConfirm,
    timeSlots 
}) {
    const swipeAnim = useRef(new Animated.Value(0)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;
    const [isSwipeCompleted, setIsSwipeCompleted] = useState(false);
    const [showPaymentConfirm, setShowPaymentConfirm] = useState(false);
    

    const formatTimeSlot = (selectedIds) => {
        return selectedIds
            .map(id => timeSlots.find(s => s.id === id)?.time)
            .filter(Boolean)
            .join(', ')
    }

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => !isSwipeCompleted,
            onMoveShouldSetPanResponder: () => !isSwipeCompleted,
            onPanResponderTerminate: () => {
                resetState();
            },
            onPanResponderMove: (_, gesture) => {
                if (isSwipeCompleted) return;
                const { dx } = gesture;
                const maxSwipe = 280;
                if (dx >= 0 && dx <= maxSwipe) {
                    swipeAnim.setValue(dx);
                    progressAnim.setValue(dx / maxSwipe);
                }
            },
            onPanResponderRelease: (_, gesture) => {
                if (isSwipeCompleted) return;
                const { dx } = gesture;
                const maxSwipe = 280;
                if (dx >= maxSwipe * 0.7) {
                    setIsSwipeCompleted(true);
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
                    ]).start(handleConfirm);
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

    const handlePayNow = () => {
        // setShowPaymentConfirm(true);
        handleConfirm();
    };

    const renderBookingSummary = () => {
        if (!court?.buildingDetails) return null;

        return (
            <View style={[styles.section, { marginTop: 0 }]}>
                <Text style={styles.sectionTitle}>Booking Summary</Text>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>{court.buildingDetails.name}</Text>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Date</Text>
                        <Text style={styles.summaryValue}>{selectedDate}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Time</Text>
                        <Text style={styles.summaryValue}>
                            {selectedTimes
                                .map(id => timeSlots.find(slot => slot.id === id)?.time)
                                .filter(Boolean)
                                .join(', ')}
                        </Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Duration</Text>
                        <Text style={styles.summaryValue}>{selectedTimes.length} hours</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Total Price</Text>
                        <Text style={styles.summaryValue}>
                            {new Intl.NumberFormat('id-ID', { 
                                style: 'currency', 
                                currency: 'IDR',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                            }).format(totalPrice)}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity 
                                style={styles.closeButton}
                                onPress={onClose}
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
                            {renderBookingSummary()}
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
                                                {new Intl.NumberFormat('id-ID', { 
                                                    style: 'currency', 
                                                    currency: 'IDR',
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0
                                                }).format(totalPrice)}
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
                                                {new Intl.NumberFormat('id-ID', { 
                                                    style: 'currency', 
                                                    currency: 'IDR',
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0
                                                }).format(totalPrice * 0.5)}
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
                                                onPress={() => onPaymentSelect(method.id, option.id)}
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
                                        {new Intl.NumberFormat('id-ID', { 
                                            style: 'currency', 
                                            currency: 'IDR',
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0
                                        }).format(getFinalAmount())}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity 
                                style={[styles.payButton, !selectedPayment && styles.payButtonDisabled]}
                                disabled={!selectedPayment}
                                onPress={handlePayNow}
                            >
                                <Text style={styles.payButtonText}>Pay Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <PaymentModal 
                visible={showPaymentConfirm}
                onClose={() => setShowPaymentConfirm(false)}
                handleConfirm={handleConfirm}
                amount={getFinalAmount()}
                selectedPayment={selectedPayment}
                paymentMethods={paymentMethods}
                court={court}
                selectedDate={selectedDate}
                selectedTimes={selectedTimes}
                timeSlots={timeSlots}
                paymentType={paymentType}
                promoDiscount={promoDiscount}
            />
        </>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 16,
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
    modalBottom: {
        padding: 24,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    totalLabel: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 4,
        fontWeight: '500',
    },
    totalValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1F2937',
    },
    discountText: {
        color: '#059669',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'right',
        marginBottom: 4,
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
});