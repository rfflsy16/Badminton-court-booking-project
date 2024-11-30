import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
    const navigation = useNavigation();

    const featuredCourts = [
        {
            id: 1,
            name: 'Court 1',
            price: 'Rp 50.000',
            rating: '4.5',
            image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=3784&auto=format'
        },
        {
            id: 2,
            name: 'Court 2',
            price: 'Rp 50.000',
            rating: '4.5',
            image: 'https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?q=80&w=4140&auto=format&fit=crop'
        },
        {
            id: 3,
            name: 'Court 3',
            price: 'Rp 50.000',
            rating: '4.5',
            image: 'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?q=80&w=3776&auto=format&fit=crop'
        }
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Hello, User! 👋</Text>
                    <Text style={styles.subtitle}>Find and book your court</Text>
                </View>
                <TouchableOpacity style={styles.notificationButton}>
                    <Ionicons name="notifications-outline" size={24} color="#1F2937" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Featured Courts Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Featured Courts</Text>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.featuredContainer}
                    >
                        {featuredCourts.map((court) => (
                            <TouchableOpacity 
                                key={court.id} 
                                style={styles.featuredCard}
                                onPress={() => navigation.navigate('CourtDetail', { court })}
                            >
                                <Image
                                    source={{ uri: court.image }}
                                    style={styles.courtImage}
                                />
                                <View style={styles.cardContent}>
                                    <Text style={styles.courtName}>{court.name}</Text>
                                    <Text style={styles.courtPrice}>{court.price}/hour</Text>
                                    <View style={styles.ratingContainer}>
                                        <Ionicons name="star" size={16} color="#EA580C" />
                                        <Text style={styles.rating}>{court.rating}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.actionContainer}>
                        {[
                            { icon: 'calendar-outline', label: 'Book Court' },
                            { icon: 'time-outline', label: 'My Bookings' },
                            { icon: 'star-outline', label: 'Favorites' },
                            { icon: 'help-circle-outline', label: 'Help' },
                        ].map((action, index) => (
                            <TouchableOpacity key={index} style={styles.actionButton}>
                                <View style={styles.actionIcon}>
                                    <Ionicons name={action.icon} size={24} color="#EA580C" />
                                </View>
                                <Text style={styles.actionLabel}>{action.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Available Time Slots */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Today's Available Slots</Text>
                    <View style={styles.slotsContainer}>
                        {['09:00', '10:00', '13:00', '15:00'].map((time, index) => (
                            <TouchableOpacity key={index} style={styles.timeSlot}>
                                <Text style={styles.timeText}>{time}</Text>
                                <Text style={styles.availableText}>Available</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    subtitle: {
        fontSize: 16,
        color: '#94A3B8',
        marginTop: 4,
    },
    notificationButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 16,
    },
    featuredContainer: {
        paddingRight: 20,
    },
    featuredCard: {
        width: 280,
        marginRight: 16,
        borderRadius: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    courtImage: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 16,
    },
    courtName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    courtPrice: {
        fontSize: 14,
        color: '#EA580C',
        marginTop: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    rating: {
        marginLeft: 4,
        fontSize: 14,
        color: '#1F2937',
    },
    actionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    actionButton: {
        width: '48%',
        padding: 16,
        marginBottom: 16,
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        alignItems: 'center',
    },
    actionIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFF1E6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    actionLabel: {
        fontSize: 14,
        color: '#1F2937',
        fontWeight: '500',
    },
    slotsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    timeSlot: {
        width: '48%',
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        alignItems: 'center',
    },
    timeText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    availableText: {
        fontSize: 14,
        color: '#EA580C',
        marginTop: 4,
    },
});
