import { View, StyleSheet, FlatList, Animated, Dimensions, ActivityIndicator } from "react-native";
import { useState, useRef, useEffect } from "react";
import Header from "../components/booking/Header";
import TabBar from "../components/booking/TabBar";
import BookingCard from "../components/booking/BookingCard";
import TransactionCard from "../components/booking/TransactionCard.js";
import axios from "axios";

const { width } = Dimensions.get("window");

export default function Booking({ route }) {
    const [activeTab, setActiveTab] = useState("bookings");
    const scrollViewRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    const [bookingsData, setBookingsData] = useState([]);
    const [transactionsData, setTransactionsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (route.params?.screen) {
            const index = route.params.screen === "transactions" ? 1 : 0;
            setActiveTab(route.params.screen);
            scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
        }
    }, [route.params]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://your-server-url/bookings"); // Ganti `your-server-url` dengan URL server Anda
            const bookings = response.data;

            const formattedBookings = bookings.map(booking => ({
                id: booking._id,
                venueName: booking.venueName || "Unknown Venue",
                courtNumber: booking.courtNumber || "Unknown Court",
                date: booking.date,
                time: booking.selectedTime.join(" - "),
                status: booking.statusBooking || "Pending",
                price: `Rp ${booking.totalPrice}`,
                image: booking.image || "https://via.placeholder.com/150", // Placeholder image jika tidak ada gambar
                courtId: booking.courtId,
            }));

            setBookingsData(formattedBookings);
            setTransactionsData(formattedBookings.filter(booking => booking.statusBooking === "paid")); // Contoh filtering untuk transaksi
        } catch (error) {
            console.error("Failed to fetch bookings:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleTabPress = (tab, index) => {
        setActiveTab(tab);
        scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
    };

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / width);
        const tab = index === 0 ? "bookings" : "transactions";
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#E11D48" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header />
            <TabBar activeTab={activeTab} scrollX={scrollX} handleTabPress={handleTabPress} />

            <Animated.ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                onMomentumScrollEnd={handleScroll}
                scrollEventThrottle={16}
            >
                <View style={[styles.page]}>
                    <FlatList
                        data={bookingsData}
                        renderItem={({ item }) => <BookingCard item={item} />}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <View style={[styles.page]}>
                    <FlatList
                        data={transactionsData}
                        renderItem={({ item }) => <TransactionCard item={item} />}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    listContainer: {
        padding: 20,
    },
    page: {
        width: width,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
});
