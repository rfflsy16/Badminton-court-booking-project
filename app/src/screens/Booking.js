import { View, StyleSheet, FlatList, Animated, Dimensions } from "react-native";
import { useState, useRef } from "react";
import Header from "../components/booking/Header";
import TabBar from "../components/booking/TabBar";
import BookingCard from "../components/booking/BookingCard";
import TransactionCard from "../components/booking/TransactionCard.js";
import { bookingsData, transactionsData } from "../data/bookingData.js";

const { width } = Dimensions.get('window');

export default function Booking() {
    const [activeTab, setActiveTab] = useState('bookings');
    const scrollViewRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    const handleTabPress = (tab, index) => {
        setActiveTab(tab);
        scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
    };

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / width);
        const tab = index === 0 ? 'bookings' : 'transactions';
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    return (
        <View style={styles.container}>
            <Header />
            <TabBar 
                activeTab={activeTab}
                scrollX={scrollX}
                handleTabPress={handleTabPress}
            />

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
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <View style={[styles.page]}>
                    <FlatList
                        data={transactionsData}
                        renderItem={({ item }) => <TransactionCard item={item} />}
                        keyExtractor={item => item.id}
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
        backgroundColor: '#fff',
    },
    listContainer: {
        padding: 20,
    },
    page: {
        width: width,
    },
});
