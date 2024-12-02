import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { courtsData } from "../../data/courtsData.js";
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { venuesData } from '../../data/venuesData';
import axios from 'axios';

export default function FeaturedCourts() {
    const navigation = useNavigation();
    const [nearestCourts, setNearestCourts] = useState([]);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    
    useEffect(() => {
        async function getCurrentLocation() {
          let location = await Location.getCurrentPositionAsync({});
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude)
        }
        getCurrentLocation();
      }, []);



      
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Nearby Courts</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
            </View>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.featuredContainer}
            >
                {nearestCourts.map((court) => (
                    <TouchableOpacity 
                        key={court.id} 
                        style={styles.featuredCard}
                        onPress={() => navigation.navigate('CourtDetail', { court })}
                    >
                        <Image
                            source={{ uri: court.image }}
                            style={styles.courtImage}
                        />
                        <View style={[styles.badge, {
                            backgroundColor: court.type === 'Premium' ? '#818CF8' : '#6EE7B7'
                        }]}>
                            <Text style={styles.badgeText}>{court.type}</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.courtName}>{court.name}</Text>
                            <View style={styles.infoRow}>
                                <View style={styles.courtTypeContainer}>
                                    <MaterialCommunityIcons 
                                        name={court.courtType === 'Indoor' ? 'home-variant' : 'tree'} 
                                        size={14} 
                                        color="#64748B" 
                                    />
                                    <Text style={styles.courtTypeText}>{court.courtType}</Text>
                                </View>
                                <View style={styles.locationContainer}>
                                    <Ionicons name="location-outline" size={14} color="#64748B" />
                                    <Text style={styles.locationText} numberOfLines={1}>
                                        {court.location.address}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.infoRow}>
                                <View style={styles.ratingContainer}>
                                    <Ionicons name="star" size={14} color="#F59E0B" />
                                    <Text style={styles.rating}>{court.rating}</Text>
                                    <Text style={styles.reviews}>({court.reviews})</Text>
                                </View>
                                {court.distance && (
                                    <Text style={styles.distance}>
                                        {court.distance.toFixed(1)} km
                                    </Text>
                                )}
                            </View>
                            <View style={styles.priceRow}>
                                <Text style={styles.price}>{court.price}</Text>
                                <Text style={styles.priceUnit}>/hour</Text>
                            </View>
                            <View style={styles.facilitiesRow}>
                                {court.facilities.slice(0, 3).map((facility, index) => (
                                    <View key={index} style={styles.facilityTag}>
                                        <MaterialCommunityIcons 
                                            name={
                                                facility === 'AC' ? 'air-conditioner' :
                                                facility === 'Shower' ? 'shower' :
                                                facility === 'WiFi' ? 'wifi' :
                                                facility === 'Parking' ? 'parking' :
                                                facility === 'Toilet' ? 'toilet' :
                                                facility === 'Locker' ? 'locker' : 
                                                'food'
                                            } 
                                            size={12} 
                                            color="#64748B" 
                                        />
                                        <Text style={styles.facilityText}>{facility}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        paddingVertical: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F2937',
    },
    seeAll: {
        fontSize: 14,
        color: '#115E59',
        fontWeight: '600',
    },
    featuredContainer: {
        paddingLeft: 20,
        paddingRight: 8,
        paddingBottom: 8,
    },
    featuredCard: {
        width: 300,
        marginRight: 16,
        marginBottom: 8,
        borderRadius: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        overflow: 'visible',
    },
    courtImage: {
        width: '100%',
        height: 160,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 16,
    },
    courtName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    locationText: {
        fontSize: 13,
        color: '#64748B',
        marginLeft: 4,
        flex: 1,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        marginLeft: 4,
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
    },
    reviews: {
        fontSize: 13,
        color: '#64748B',
        marginLeft: 2,
    },
    distance: {
        fontSize: 13,
        color: '#64748B',
        fontWeight: '500',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 12,
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#E11D48', // Changed to rose-600 - a vibrant contrasting color
    },
    priceUnit: {
        fontSize: 13,
        color: '#64748B',
        marginLeft: 4,
    },
    facilitiesRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    facilityTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: '#F1F5F9',
        borderRadius: 6,
    },
    facilityText: {
        fontSize: 12,
        color: '#64748B',
    },
    badge: {
        position: 'absolute',
        top: 12,
        right: 12,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    courtTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 4,
    },
    courtTypeText: {
        fontSize: 12,
        color: '#64748B',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginLeft: 8,
    },
});