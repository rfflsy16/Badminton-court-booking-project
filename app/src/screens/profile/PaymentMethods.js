import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function PaymentMethods() {
    const navigation = useNavigation();

    const paymentMethods = [
        {
            id: 'e-wallet',
            title: 'E-Wallet',
            options: [
                {
                    id: 'gopay',
                    name: 'GoPay',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/2560px-Gopay_logo.svg.png',
                    connected: true,
                    balance: 250000
                },
                {
                    id: 'ovo',
                    name: 'OVO',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_ovo_purple.svg/2560px-Logo_ovo_purple.svg.png',
                    connected: false
                },
                {
                    id: 'dana',
                    name: 'DANA',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/2560px-Logo_dana_blue.svg.png',
                    connected: false
                }
            ]
        },
        {
            id: 'bank',
            title: 'Bank Transfer',
            options: [
                {
                    id: 'bca',
                    name: 'BCA',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png',
                    connected: true,
                    accountNo: '••••••8888'
                },
                {
                    id: 'mandiri',
                    name: 'Mandiri',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/2560px-Bank_Mandiri_logo_2016.svg.png',
                    connected: false
                }
            ]
        }
    ];

    const handleConnect = (methodId) => {
        // Handle connect payment method
        console.log('Connect:', methodId);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Payment Methods</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {paymentMethods.map((method) => (
                    <View key={method.id} style={styles.section}>
                        <Text style={styles.sectionTitle}>{method.title}</Text>
                        {method.options.map((option) => (
                            <View key={option.id} style={styles.paymentOption}>
                                <Image
                                    source={{ uri: option.image }}
                                    style={styles.paymentLogo}
                                    resizeMode="contain"
                                />
                                <View style={styles.paymentInfo}>
                                    <Text style={styles.paymentName}>{option.name}</Text>
                                    {option.connected && (
                                        <Text style={styles.paymentDetail}>
                                            {option.balance ? 
                                                `Balance: Rp ${option.balance.toLocaleString()}` : 
                                                option.accountNo
                                            }
                                        </Text>
                                    )}
                                </View>
                                {option.connected ? (
                                    <View style={styles.connectedBadge}>
                                        <Ionicons name="checkmark-circle" size={24} color="#059669" />
                                    </View>
                                ) : (
                                    <TouchableOpacity 
                                        style={styles.connectButton}
                                        onPress={() => handleConnect(option.id)}
                                    >
                                        <Text style={styles.connectButtonText}>Connect</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
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
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    section: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#64748B',
        marginBottom: 16,
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
    paymentLogo: {
        width: 60,
        height: 24,
        marginRight: 12,
    },
    paymentInfo: {
        flex: 1,
    },
    paymentName: {
        fontSize: 15,
        color: '#1F2937',
        fontWeight: '500',
        marginBottom: 4,
    },
    paymentDetail: {
        fontSize: 14,
        color: '#64748B',
    },
    connectedBadge: {
        padding: 4,
    },
    connectButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#EA580C',
    },
    connectButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
});