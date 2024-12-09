import { View, Text, StyleSheet } from "react-native";

export default function PaymentStatus({ status }) {
    const isStatusPaid = status.toLowerCase() === 'paid';
    const backgroundColor = isStatusPaid ? '#DCFCE7' : '#FEF9C3';
    const textColor = isStatusPaid ? '#22C55E' : '#EAB308';

    return (
        <View style={[styles.statusSection, { backgroundColor }]}>
            <Text style={[styles.statusText, { color: textColor }]}>
                {status}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    statusSection: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 24,
    },
    statusText: {
        fontSize: 16,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
});
