import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    TabView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomTabNavigator from '../components/BottomTabNavigator';

const carouselData = [
    {
        id: '1',
        image: 'https://cove-blog-id.sgp1.cdn.digitaloceanspaces.com/cove-blog-id/2023/12/GOR-Cempaka-Putih--2-.webp',
        title: 'GOR Cempaka Putih',
    },
    {
        id: '2',
        image: 'https://cove-blog-id.sgp1.cdn.digitaloceanspaces.com/cove-blog-id/2023/12/GOR-Cempaka-Putih--2-.webp',
        title: 'GOR Senayan',
    },
    {
        id: '3',
        image: 'https://cove-blog-id.sgp1.cdn.digitaloceanspaces.com/cove-blog-id/2023/12/GOR-Cempaka-Putih--2-.webp',
        title: 'GOR Rawamangun',
    },
];

const popularCourts = [
    {
        id: '1',
        name: 'Shuttle Arena',
        image: 'https://via.placeholder.com/300',
        price: 'Rp 150.000/jam',
    },
    {
        id: '2',
        name: 'Smash Court',
        image: 'https://via.placeholder.com/300',
        price: 'Rp 200.000/jam',
    },
    {
        id: '3',
        name: 'Rally Zone',
        image: 'https://via.placeholder.com/300',
        price: 'Rp 180.000/jam',
    },
];

export default function Home() {
    const [index, setIndex] = useState(0);
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <Image source={require('../../assets/logo3.png')} style={styles.logo} />
                <Text style={styles.title}>Shuttlecock Space</Text>
                <Ionicons name="notifications-outline" size={24} color="#333" />
            </View>

            {/* Search Section */}
            <View style={styles.searchSection}>
                {/* <Text style={styles.tagline}>#BadmintonSehat</Text>
                <Text style={styles.subTagline}>Cari & Booking Lapangan Mudah</Text> */}
                <View style={styles.searchBox}>
                    <Ionicons name="search" size={20} color="#aaa" />
                    <TextInput
                        placeholder="Mau cari lapangan di mana?"
                        placeholderTextColor="#aaa"
                        style={styles.searchInput}
                    />
                </View>
            </View>

            {/* Featured Courts */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>GOR Terdekat</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalScrollContainer}
                >
                    {carouselData.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.card}>
                            <Image source={{ uri: item.image }} style={styles.cardImage} />
                            <Text style={styles.cardTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Popular Courts */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Populer di Sekitar</Text>
                {popularCourts.map((court) => (
                    <TouchableOpacity key={court.id} style={styles.popularCard}>
                        <Image source={{ uri: court.image }} style={styles.popularCardImage} />
                        <View style={styles.popularCardInfo}>
                            <Text style={styles.popularCardTitle}>{court.name}</Text>
                            <Text style={styles.popularCardPrice}>{court.price}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Offers Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Penawaran Spesial</Text>
                <View style={styles.offerCard}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/600x300' }}
                        style={styles.offerImage}
                    />
                    <View style={styles.offerInfo}>
                        <Text style={styles.offerTitle}>Diskon 20% untuk Booking Pertama!</Text>
                        <Text style={styles.offerSubtitle}>Gunakan kode FIRST20 saat checkout.</Text>
                    </View>
                </View>
            </View>
            <View style={styles.container}>

                {/* <View style={styles.bottomNav}>
                    <TouchableOpacity>
                        <Ionicons name="home-outline" size={24} color={index === 0 ? "black" : "gray"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate.navigate("SearchUsers")}>
                        <Ionicons name="search-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Ionicons name="log-out-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View> */}
                <View style={{ flex: 1 }}>
                    <BottomTabNavigator />
                </View>
            </View>
        </ScrollView>
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
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    logo: {
        width: 40,
        height: 40,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    searchSection: {
        padding: 16,
    },
    tagline: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    subTagline: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    searchInput: {
        marginLeft: 8,
        fontSize: 14,
        flex: 1,
    },
    section: {
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        paddingHorizontal: 16,
    },
    horizontalScrollContainer: {
        paddingLeft: 16,
    },
    card: {
        width: 200,
        marginRight: 15,
    },
    cardImage: {
        width: '100%',
        height: 120,
        borderRadius: 8,
    },
    cardTitle: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    popularCard: {
        flexDirection: 'row',
        marginBottom: 15,
        marginHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    popularCardImage: {
        width: 100,
        height: 100,
    },
    popularCardInfo: {
        flex: 1,
        padding: 10,
    },
    popularCardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    popularCardPrice: {
        fontSize: 14,
        color: '#EA580C',
        fontWeight: '600',
    },
    offerCard: {
        marginHorizontal: 16,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    offerImage: {
        width: '100%',
        height: 150,
    },
    offerInfo: {
        padding: 10,
    },
    offerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    offerSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: 'gray',
        backgroundColor: '#fff',
        marginBottom: 20,
    },
});
