import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
    const [isPushNotificationsEnabled, setPushNotificationsEnabled] = React.useState(true);
    const [isFaceIDEnabled, setFaceIDEnabled] = React.useState(false);

    const togglePushNotifications = () => setPushNotificationsEnabled(prev => !prev);
    const toggleFaceID = () => setFaceIDEnabled(prev => !prev);

    return (
        <View style={styles.profileContainer}>
            {/* Profile Avatar */}
            <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/8686/8686332.png' }}
                style={styles.profileAvatar}
            />
            {/* User Info */}
            <Text style={styles.profileName}>Adella Java</Text>
            <Text style={styles.profileEmail}>adella@mail.com</Text>
            {/* <Text style={styles.profileDeviceId}>Device ID: device-12345</Text> */}

            {/* Edit Profile Button */}
            <TouchableOpacity style={styles.editProfileButton}>
                <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>

            {/* Preferences Section */}
            <View style={styles.preferencesSection}>
                <Text style={styles.sectionTitle}>Preferences</Text>

                <View style={styles.preferenceItem}>
                    <Text style={styles.preferenceText}>Push Notifications</Text>
                    <Switch
                        value={isPushNotificationsEnabled}
                        onValueChange={togglePushNotifications}
                    />
                </View>

                <View style={styles.preferenceItem}>
                    <Text style={styles.preferenceText}>Face ID</Text>
                    <Switch
                        value={isFaceIDEnabled}
                        onValueChange={toggleFaceID}
                    />
                </View>
            </View>

            {/* Logout Section */}
            <TouchableOpacity style={styles.logoutButton}>
                <Ionicons name="log-out-outline" size={20} color="red" />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
    },
    profileAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    profileEmail: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    profileRole: {
        fontSize: 14,
        color: '#444',
        marginBottom: 5,
    },
    profileDeviceId: {
        fontSize: 14,
        color: '#444',
        marginBottom: 20,
    },
    editProfileButton: {
        backgroundColor: '#1e3c72',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginBottom: 20,
    },
    editProfileText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    preferencesSection: {
        width: '100%',
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    preferenceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    preferenceText: {
        fontSize: 16,
        color: '#333',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
    },
    logoutText: {
        fontSize: 16,
        color: 'red',
        marginLeft: 10,
    },
});