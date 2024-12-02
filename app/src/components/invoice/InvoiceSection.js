import { View, Text, StyleSheet } from "react-native";

export default function InvoiceSection({ title, children }) {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {children}
        </View>
    );
}

export function InfoItem({ label, value, isTotal }) {
    const labelStyle = isTotal ? styles.totalLabel : styles.label;
    const valueStyle = isTotal ? styles.totalValue : styles.value;
    
    return (
        <View style={styles.infoItem}>
            <Text style={labelStyle}>{label}</Text>
            <Text style={valueStyle}>{value}</Text>
        </View>
    );
}

export function Divider() {
    return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 24,
        backgroundColor: '#F8FAFC',
        padding: 16,
        borderRadius: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 12,
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        color: '#64748B',
    },
    value: {
        fontSize: 14,
        color: '#1F2937',
        fontWeight: '500',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    totalValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#EA580C',
    },
    divider: {
        height: 1,
        backgroundColor: '#E2E8F0',
        marginVertical: 8,
    },
});
