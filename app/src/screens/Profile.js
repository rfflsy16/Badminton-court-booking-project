import { ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/profile/Header";
import ProfileSection from "../components/profile/ProfileSection";
import ProfileMenuItem from "../components/profile/ProfileMenuItem";
import LogoutButton from "../components/profile/LogoutButton";
import { useState } from 'react';

export default function Profile() {
    const navigation = useNavigation();
    const [selectedLanguage, setSelectedLanguage] = useState('id');
    const [isDarkMode, setIsDarkMode] = useState(false);

    const userInfo = {
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400",
        memberSince: "2023"
    };

    const handleLogout = () => {
        // Handle logout logic
    };

    const getLanguageInfo = () => {
        const languages = {
            'en': 'English (US)',
            'en-gb': 'English (UK)',
            'id': 'Bahasa Indonesia',
            'ms': 'Bahasa Melayu',
            'zh-cn': '简体中文',
            'zh-tw': '繁體中文',
            'zh-hk': '繁體中文',
            'ja': '日本語',
            'ko': '한국어',
            'th': 'ภาษาไทย',
            'vi': 'Tiếng Việt'
        };
        return languages[selectedLanguage] || 'English (US)';
    };

    return (
        <ScrollView style={styles.container}>
            <Header userInfo={userInfo} />

            <ProfileSection title="Booking History">
                <ProfileMenuItem
                    icon="calendar-outline"
                    title="My Bookings"
                    subtitle="View your booking history"
                    onPress={() => navigation.navigate('Booking', { screen: 'bookings' })}
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
                    onPress={() => navigation.navigate('Booking', { screen: 'transactions' })}
                />
            </ProfileSection>

            <ProfileSection title="Account Settings">
                <ProfileMenuItem
                    icon="person-outline"
                    title="Edit Profile"
                    onPress={() => navigation.navigate('EditProfile')}
                />
                <ProfileMenuItem
                    icon="notifications-outline"
                    title="Notifications"
                    subtitle="Configure push notifications"
                    onPress={() => navigation.navigate('NotificationSettings')}
                />
                <ProfileMenuItem
                    icon="card-outline"
                    title="Payment Methods"
                    subtitle="Manage your payment methods"
                    onPress={() => navigation.navigate('PaymentMethods')}
                />
            </ProfileSection>

            <ProfileSection title="Preferences">
                <ProfileMenuItem
                    icon="language-outline"
                    title="Language"
                    subtitle={getLanguageInfo()}
                    onPress={() => navigation.navigate('Language', {
                        currentLanguage: selectedLanguage,
                        onSelect: (langId) => setSelectedLanguage(langId)
                    })}
                />
                <ProfileMenuItem
                    icon="moon-outline"
                    title="Dark Mode"
                    subtitle={isDarkMode ? "On" : "Off"}
                    onPress={() => navigation.navigate('DarkMode', {
                        currentMode: isDarkMode,
                        onSelect: (value) => setIsDarkMode(value)
                    })}
                />
            </ProfileSection>

            <ProfileSection title="Support">
                <ProfileMenuItem
                    icon="help-circle-outline"
                    title="Help Center"
                    onPress={() => navigation.navigate('HelpCenter')}
                />
                <ProfileMenuItem
                    icon="document-text-outline"
                    title="Terms of Service"
                    onPress={() => navigation.navigate('TermsOfService')}
                />
                <ProfileMenuItem
                    icon="shield-checkmark-outline"
                    title="Privacy Policy"
                    onPress={() => navigation.navigate('PrivacyPolicy')}
                />
            </ProfileSection>

            <LogoutButton 
            // onPress={handleLogout}  
            onPress={() => navigation.navigate('Login', { screen: 'Login' })}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});