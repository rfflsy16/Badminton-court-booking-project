import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const CourtCard = ({ court, index }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('CourtDetail', { court })}
        >
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <Text style={styles.courtName}>{`Court ${String.fromCharCode(65 + index)}`}</Text>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={16} color="#EA580C" />
                        <Text style={styles.rating}>4.7</Text>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <View style={[styles.typeContainer, {
                        backgroundColor: court.type === 'Premium' ? '#EEF2FF' : '#ECFDF5',
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 6,
                    }]}>
                        <MaterialCommunityIcons 
                            name="medal" 
                            size={16} 
                            color={court.type === 'Premium' ? '#818CF8' : '#6EE7B7'} 
                        />
                        <Text style={[styles.typeText, {
                            color: court.type === 'Premium' ? '#818CF8' : '#6EE7B7'
                        }]}>{court.type}</Text>
                    </View>
                    <View style={[styles.courtTypeContainer, {
                        backgroundColor: '#F1F5F9',
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 6,
                    }]}>
                        <MaterialCommunityIcons 
                            name={court.category === 'Indoor' ? 'home-variant' : 'tree'} 
                            size={16} 
                            color="#64748B" 
                        />
                        <Text style={styles.courtTypeText}>{court.category}</Text>
                    </View>
                </View>

                <View style={styles.facilitiesContainer}>
                    {court.facilities?.map((facility, index) => (
                        <View key={index} style={styles.facilityItem}>
                            <MaterialCommunityIcons 
                                name={
                                    facility === 'AC' ? 'air-conditioner' :
                                    facility === 'Toilet' ? 'toilet' :
                                    'locker'
                                } 
                                size={14} 
                                color="#64748B" 
                            />
                            <Text style={styles.facilityText}>{facility}</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.price}>
                    {new Intl.NumberFormat('id-ID', { 
                        style: 'currency', 
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    }).format(court.price)}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default function BuildingCourts() {
    const route = useRoute();
    const navigation = useNavigation();
    const { venue } = route.params;
    const [userToken, setUserToken] = useState("");
    const [courtsData, setCourtsData] = useState([]);

    useEffect(() => {
        async function getToken() {
            const token = await SecureStore.getItemAsync('userToken');
            setUserToken(token);
        }
        getToken();
    },[])

    useEffect(() => {
        getBuildingById()
    },[userToken])

    const getBuildingById = async () => {          
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/buildings/${venue._id}`,{
                headers: {              
                    Authorization: `Bearer ${userToken}` 
                }
            })
            setCourtsData(response.data.courts)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text style={styles.title}>{venue.name}</Text>
                <View style={styles.headerRight} />
            </View>

            {/* Building Info */}
            <View style={styles.buildingInfo}>
                <View style={styles.infoItem}>
                    <Ionicons name="location-outline" size={20} color="#64748B" />
                    <Text style={styles.infoText}>{venue.city}</Text>
                </View>
                <View style={styles.infoItem}>
                    <MaterialCommunityIcons name="badminton" size={20} color="#64748B" />
                    <Text style={styles.infoText}>{venue?.courts?.length} Courts</Text>
                </View>
            </View>

            {/* Courts List */}
            <FlatList
                data={courtsData}
                renderItem={({ item, index }) => <CourtCard court={item} index={index} />}
                keyExtractor={item => item._id.toString()}
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 12,
    },
    backButton: {
        padding: 8,
    },
    headerRight: {
        width: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1F2937',
    },
    buildingInfo: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingBottom: 16,
        gap: 24,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#64748B',
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
    cardContent: {
        padding: 16,
        gap: 12,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    courtName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF7ED',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        gap: 4,
    },
    rating: {
        fontSize: 14,
        fontWeight: '500',
        color: '#EA580C',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    typeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    typeText: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '500',
    },
    courtTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    courtTypeText: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '500',
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        color: '#EA580C',
    },
    facilitiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 4,
    },
    facilityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 4,
    },
    facilityText: {
        fontSize: 12,
        color: '#64748B',
    },
});