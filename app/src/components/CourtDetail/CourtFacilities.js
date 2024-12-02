import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

export default function CourtFacilities() {
    const facilities = [
        { icon: 'wifi', label: 'Free WiFi', type: 'ion', color: '#3B82F6' },
        { icon: 'local-parking', label: 'Parking Area', type: 'material', color: '#6366F1' },
        { icon: 'shower', label: 'Shower Room', type: 'fa5', color: '#EC4899' },
        { icon: 'restaurant', label: 'Canteen', type: 'ion', color: '#F59E0B' },
        { icon: 'water', label: 'Drinking Water', type: 'ion', color: '#0EA5E9' },
        { icon: 'door-closed', label: 'Locker Room', type: 'fa5', color: '#8B5CF6' },
        { icon: 'air-conditioner', label: 'AC Room', type: 'material-community', color: '#10B981' },
        { icon: 'store', label: 'Sport Store', type: 'material', color: '#F97316' },
        { icon: 'medical-services', label: 'First Aid', type: 'material', color: '#EF4444' },
    ];

    const renderIcon = (facility) => {
        const size = 28;
        switch (facility.type) {
            case 'ion':
                return <Ionicons name={facility.icon} size={size} color={facility.color} />;
            case 'material':
                return <MaterialIcons name={facility.icon} size={size} color={facility.color} />;
            case 'fa5':
                return <FontAwesome5 name={facility.icon} size={size-4} color={facility.color} />;
            case 'material-community':
                return <MaterialCommunityIcons name={facility.icon} size={size} color={facility.color} />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Facilities</Text>
            <View style={styles.facilitiesContainer}>
                {facilities.map((facility, index) => (
                    <View key={index} style={styles.facilityItem}>
                        <View style={styles.iconContainer}>
                            {renderIcon(facility)}
                        </View>
                        <Text style={styles.facilityLabel}>{facility.label}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 32,
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 32,
        letterSpacing: 0.5,
    },
    facilitiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -8,
    },
    facilityItem: {
        width: '33.33%',
        paddingHorizontal: 8,
        marginBottom: 20,
        alignItems: 'center',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    facilityLabel: {
        fontSize: 13,
        color: '#64748B',
        textAlign: 'center',
        fontWeight: '500',
    },
});