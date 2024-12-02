import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function LogoutButton({ onPress }) {
    return (
        <TouchableOpacity style={styles.logoutButton} onPress={onPress}>
            <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
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
