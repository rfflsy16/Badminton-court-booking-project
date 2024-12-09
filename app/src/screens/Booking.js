import { View, StyleSheet, FlatList, Animated, Dimensions, ActivityIndicator, Alert, Text } from "react-native";
import { useState, useRef, useEffect, useCallback } from "react";
import Header from "../components/booking/Header";
import TabBar from "../components/booking/TabBar";
import BookingCard from "../components/booking/BookingCard";
import TransactionCard from "../components/booking/TransactionCard.js";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { format, parseISO, isToday, isPast, isFuture, startOfDay } from 'date-fns';

const { width } = Dimensions.get("window");

export default function Booking({ route }) {
    const [activeTab, setActiveTab] = useState("bookings");
    const scrollViewRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    const [bookingsData, setBookingsData] = useState([]);
    const [transactionsData, setTransactionsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userToken, setUserToken] = useState("");

    useEffect(() => {
        if (route.params?.screen) {
            const index = route.params.screen === "transactions" ? 1 : 0;
            setActiveTab(route.params.screen);
            scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
        }
    }, [route.params]);

    useEffect(() => {
        async function getToken() {
            const token = await SecureStore.getItemAsync('userToken');
            console.log(token, "tokennn")
            setUserToken(token);
        }
        getToken();
    },[])

    useFocusEffect(
        useCallback(() => {
            if (userToken) {
                const fetchAllData = async () => {
                    try {
                        setLoading(true);
                        await fetchData(); // Fetch bookings first
                        await fetchDataTransaction(); // Then fetch transactions
                    } catch (error) {
                        Alert.alert(
                            "Error",
                            "Failed to fetch your bookings. Please try again.",
                            [{ text: "OK" }]
                        );
                    } finally {
                        setLoading(false);
                    }
                };
                
                fetchAllData();
            }
        }, [userToken])
    );

    const fetchData = async () => {
        try {
            if (!userToken) return;

            const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/booking/user`, {
                headers: {              
                    Authorization: `Bearer ${userToken}` 
                }
            });
            
            const bookings = response.data;
            const formatTimeRange = (timeArray) => {
                return timeArray
                    .map(hour => `${hour < 10 ? `0${hour}` : hour}:00`)
                    .join("-");
            };
            console.log(bookings)
            const formattedBookings = bookings.map(booking => {
                const bookingDate = parseISO(booking.date);
                const today = startOfDay(new Date());
                const bookingStartOfDay = startOfDay(bookingDate);
                let dynamicStatus;
                
                if (bookingStartOfDay < today) {
                    dynamicStatus = "Expired";
                } else if (bookingStartOfDay.getTime() === today.getTime()) {
                    dynamicStatus = "Today";
                } else {
                    dynamicStatus = "Upcoming";
                }

                return {
                    _id: booking._id,
                    venueName: booking.building.name || "Unknown Venue",
                    courtNumber: booking.court.category || "Unknown Court",
                    courtId: booking.court._id || "Unknown Court Id",
                    location: booking.court.location || "Unknown Location",
                    date: booking.date,
                    rawDate: new Date(booking.date).getTime(),
                    time: formatTimeRange(booking.selectedTime),
                    status: dynamicStatus,
                    price: booking.totalPrice.toLocaleString("id-ID", { style: "currency", currency: "IDR" }),
                    image: booking.building.imgUrl || "https://via.placeholder.com/150",
                    courtId: booking.courtId,
                };
            })
            .sort((a, b) => b.rawDate - a.rawDate);

            setBookingsData(formattedBookings);
        } catch (error) {
            throw error;
        }
    };

    const fetchDataTransaction = async () => {
        try {
            if (!userToken) return;

            const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/booking/transaction/user`, {
                headers: {              
                    Authorization: `Bearer ${userToken}` 
                }
            });
            
            const transactions = response.data;
            const formatTimeRange = (timeArray) => {
                return timeArray
                    .map(hour => `${hour < 10 ? `0${hour}` : hour}:00`)
                    .join("-");
            };

            const formattedTransaction = transactions.map(transaction => {
                let status = transaction.statusBooking;
                if (transaction.paymentType === "full") {
                    status = "Paid";
                }
                if(transaction.paymentType === "dp") {
                    status = "Ongoing";
                }

                const transactionDate = parseISO(transaction.date);

                // For debugging
                console.log('Processing transaction:', {
                    transactionId: transaction._id,
                    date: transaction.date,
                    courtId: transaction.courtId
                });

                return {
                    _id: transaction._id, // Use _id consistently
                    venueName: transaction.building.name || "Unknown Venue",
                    courtNumber: transaction.court.type || "Unknown Court",
                    location: transaction.court.location || "Unknown Location",
                    city: transaction.building.city || "Unknown City",
                    courtId: transaction.courtId,
                    paymentType: transaction.paymentType,
                    date: transaction.date,
                    rawDate: new Date(transaction.date).getTime(),
                    time: formatTimeRange(transaction.selectedTime),
                    status: status,
                    price: transaction.totalPrice.toLocaleString("id-ID", { style: "currency", currency: "IDR" }),
                    image: transaction.building.imgUrl || "https://via.placeholder.com/150",
                    selectedTime: transaction.selectedTime
                };
            })
            .sort((a, b) => b.rawDate - a.rawDate);

            setTransactionsData(formattedTransaction);
        } catch (error) {
            throw error;
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

    const EmptyState = ({ message }) => (
        <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={64} color="#94A3B8" />
            <Text style={styles.emptyText}>{message}</Text>
        </View>
    );

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
                    {bookingsData.length > 0 ? (
                        <FlatList
                            data={bookingsData}
                            renderItem={({ item }) => <BookingCard item={item} />}
                            keyExtractor={(item) => item._id}
                            contentContainerStyle={styles.listContainer}
                            showsVerticalScrollIndicator={false}
                        />
                    ) : (
                        <EmptyState message="No bookings yet" />
                    )}
                </View>
                <View style={[styles.page]}>
                    {transactionsData.length > 0 ? (
                        <FlatList
                            data={transactionsData}
                            renderItem={({ item }) => <TransactionCard item={item} />}
                            keyExtractor={(item) => item._id}
                            contentContainerStyle={styles.listContainer}
                            showsVerticalScrollIndicator={false}
                        />
                    ) : (
                        <EmptyState message="No transactions yet" />
                    )}
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
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 40,
        backgroundColor: "#fff",
    },
    emptyText: {
        marginTop: 16,
        fontSize: 16,
        color: "#64748B",
        fontWeight: "500",
    },
});
