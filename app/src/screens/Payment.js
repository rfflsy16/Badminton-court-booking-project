import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export default function Payment() {
    console.log("masuk payment");
    const route = useRoute();
    const navigation = useNavigation();
    const { court, selectedDate, selectedTimes, totalPrice } = route.params;
    const [selectedPayment, setSelectedPayment] = useState(null);

    const paymentMethods = [
        {
            id: 'card',
            title: 'Credit/Debit Card',
            options: [
                { id: 'visa', name: 'Visa', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png' },
                { id: 'mastercard', name: 'Mastercard', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png' },
                { id: 'jcb', name: 'JCB', image:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/JCB_logo.svg/2560px-JCB_logo.svg.png' },
            ]
        },
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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Payment</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Booking Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Booking Summary</Text>
                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryTitle}>{court.name}</Text>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Date</Text>
                            <Text style={styles.summaryValue}>{selectedDate}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Time</Text>
                            <Text style={styles.summaryValue}>{formatTimeSlot(court.timeSlots, selectedTimes)}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Duration</Text>
                            <Text style={styles.summaryValue}>{selectedTimes.length} hours</Text>
                        </View>
                        <View style={[styles.summaryRow, styles.totalRow]}>
                            <Text style={styles.totalLabel}>Total Payment</Text>
                            <Text style={styles.totalValue}>Rp {totalPrice.toLocaleString()}</Text>
                        </View>
                    </View>
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
                                    {option.images ? (
                                        <View style={{ flexDirection: 'row' }}>
                                            {option.images.map((image, index) => (
                                                <Image
                                                    key={index}
                                                    source={{ uri: image }}
                                                    style={[styles.paymentLogo, { marginRight: index === option.images.length - 1 ? 12 : 8 }]}
                                                    resizeMode="contain"
                                                />
                                            ))}
                                        </View>
                                    ) : (
                                        <Image
                                            source={{ uri: option.image }}
                                            style={styles.paymentLogo}
                                            resizeMode="contain"
                                        />
                                    )}
                                    <Text style={styles.paymentName}>{option.name}</Text>
                                    {option.description && (
                                        <Text style={{ fontSize: 12, color: '#64748B' }}>{option.description}</Text>
                                    )}
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
            <View style={styles.bottomContainer}>
                <TouchableOpacity 
                    style={[styles.payButton, !selectedPayment && styles.payButtonDisabled]}
                    disabled={!selectedPayment}
                    onPress={() => {
                        // Handle payment process
                        console.log('Process payment:', selectedPayment);
                    }}
                >
                    <Text style={styles.payButtonText}>Pay Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
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
        fontSize: 18,
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
    bottomContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    payButton: {
        backgroundColor: '#EA580C',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#EA580C',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    payButtonDisabled: {
        backgroundColor: '#94A3B8',
        shadowOpacity: 0.1,
    },
    payButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
