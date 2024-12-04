import { View, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import InvoiceHeader from "../components/invoice/InvoiceHeader";
import InvoiceDetails from "../components/invoice/InvoiceDetails";
import InvoiceSection, { InfoItem, Divider } from "../components/invoice/InvoiceSection";
import PaymentStatus from "../components/invoice/PaymentStatus";

export default function Invoice({ route }) {
    const navigation = useNavigation();
    const { item } = route.params;
    console.log(item);

    return (
        <View style={styles.container}>
            <InvoiceHeader onBack={() => navigation.goBack()} />

            <ScrollView style={styles.content}>
                <InvoiceDetails invoiceId={item.id} date={item.date} />

                <InvoiceSection title="Venue Info">
                    <InfoItem label="Venue Name" value={item.venueName} />
                    <InfoItem label="Court Number" value={item.courtNumber} />
                    <InfoItem label="Location" value={item.location} />
                </InvoiceSection>

                <InvoiceSection title="Booking Details">
                    <InfoItem label="Date" value={item.date} />
                    <InfoItem label="Time" value={item.time} />
                    <InfoItem label="Duration" value="2 Hours" />
                </InvoiceSection>

                <InvoiceSection title="Payment Details">
                    <InfoItem label="Court Price" value={item.price} />
                    <InfoItem label="Service Fee" value="Rp 0" />
                    <Divider />
                    <InfoItem label="Total" value={item.price} isTotal />
                </InvoiceSection>

                <PaymentStatus status={item.status} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 20,
    },
});