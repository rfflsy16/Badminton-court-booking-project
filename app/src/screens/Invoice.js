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
    const { id } = route.params;

    const [bookingData, setBookingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userToken, setUserToken] = useState("");

    useEffect(() => {
        async function getTokenAndFetchData() {
            try {
                const token = await SecureStore.getItemAsync("userToken");
                setUserToken(token);

                const response = await axios.get(
                    `${process.env.EXPO_PUBLIC_BASE_URL}/booking/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log(response.data, "<<<<<<<< Data dari server");
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setBookingData(response.data[0]); // Ambil elemen pertama jika hanya satu data yang relevan
                } else {
                    Alert.alert("Error", "Data tidak ditemukan.");
                }
            } catch (error) {
                console.error(error);
                Alert.alert("Error", "Gagal mengambil data booking.");
            } finally {
                setLoading(false);
            }
        }

        getTokenAndFetchData();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!bookingData) {
        return (
            <View style={styles.loaderContainer}>
                <Alert title="Error" message="Tidak ada data booking tersedia!" />
            </View>
        );
    }

    const {
        _id,
        date,
        selectedTime,
        totalPrice,
        statusBooking,
        court,
        building,
    } = bookingData;

    return (
        <View style={styles.container}>
            <InvoiceHeader onBack={() => navigation.goBack()} />

            <ScrollView style={styles.content}>
                <InvoiceDetails invoiceId={_id} date={date} />

                <InvoiceSection title="Venue Info">
                    <InfoItem label="Venue Name" value={building?.name || "-"} />
                    <InfoItem label="Court Type" value={court?.type || "-"} />
                    <InfoItem label="Location" value={building?.city || "-"} />
                </InvoiceSection>

                <InvoiceSection title="Booking Details">
                    <InfoItem label="Date" value={date || "-"} />
                    <InfoItem label="Time" value={selectedTime?.join(", ") || "-"} />
                    <InfoItem label="Category" value={court?.category || "-"} />
                </InvoiceSection>

                <InvoiceSection title="Payment Details">
                    <InfoItem label="Court Price" value={`Rp ${court?.price || 0}`} />
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
