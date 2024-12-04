import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function CourtReviews({ reviews }) {
    return (
        <View style={styles.section}>
            <View style={styles.reviewHeader}>
                <Text style={styles.sectionTitle}>Reviews</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
            </View>
            {reviews.map((review) => (
                <View key={review.id} style={styles.reviewItem}>
                    <View style={styles.reviewHeader}>
                        <Text style={styles.reviewUser}>{review.user}</Text>
                        <View style={styles.reviewRating}>
                            {[...Array(review.rating)].map((_, i) => (
                                <Ionicons key={i} name="star" size={14} color="#EA580C" />
                            ))}
                        </View>
                    </View>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                    <Text style={styles.reviewComment}>{review.comment}</Text>
                </View>
            ))}
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
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    seeAll: {
        fontSize: 14,
        color: '#EA580C',
        fontWeight: '600',
    },
    reviewItem: {
        backgroundColor: '#F8FAFC',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    reviewUser: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1F2937',
    },
    reviewRating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewDate: {
        fontSize: 13,
        color: '#64748B',
        marginTop: 4,
        marginBottom: 8,
    },
    reviewComment: {
        fontSize: 14,
        color: '#1F2937',
        lineHeight: 20,
    },
});