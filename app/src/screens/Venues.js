import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


const VenueCard = ({ venue }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('BuildingCourts', { venue })}
        >
            <Image source={{ uri: venue.imgUrl }} style={styles.venueImage} />
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                     <Text style={styles.venueName}>{venue.name}</Text>
                     <View style={styles.ratingContainer}>
                         <Ionicons name="star" size={16} color="#EA580C" />
                         <Text style={styles.rating}>4.7</Text>
                     </View>
                 </View>
                 <View style={styles.locationContainer}>
                     <Ionicons name="location-outline" size={16} color="#94A3B8" />
                     <Text style={styles.locationText}>{venue.address}</Text>
                 </View>
                 <View style={styles.detailsContainer}>
                     <View style={styles.detail}>
                         <MaterialCommunityIcons name="badminton" size={16} color="#94A3B8" />
                         <Text style={styles.detailText}>{venue.courts.length} Courts</Text>
                     </View>
                     <Text style={styles.price}>{venue.price}</Text>
                 </View>
            </View>
        </TouchableOpacity>
    );
};

export default function Venues() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [sortBy, setSortBy] = useState(null); // 'price_low', 'price_high', 'rating' atau JABODETABEK
    const [buildings, setBuildings] = useState([])
    const [userToken, setUserToken] = useState("");


    useEffect(() => {
        async function getToken() {
            const token = await SecureStore.getItemAsync('userToken');
            setUserToken(token);
        }
        getToken();
    
    },[])

    useEffect(() => {
        getBuildings();
    },[userToken])

    const getBuildings = async () => {          
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/buildings`,{
                headers: {              
                    Authorization: `Bearer ${userToken}` 
                }
            })
            setBuildings(response.data.buildings)
            // console.log(response.data.buildings)
        } catch (error) {
            console.log(error)
        }
    }

    const filteredAndSortedVenues = () => {
        let venues = buildings.filter(venue =>
            venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            venue.address.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (sortBy) {
            venues = [...venues].sort((a, b) => {
                if (sortBy === 'price_low') {
                    return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''));
                }
                if (sortBy === 'price_high') {
                    return parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, ''));
                }
                if (sortBy === 'rating') {
                    return b.rating - a.rating;
                }
                return 0;
            });
        }

        return venues;
    };

    const handleSort = (type) => {
        setSortBy(type);
        setShowFilterModal(false);
    };

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
                <TouchableOpacity 
                    style={styles.filterButton}
                    onPress={() => setShowFilterModal(true)}
                >
                    <Ionicons name="options-outline" size={20} color="#1F2937" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredAndSortedVenues()}
                renderItem={({ item }) => <VenueCard venue={item} />}
                keyExtractor={item => item._id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />

            {/* Filter Modal */}
            <Modal
                visible={showFilterModal}
                transparent
                animationType="slide"
                onRequestClose={() => setShowFilterModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Sort By</Text>
                            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                                <Ionicons name="close" size={24} color="#1F2937" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity 
                            style={[styles.sortOption, sortBy === 'price_low' && styles.selectedOption]}
                            onPress={() => handleSort('price_low')}
                        >
                            <Text style={[styles.sortText, sortBy === 'price_low' && styles.selectedText]}>
                                Price: Low to High
                            </Text>
                            {sortBy === 'price_low' && (
                                <Ionicons name="checkmark" size={20} color="#EA580C" />
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.sortOption, sortBy === 'price_high' && styles.selectedOption]}
                            onPress={() => handleSort('price_high')}
                        >
                            <Text style={[styles.sortText, sortBy === 'price_high' && styles.selectedText]}>
                                Price: High to Low
                            </Text>
                            {sortBy === 'price_high' && (
                                <Ionicons name="checkmark" size={20} color="#EA580C" />
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.sortOption, sortBy === 'rating' && styles.selectedOption]}
                            onPress={() => handleSort('rating')}
                        >
                            <Text style={[styles.sortText, sortBy === 'rating' && styles.selectedText]}>
                                Highest Rating
                            </Text>
                            {sortBy === 'rating' && (
                                <Ionicons name="checkmark" size={20} color="#EA580C" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        minHeight: 300,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1F2937',
    },
    sortOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 4,
        borderRadius: 12,
    },
    selectedOption: {
        backgroundColor: '#FFF7ED',
    },
    sortText: {
        fontSize: 16,
        color: '#1F2937',
    },
    selectedText: {
        color: '#EA580C',
        fontWeight: '500',
    },
});
