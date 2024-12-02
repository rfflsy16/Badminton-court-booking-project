import { View, Text, Image, StyleSheet } from "react-native";

export default function Header({ userInfo }) {
    return (
        <View style={styles.header}>
            <Image 
                source={{ uri: userInfo.avatar }} 
                style={styles.avatar}
            />
            <Text style={styles.name}>{userInfo.name}</Text>
            <Text style={styles.email}>{userInfo.email}</Text>
            <Text style={styles.memberSince}>Member since {userInfo.memberSince}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
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
});
