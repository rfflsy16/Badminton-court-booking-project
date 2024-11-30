import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function FeaturedCourts() {
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
    );
}

const styles = StyleSheet.create({
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
});
