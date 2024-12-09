import { View, Text, StyleSheet } from "react-native";

export default function InvoiceDetails({ invoiceId, date }) {
    return (
        <View style={styles.invoiceHeader}>
            <Text style={styles.invoiceNo}>Invoice #{invoiceId}</Text>
            <Text style={styles.date}>{date}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    invoiceHeader: {
        marginBottom: 24,
    },
    invoiceNo: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 4,
    },
    date: {
        fontSize: 14,
        color: '#64748B',
    },
});
