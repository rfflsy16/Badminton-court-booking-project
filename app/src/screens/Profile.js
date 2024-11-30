import { ScrollView, StyleSheet } from "react-native";
import Header from "../components/profile/Header";
import ProfileSection from "../components/profile/ProfileSection";
import ProfileMenuItem from "../components/profile/ProfileMenuItem";
import LogoutButton from "../components/profile/LogoutButton";

export default function Profile() {
    const userInfo = {
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400",
        memberSince: "2023"
    };

    const handleLogout = () => {
        // Handle logout logic
    };

    return (
        <ScrollView style={styles.container}>
            <Header userInfo={userInfo} />

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

            <LogoutButton onPress={handleLogout} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
