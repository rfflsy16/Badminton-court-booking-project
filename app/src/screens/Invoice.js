import { View, StyleSheet, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import InvoiceHeader from "../components/invoice/InvoiceHeader";
import InvoiceDetails from "../components/invoice/InvoiceDetails";
import InvoiceSection, { InfoItem, Divider } from "../components/invoice/InvoiceSection";
import PaymentStatus from "../components/invoice/PaymentStatus";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export default function Invoice({ route }) {
    const navigation = useNavigation();
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <InvoiceHeader onBack={() => navigation.goBack()} />

            <ScrollView style={styles.content}>
                <InvoiceDetails invoiceId={item._id} date={item.date} />

                <InvoiceSection title="Venue Info">
                    <InfoItem label="Venue Name" value={item.venueName} />
                    <InfoItem label="Court Type" value={item.courtNumber} />
                    <InfoItem label="Location" value={item.city} />
                </InvoiceSection>

                <InvoiceSection title="Booking Details">
                    <InfoItem label="Date" value={item.date} />
                    <InfoItem label="Time" value={item.time} />
                    <InfoItem label="Duration" value={item.selectedTime.length + " Hours"} />
                </InvoiceSection>

                <InvoiceSection title="Payment Details">
                    <InfoItem label="Court Price" value={item.price} />
                    <InfoItem label="Service Fee" value="Rp 0" />
                    <Divider />
                    <InfoItem label="Total" value={`Rp ${totalPrice || 0}`} isTotal />
                </InvoiceSection>

                <PaymentStatus status={statusBooking} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        flex: 1,
        padding: 20,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
