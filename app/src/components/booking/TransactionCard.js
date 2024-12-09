import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { useState, useEffect } from "react";

export default function TransactionCard({ item }) {
    const navigation = useNavigation();
    const [userToken, setUserToken] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log('Transaction item:', JSON.stringify(item, null, 2)); // Debug log
        async function getToken() {
            const token = await SecureStore.getItemAsync('userToken');
            setUserToken(token);
        }
        getToken();
    }, []);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'paid':
                return '#4ADE80';  
            case 'ongoing':
                return '#FBBF24';  
            case 'cancelled':
                return '#EF4444';  
            default:
                return '#94A3B8';
        }
    };

    const handleCompletePayment = async () => {
        try {
            if (!userToken) {   
                alert('Please login first');
                return;
            }

            if (!item._id) {
                alert('Invalid booking data');
                return;
            }

            setIsLoading(true);

            const payload = {
                bookingId: item._id  // Use _id directly from the transaction
            };

            console.log('Sending completion payment request:', payload);
            
            const response = await axios.post(
                `${process.env.EXPO_PUBLIC_BASE_URL}/complete-payment`, 
                payload, 
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.paymentUrl) {
                navigation.navigate('Midtrans', {
                    paymentUrl: response.data.paymentUrl
                });
            } else {
                throw new Error('No payment URL received from server');
            }
        } catch (error) {
            console.error('Payment error:', error);
            const errorMessage = error.response?.data?.message || 'Failed to process payment. Please try again.';
            alert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('Invoice', { item })}
        >
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.venueName}>{item.venueName}</Text>
                        <View style={styles.transactionIdContainer}>
                            <Ionicons name="receipt-outline" size={14} color="#94A3B8" />
                            <Text style={styles.transactionId}>Booking ID: {item._id}</Text>
                        </View>
                        <View style={styles.courtTypeContainer}>
                            <Ionicons name="basketball-outline" size={14} color="#94A3B8" />
                            <Text style={styles.courtNumber}>{item.courtNumber}</Text>
                        </View>
                    </View>
                    <View style={styles.headerRight}>
                        <View style={[styles.statusContainer, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                                {item.status}
                            </Text>
                        </View>
                        <View style={[styles.paymentTypeContainer, { backgroundColor: '#E2E8F0' }]}>
                            <Ionicons name="card-outline" size={12} color="#64748B" />
                            <Text style={styles.paymentTypeText}>
                                {item.paymentType === 'dp' ? 'Down Payment' : 'Full Payment'}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.locationContainer}>
                    <Ionicons name="location-outline" size={16} color="#94A3B8" />
                    <Text style={styles.locationText}>{item.location}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.dateTimeContainer}>
                        <Ionicons name="calendar-outline" size={16} color="#94A3B8" />
                        <Text style={styles.detailText}>{item.date}</Text>
                    </View>
                    <View style={styles.dateTimeContainer}>
                        <Ionicons name="time-outline" size={16} color="#94A3B8" />
                        <Text style={styles.detailText}>{item.time}</Text>
                    </View>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={[styles.price, { color: '#E11D48' }]}>{item.price}</Text>
                    {/* {item.status.toLowerCase() === 'ongoing' && item.paymentType === 'dp' && (
                        <TouchableOpacity 
                            style={[
                                styles.completePaymentButton,
                                isLoading && styles.completePaymentButtonDisabled
                            ]}
                            onPress={handleCompletePayment}
                            disabled={isLoading}
                        >
                            <Text style={styles.completePaymentText}>
                                {isLoading ? 'Processing...' : 'Complete Payment'}
                            </Text>
                        </TouchableOpacity>
                    )} */}
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    cardImage: {
        width: '100%',
        height: 160,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    cardContent: {
        padding: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    headerLeft: {
        flex: 1,
        marginRight: 12,
    },
    headerRight: {
        alignItems: 'flex-end',
        gap: 4,
    },
    venueName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    transactionIdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    courtTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    transactionId: {
        fontSize: 12,
        color: '#94A3B8',
        marginLeft: 4,
        fontFamily: 'monospace',
    },
    courtNumber: {
        fontSize: 14,
        color: '#64748B',
    },
    statusContainer: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    paymentTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 4,
    },
    paymentTypeText: {
        fontSize: 10,
        fontWeight: '500',
        color: '#64748B',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    locationText: {
        marginLeft: 4,
        fontSize: 14,
        color: '#94A3B8',
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    dateTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        marginLeft: 4,
        fontSize: 14,
        color: '#64748B',
    },
    priceContainer: {
        marginTop: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        color: '#E11D48',
    },
    completePaymentButton: {
        backgroundColor: '#3B82F6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    completePaymentButtonDisabled: {
        backgroundColor: '#94A3B8',
    },
    completePaymentText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
});
