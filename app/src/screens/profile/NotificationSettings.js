import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function NotificationSettings() {
    const navigation = useNavigation();
    const [settings, setSettings] = useState({
        bookingReminders: true,
        paymentReminders: true,
        promotions: false,
        newVenues: true,
        chatMessages: true,
        systemUpdates: true
    });

    const toggleSwitch = (key) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
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
                <Text style={styles.headerTitle}>Notifications</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Booking Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Booking Notifications</Text>
                    <View style={styles.notificationItem}>
                        <View style={styles.notificationInfo}>
                            <Text style={styles.notificationTitle}>Booking Reminders</Text>
                            <Text style={styles.notificationDescription}>Receive reminders about your upcoming bookings</Text>
                        </View>
                        <Switch
                            trackColor={{ false: '#E2E8F0', true: '#FDBA74' }}
                            thumbColor={settings.bookingReminders ? '#EA580C' : '#fff'}
                            onValueChange={() => toggleSwitch('bookingReminders')}
                            value={settings.bookingReminders}
                        />
                    </View>
                    <View style={styles.notificationItem}>
                        <View style={styles.notificationInfo}>
                            <Text style={styles.notificationTitle}>Payment Reminders</Text>
                            <Text style={styles.notificationDescription}>Get notified when payments are due</Text>
                        </View>
                        <Switch
                            trackColor={{ false: '#E2E8F0', true: '#FDBA74' }}
                            thumbColor={settings.paymentReminders ? '#EA580C' : '#fff'}
                            onValueChange={() => toggleSwitch('paymentReminders')}
                            value={settings.paymentReminders}
                        />
                    </View>
                </View>

                {/* Marketing Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Marketing</Text>
                    <View style={styles.notificationItem}>
                        <View style={styles.notificationInfo}>
                            <Text style={styles.notificationTitle}>Promotions & Discounts</Text>
                            <Text style={styles.notificationDescription}>Stay updated with special offers and deals</Text>
                        </View>
                        <Switch
                            trackColor={{ false: '#E2E8F0', true: '#FDBA74' }}
                            thumbColor={settings.promotions ? '#EA580C' : '#fff'}
                            onValueChange={() => toggleSwitch('promotions')}
                            value={settings.promotions}
                        />
                    </View>
                    <View style={styles.notificationItem}>
                        <View style={styles.notificationInfo}>
                            <Text style={styles.notificationTitle}>New Venues</Text>
                            <Text style={styles.notificationDescription}>Get notified when new venues are added</Text>
                        </View>
                        <Switch
                            trackColor={{ false: '#E2E8F0', true: '#FDBA74' }}
                            thumbColor={settings.newVenues ? '#EA580C' : '#fff'}
                            onValueChange={() => toggleSwitch('newVenues')}
                            value={settings.newVenues}
                        />
                    </View>
                </View>

                {/* Other Notifications */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Other</Text>
                    <View style={styles.notificationItem}>
                        <View style={styles.notificationInfo}>
                            <Text style={styles.notificationTitle}>Chat Messages</Text>
                            <Text style={styles.notificationDescription}>Receive notifications for new messages</Text>
                        </View>
                        <Switch
                            trackColor={{ false: '#E2E8F0', true: '#FDBA74' }}
                            thumbColor={settings.chatMessages ? '#EA580C' : '#fff'}
                            onValueChange={() => toggleSwitch('chatMessages')}
                            value={settings.chatMessages}
                        />
                    </View>
                    <View style={styles.notificationItem}>
                        <View style={styles.notificationInfo}>
                            <Text style={styles.notificationTitle}>System Updates</Text>
                            <Text style={styles.notificationDescription}>Important updates about the app</Text>
                        </View>
                        <Switch
                            trackColor={{ false: '#E2E8F0', true: '#FDBA74' }}
                            thumbColor={settings.systemUpdates ? '#EA580C' : '#fff'}
                            onValueChange={() => toggleSwitch('systemUpdates')}
                            value={settings.systemUpdates}
                        />
                    </View>
                </View>
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
        color: '#1F2937',
        marginBottom: 16,
    },
    notificationItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    notificationInfo: {
        flex: 1,
        marginRight: 16,
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1F2937',
        marginBottom: 4,
    },
    notificationDescription: {
        fontSize: 14,
        color: '#64748B',
    },
});