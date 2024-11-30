import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileSection = ({ title, children }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionContent}>
            {children}
        </View>
    </View>
);

const ProfileMenuItem = ({ icon, title, subtitle, onPress, showBadge }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <View style={styles.menuIcon}>
            <Ionicons name={icon} size={24} color="#64748B" />
        </View>
        <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>{title}</Text>
            {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
        </View>
        <View style={styles.menuRight}>
            {showBadge && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>New</Text>
                </View>
            )}
            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
        </View>
    </TouchableOpacity>
);

export default function Profile() {
    const userInfo = {
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400",
        memberSince: "2023"
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image 
                    source={{ uri: userInfo.avatar }} 
                    style={styles.avatar}
                />
                <Text style={styles.name}>{userInfo.name}</Text>
                <Text style={styles.email}>{userInfo.email}</Text>
                <Text style={styles.memberSince}>Member since {userInfo.memberSince}</Text>
            </View>

            <ProfileSection title="Booking History">
                <ProfileMenuItem
                    icon="calendar-outline"
                    title="My Bookings"
                    subtitle="View your booking history"
                    onPress={() => {}}
                />
                <ProfileMenuItem
                    icon="heart-outline"
                    title="Favorite Courts"
                    subtitle="Manage your favorite venues"
                    onPress={() => {}}
                />
                <ProfileMenuItem
                    icon="receipt-outline"
                    title="Transaction History"
                    subtitle="View your payment history"
                    onPress={() => {}}
                />
            </ProfileSection>

            <ProfileSection title="Account Settings">
                <ProfileMenuItem
                    icon="person-outline"
                    title="Edit Profile"
                    onPress={() => {}}
                />
                <ProfileMenuItem
                    icon="notifications-outline"
                    title="Notifications"
                    subtitle="Configure push notifications"
                    onPress={() => {}}
                />
                <ProfileMenuItem
                    icon="card-outline"
                    title="Payment Methods"
                    onPress={() => {}}
                />
            </ProfileSection>

            <ProfileSection title="Preferences">
                <ProfileMenuItem
                    icon="language-outline"
                    title="Language"
                    subtitle="English"
                    onPress={() => {}}
                />
                <ProfileMenuItem
                    icon="moon-outline"
                    title="Dark Mode"
                    subtitle="Off"
                    onPress={() => {}}
                />
            </ProfileSection>

            <ProfileSection title="Support">
                <ProfileMenuItem
                    icon="help-circle-outline"
                    title="Help Center"
                    onPress={() => {}}
                />
                <ProfileMenuItem
                    icon="document-text-outline"
                    title="Terms of Service"
                    onPress={() => {}}
                />
                <ProfileMenuItem
                    icon="shield-checkmark-outline"
                    title="Privacy Policy"
                    onPress={() => {}}
                />
            </ProfileSection>

            <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        paddingTop: 32,
        paddingBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    email: {
        fontSize: 16,
        color: '#64748B',
        marginBottom: 8,
    },
    memberSince: {
        fontSize: 14,
        color: '#94A3B8',
    },
    section: {
        paddingTop: 24,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 16,
    },
    sectionContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    menuIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    menuContent: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        color: '#1F2937',
        marginBottom: 2,
    },
    menuSubtitle: {
        fontSize: 14,
        color: '#64748B',
    },
    menuRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        backgroundColor: '#EA580C',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        marginRight: 8,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
    },
    logoutButton: {
        marginTop: 32,
        marginBottom: 48,
        marginHorizontal: 16,
        backgroundColor: '#FEE2E2',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    logoutText: {
        color: '#EF4444',
        fontSize: 16,
        fontWeight: '600',
    },
});
