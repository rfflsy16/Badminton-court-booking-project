import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView, Dimensions, Animated } from "react-native";
import { useState, useRef } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// Get screen width for sliding
const { width } = Dimensions.get('window');
const tabWidth = (width - 40) / 2; // 40 is total horizontal padding (20 * 2)

// Dummy data for bookings and favorites
const bookingsData = [
    {
        id: '1',
        venueName: 'GOR Senayan',
        courtNumber: 'Court 1',
        date: '15 Mar 2024',
        time: '09:00 - 10:00',
        status: 'Upcoming',
        price: 'Rp 75.000',
        image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: '2',
        venueName: 'Sport Center 88',
        courtNumber: 'Court 3',
        date: '18 Mar 2024',
        time: '16:00 - 17:00',
        status: 'Upcoming',
        price: 'Rp 60.000',
        image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070&auto=format&fit=crop'
    },
];

const favoritesData = [
    {
        id: '1',
        venueName: 'Gelora Arena',
        courtNumber: 'Court 2',
        rating: 4.8,
        price: 'Rp 65.000/hour',
        location: 'Jakarta Timur',
        image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: '2',
        venueName: 'GOR Senayan',
        courtNumber: 'Court 4',
        rating: 4.9,
        price: 'Rp 75.000/hour',
        location: 'Jakarta Pusat',
        image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070&auto=format&fit=crop'
    },
];

export default function Booking() {
    const [activeTab, setActiveTab] = useState('bookings');
    const scrollViewRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    const indicatorPosition = scrollX.interpolate({
        inputRange: [0, width],
        outputRange: [0, tabWidth],
    });

    const handleTabPress = (tab, index) => {
        setActiveTab(tab);
        scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
    };

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / width);
        const tab = index === 0 ? 'bookings' : 'favorites';
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    const renderBookingCard = ({ item }) => (
        <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <View>
                        <Text style={styles.venueName}>{item.venueName}</Text>
                        <Text style={styles.courtNumber}>{item.courtNumber}</Text>
                    </View>
                    <View style={[styles.statusBadge, 
                        { backgroundColor: item.status === 'Upcoming' ? '#FEF3C7' : '#F3F4F6' }
                    ]}>
                        <Text style={[styles.statusText, 
                            { color: item.status === 'Upcoming' ? '#D97706' : '#6B7280' }
                        ]}>{item.status}</Text>
                    </View>
                </View>
                <View style={styles.bookingDetails}>
                    <View style={styles.detailItem}>
                        <Ionicons name="calendar-outline" size={16} color="#94A3B8" />
                        <Text style={styles.detailText}>{item.date}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Ionicons name="time-outline" size={16} color="#94A3B8" />
                        <Text style={styles.detailText}>{item.time}</Text>
                    </View>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{item.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderFavoriteCard = ({ item }) => (
        <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <View>
                        <Text style={styles.venueName}>{item.venueName}</Text>
                        <Text style={styles.courtNumber}>{item.courtNumber}</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={16} color="#EA580C" />
                        <Text style={styles.rating}>{item.rating}</Text>
                    </View>
                </View>
                <View style={styles.locationContainer}>
                    <Ionicons name="location-outline" size={16} color="#94A3B8" />
                    <Text style={styles.locationText}>{item.location}</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{item.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Courts</Text>
            </View>

            <View style={styles.tabContainer}>
                <View style={styles.tabsWrapper}>
                    <TouchableOpacity 
                        style={[styles.tab]}
                        onPress={() => handleTabPress('bookings', 0)}
                    >
                        <Text style={[
                            styles.tabText,
                            activeTab === 'bookings' && styles.activeTabText
                        ]}>My Bookings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.tab]}
                        onPress={() => handleTabPress('favorites', 1)}
                    >
                        <Text style={[
                            styles.tabText,
                            activeTab === 'favorites' && styles.activeTabText
                        ]}>Favorites</Text>
                    </TouchableOpacity>
                    <Animated.View 
                        style={[
                            styles.activeIndicator,
                            {
                                transform: [{ translateX: indicatorPosition }],
                                width: tabWidth,
                            }
                        ]} 
                    />
                </View>
            </View>

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
                        renderItem={renderBookingCard}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <View style={[styles.page]}>
                    <FlatList
                        data={favoritesData}
                        renderItem={renderFavoriteCard}
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
    header: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    tabContainer: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#fff',
    },
    tabsWrapper: {
        flexDirection: 'row',
        position: 'relative',
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },
    activeIndicator: {
        position: 'absolute',
        bottom: 0,
        height: 3,
        backgroundColor: '#EA580C',
        borderRadius: 4,
    },
    tabText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#94A3B8',
    },
    activeTabText: {
        color: '#1F2937',
        fontWeight: '700',
    },
    listContainer: {
        padding: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    cardImage: {
        width: '100%',
        height: 160,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    cardContent: {
        padding: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    venueName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    courtNumber: {
        fontSize: 14,
        color: '#64748B',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
    },
    bookingDetails: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    detailText: {
        marginLeft: 4,
        fontSize: 14,
        color: '#64748B',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    locationText: {
        marginLeft: 4,
        fontSize: 14,
        color: '#94A3B8',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        marginLeft: 4,
        fontSize: 14,
        fontWeight: '500',
        color: '#1F2937',
    },
    priceContainer: {
        marginTop: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        color: '#EA580C',
    },
    page: {
        width: width,
    },
});
