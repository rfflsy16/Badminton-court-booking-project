import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Platform, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";

const Maps = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { location, courtName } = route.params || {};
    const [region, setRegion] = useState(null);

    useEffect(() => {
        console.log('Received location:', location);
        if (location?.latitude && location?.longitude) {
            const newRegion = {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            };
            console.log('Setting region:', newRegion);
            setRegion(newRegion);
        } else {
            console.log('Invalid location data received');
        }
    }, [location]);

    if (!region) {
        console.log('Region not yet set');
        return <View style={styles.container} />;
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <MapView
                style={styles.map}
                initialRegion={region}
                region={region}
            >
                <Marker
                    coordinate={{
                        latitude: region.latitude,
                        longitude: region.longitude
                    }}
                    title={courtName}
                />
            </MapView>
            
            <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        ...StyleSheet.absoluteFillObject
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    backButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 40,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#EA580C',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 1
    }
});

export default Maps;
