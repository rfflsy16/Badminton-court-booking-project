import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from 'react-native-maps';

export default function CourtMap({
    court,
    onNavigate,
    onShare
}) {
    const coordinates = court?.buildingDetails?.location?.coordinates || [-6.2088, 106.8456];
    const longitude = coordinates[0];
    const latitude = coordinates[1];

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude,
                        longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude,
                            longitude,
                        }}
                        title={court?.buildingDetails?.name || ''}
                        description={court?.buildingDetails?.address || ''}
                    >
                        <View style={styles.customMarker}>
                            <View style={styles.markerContent}>
                                <Ionicons name="location" size={20} color="#fff" />
                            </View>
                        </View>
                    </Marker>
                </MapView>
                <View style={styles.mapOverlay}>
                    <View style={styles.mapActions}>
                        <TouchableOpacity
                            style={styles.mapActionButton}
                            onPress={onNavigate}
                        >
                            <Ionicons name="navigate" size={20} color="#1F2937" />
                            <Text style={styles.mapActionText}>Navigate</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.mapActionButton}
                            onPress={onShare}
                        >
                            <Ionicons name="share-outline" size={20} color="#1F2937" />
                            <Text style={styles.mapActionText}>Share</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 16,
        letterSpacing: 0.5,
    },
    mapContainer: {
        height: 250,
        borderRadius: 16,
        overflow: 'hidden',
        marginTop: 12,
        position: 'relative',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
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
    mapOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        paddingHorizontal: 16,
        paddingBottom: 16,
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    mapActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 'auto',
    },
    mapActionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    mapActionText: {
        marginLeft: 4,
        fontSize: 14,
        fontWeight: '500',
        color: '#1F2937',
    },
});
