import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';

const venuesData = [
    {
        id: '1',
        name: 'GOR Senayan',
        location: 'Jakarta Pusat',
        rating: 4.8,
        courts: 6,
        price: 'Rp 75.000/hour',
        image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: '2',
        name: 'Sport Center 88',
        location: 'Jakarta Selatan',
        rating: 4.6,
        courts: 4,
        price: 'Rp 60.000/hour',
        image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: '3',
        name: 'Gelora Arena',
        location: 'Jakarta Timur',
        rating: 4.7,
        courts: 8,
        price: 'Rp 65.000/hour',
        image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070&auto=format&fit=crop'
    },
];

const VenueCard = ({ venue }) => (
    <TouchableOpacity style={styles.card}>
        <Image source={{ uri: venue.image }} style={styles.venueImage} />
        <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
                <Text style={styles.venueName}>{venue.name}</Text>
                <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#EA580C" />
                    <Text style={styles.rating}>{venue.rating}</Text>
                </View>
            </View>
            <View style={styles.locationContainer}>
                <Ionicons name="location-outline" size={16} color="#94A3B8" />
                <Text style={styles.locationText}>{venue.location}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.detail}>
                    <MaterialCommunityIcons name="badminton" size={16} color="#94A3B8" />
                    <Text style={styles.detailText}>{venue.courts} Courts</Text>
                </View>
                <Text style={styles.price}>{venue.price}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

export default function Venues() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredVenues = venuesData.filter(venue =>
        venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Venues</Text>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <Ionicons name="search-outline" size={20} color="#94A3B8" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search venues..."
                        placeholderTextColor="#94A3B8"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="options-outline" size={20} color="#1F2937" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={filteredVenues}
                renderItem={({ item }) => <VenueCard venue={item} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
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
    searchContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingBottom: 12,
        gap: 12,
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        borderRadius: 12,
        paddingHorizontal: 12,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 44,
        fontSize: 16,
        color: '#1F2937',
    },
    filterButton: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
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
    venueImage: {
        width: '100%',
        height: 180,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    cardContent: {
        padding: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    venueName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
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
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detail: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        marginLeft: 4,
        fontSize: 14,
        color: '#64748B',
    },
    price: {
        fontSize: 14,
        fontWeight: '600',
        color: '#EA580C',
    },
});
