import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export default function Maps() {
    const route = useRoute();
    const navigation = useNavigation();
    const { location, courtName } = route.params;
    const [isMapReady, setIsMapReady] = useState(false);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    ...location,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                onMapReady={() => setIsMapReady(true)}
            >
                {isMapReady && (
                    <Marker
                        coordinate={location}
                        title={courtName}
                        description="Premium Badminton Court"
                    >
                        <View style={styles.customMarker}>
                            <View style={styles.markerContent}>
                                <Ionicons name="location" size={20} color="#fff" />
                            </View>
                        </View>
                    </Marker>
                )}
            </MapView>
            <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    customMarker: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    markerContent: {
        width: 36,
        height: 36,
        borderRadius: 18,
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
    },
});
