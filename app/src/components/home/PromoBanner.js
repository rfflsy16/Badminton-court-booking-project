import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Dimensions } from "react-native";
import { promoData } from "../../data/promoData";
import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useEffect } from 'react';

const { width } = Dimensions.get('window');
const PADDING = 20;
const CARD_MARGIN = 8;

export default function PromoBanner() {
    const badgeScale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const pulseAnimation = Animated.sequence([
            Animated.timing(badgeScale, {
                toValue: 1.1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(badgeScale, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        ]);

        Animated.loop(pulseAnimation).start();
    }, []);

    return (
        <View style={styles.section}>
            {/* Featured Promo - Full Width */}
            <TouchableOpacity style={styles.featuredCard}>
                <Image 
                    source={{ uri: promoData[0].image }} 
                    style={styles.featuredImage}
                />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.gradient}
                />
                <Animated.View 
                    style={[
                        styles.limitedBadge,
                        { transform: [{ scale: badgeScale }] }
                    ]}
                >
                    <Text style={styles.limitedText}>HOT DEAL! 🔥</Text>
                </Animated.View>
                <View style={styles.promoContent}>
                    <View style={styles.discountContainer}>
                        <Text style={styles.discountText}>{promoData[0].discount}</Text>
                        <Text style={styles.offText}>OFF</Text>
                    </View>
                    <Text style={styles.promoTitle}>{promoData[0].title}</Text>
                    <Text style={styles.promoDescription}>{promoData[0].description}</Text>
                    <View style={styles.codeBox}>
                        <Text style={styles.promoCode}>Use: {promoData[0].code}</Text>
                    </View>
                </View>
            </TouchableOpacity>

            {/* Secondary Promos - 2 Columns */}
            <View style={styles.secondaryContainer}>
                {promoData.slice(1, 3).map((promo) => (
                    <TouchableOpacity 
                        key={promo.id} 
                        style={styles.secondaryCard}
                    >
                        <Image 
                            source={{ uri: promo.image }} 
                            style={styles.secondaryImage}
                        />
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.8)']}
                            style={styles.gradient}
                        />
                        <View style={styles.secondaryContent}>
                            <View style={styles.discountTag}>
                                <Text style={styles.discountTagText}>{promo.discount}</Text>
                            </View>
                            <Text style={styles.secondaryTitle}>{promo.title}</Text>
                            <Text style={styles.codeText}>{promo.code}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        padding: PADDING,
        gap: 12,
    },
    featuredCard: {
        width: '100%',
        height: 200,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    featuredImage: {
        width: '100%',
        height: '100%',
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    limitedBadge: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: '#EA580C',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    limitedText: {
        color: '#fff',
        fontWeight: '800',
        fontSize: 12,
    },
    promoContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
    },
    discountContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 8,
    },
    discountText: {
        fontSize: 32,
        fontWeight: '800',
        color: '#fff',
    },
    offText: {
        marginLeft: 4,
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    promoTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    promoDescription: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.9,
        marginBottom: 8,
    },
    codeBox: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    promoCode: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 12,
    },
    secondaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    secondaryCard: {
        flex: 1,
        height: 160,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    secondaryImage: {
        width: '100%',
        height: '100%',
    },
    secondaryContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 12,
    },
    discountTag: {
        backgroundColor: '#EA580C',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    discountTagText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 12,
    },
    secondaryTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    codeText: {
        fontSize: 12,
        color: '#fff',
        opacity: 0.9,
    },
});