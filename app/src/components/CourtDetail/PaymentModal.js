import { View, Text, Modal, Animated, StyleSheet, PanResponder, Image } from 'react-native';
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRef, useState } from 'react';

export default function PaymentModal({ 
    visible, 
    onClose,
    handleConfirm,
    amount,
    selectedPayment,
    paymentMethods,
    court,
    selectedDate,
    selectedTimes,
    timeSlots,
    paymentType,
    promoDiscount
}) {
    const swipeAnim = useRef(new Animated.Value(0)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;
    const [isSwipeCompleted, setIsSwipeCompleted] = useState(false);

    const formatTimeSlot = (selectedIds) => {
        return selectedIds
            .map(id => timeSlots.find(s => s.id === id)?.time)
            .filter(Boolean)
            .join(', ')
    }

    const getSelectedPaymentMethod = () => {
        const method = paymentMethods.find(m => m.id === selectedPayment?.methodId);
        const option = method?.options.find(o => o.id === selectedPayment?.optionId);
        return option;
    }

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => !isSwipeCompleted,
            onMoveShouldSetPanResponder: () => !isSwipeCompleted,
            onPanResponderMove: (_, gesture) => {
                if (isSwipeCompleted) return;
                const { dx } = gesture;
                const maxSwipe = 280;
                const thumbOffset = 32;
                if (dx >= 0 && dx <= maxSwipe) {
                    swipeAnim.setValue(dx);
                    progressAnim.setValue((dx + thumbOffset) / (maxSwipe + thumbOffset));
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

    const selectedPaymentMethod = getSelectedPaymentMethod();

    const renderPaymentDetails = () => {
        if (!court?.buildingDetails) return null;

        const selectedPaymentOption = selectedPayment && 
            paymentMethods
                .find(m => m.id === selectedPayment.methodId)
                ?.options.find(o => o.id === selectedPayment.optionId);

        return (
            <View style={styles.detailsContainer}>
                <Text style={styles.courtName}>{court.buildingDetails.name}</Text>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Date</Text>
                    <Text style={styles.detailValue}>{selectedDate}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Time</Text>
                    <Text style={styles.detailValue}>
                        {selectedTimes
                            .map(id => timeSlots.find(slot => slot.id === id)?.time)
                            .filter(Boolean)
                            .join(', ')}
                    </Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Payment Method</Text>
                    <Text style={styles.detailValue}>{selectedPaymentOption?.name || ''}</Text>
                </View>
                {promoDiscount > 0 && (
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Discount</Text>
                        <Text style={styles.detailValue}>-{promoDiscount}%</Text>
                    </View>
                )}
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Payment Type</Text>
                    <Text style={styles.detailValue}>
                        {paymentType === 'dp' ? 'Down Payment (50%)' : 'Full Payment'}
                    </Text>
                </View>
                <View style={[styles.detailRow, styles.totalRow]}>
                    <Text style={styles.totalLabel}>Total Amount</Text>
                    <Text style={styles.totalAmount}>
                        {new Intl.NumberFormat('id-ID', { 
                            style: 'currency', 
                            currency: 'IDR',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                        }).format(amount)}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.headerTop}>
                            <Ionicons 
                                name="close" 
                                size={24} 
                                color="#1F2937" 
                                onPress={onClose}
                            />
                            <Text style={styles.headerTitle}>Confirm Payment</Text>
                            <View style={{ width: 24 }} />
                        </View>
                    </View>

                    {/* Payment Details */}
                    {renderPaymentDetails()}

                    {/* Swipe Button */}
                    <View style={styles.swipeContainer}>
                        <View style={styles.swipeTrack}>
                            <Animated.View 
                                style={[
                                    styles.progressBar,
                                    {
                                        width: progressAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['0%', '100%']
                                        })
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    content: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '90%',
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    detailsContainer: {
        padding: 24,
    },
    detailSection: {
        marginBottom: 24,
    },
    detailTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 12,
    },
    courtInfo: {
        backgroundColor: '#F8FAFC',
        padding: 16,
        borderRadius: 12,
    },
    courtName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 12,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    detailLabel: {
        fontSize: 14,
        color: '#64748B',
    },
    detailValue: {
        fontSize: 14,
        color: '#1F2937',
        fontWeight: '500',
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        padding: 16,
        borderRadius: 12,
    },
    paymentLogo: {
        width: 60,
        height: 24,
        marginRight: 12,
    },
    paymentName: {
        fontSize: 15,
        color: '#1F2937',
        fontWeight: '500',
    },
    summaryContainer: {
        backgroundColor: '#F8FAFC',
        padding: 16,
        borderRadius: 12,
    },
    totalRow: {
        marginTop: 8,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
    },
    totalLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1F2937',
    },
    totalAmount: {
        fontSize: 16,
        fontWeight: '700',
        color: '#EA580C',
    },
    discountText: {
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
    },
    swipeThumb: {
        position: 'absolute',
        left: 4,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    swipeThumbContent: {
        width: '100%',
        height: '100%',
        backgroundColor: '#EA580C',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    swipeText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#64748B',
    },
});