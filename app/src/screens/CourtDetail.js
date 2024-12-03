import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Share } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';import CourtCalendar from '../components/CourtDetail/CourtCalendar';
import CourtTimeSlots from '../components/CourtDetail/CourtTimeSlots';
import BookingModal from '../components/CourtDetail/BookingModal';
import CourtMap from '../components/CourtDetail/CourtMap';
import CourtReviews from '../components/CourtDetail/CourtReviews';
import CourtFacilities from '../components/CourtDetail/CourtFacilities';

export default function CourtDetail() {
    const route = useRoute();
    const navigation = useNavigation();
    const { court } = route.params;
    console.log(court._id, "<<<<<<< ini di court detail")
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [paymentType, setPaymentType] = useState('full');
    const [promoCode, setPromoCode] = useState('');
    const [promoDiscount, setPromoDiscount] = useState(0);
    const [showFullDesc, setShowFullDesc] = useState(false);
    const [courtDetails, setCourtDetails] = useState(null)
    const [userToken, setUserToken] = useState("");

    useEffect(() => {
        async function getToken() {
            const token = await SecureStore.getItemAsync('userToken');
            setUserToken(token);
        }
        getToken();
    },[])

    useEffect(() => {
        getCourtById()
    },[userToken])

    const getCourtById = async () => {          
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/courts/${court._id}`,{
                headers: {              
                    Authorization: `Bearer ${userToken}` 
                }
            })
            setCourtDetails(response.data)
        } catch (error) {
            console.log(error)
        }
    }




    const handleTimeSelection = (slotId) => {
        setSelectedTimes(prev => {
            if (prev.includes(slotId)) {
                return prev.filter(id => id !== slotId);
            } else {
                return [...prev, slotId].sort((a, b) => a - b);
            }
        });
    };

    // Calculate total price whenever selected times change
    // useEffect(() => {
    //     const pricePerHour = parseInt(court.price.replace(/[^0-9]/g, ''));
    //     const totalAmount = pricePerHour * selectedTimes.length;
    //     setTotalPrice(totalAmount);
    // }, [selectedTimes, court.price]);

    const reviews = [
        { id: 1, user: 'John Doe', rating: 5, comment: 'Excellent court condition!', date: '2023-10-15' },
        { id: 2, user: 'Jane Smith', rating: 4, comment: 'Great facilities, but parking can be difficult', date: '2023-10-10' },
        { id: 3, user: 'Mike Johnson', rating: 5, comment: 'Professional setup, will come again', date: '2023-10-05' },
    ];

    const paymentMethods = [
        {
            id: 'ewallet',
            title: 'E-Wallet',
            options: [
                { id: 'gopay', name: 'GoPay', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/2560px-Gopay_logo.svg.png' },
                { id: 'ovo', name: 'OVO', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_ovo_purple.svg/2560px-Logo_ovo_purple.svg.png' },
                { id: 'dana', name: 'DANA', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/2560px-Logo_dana_blue.svg.png' },
            ]
        },
        {
            id: 'va',
            title: 'Virtual Account',
            options: [
                { id: 'bca', name: 'BCA Virtual Account', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png' },
                { id: 'bni', name: 'BNI Virtual Account', image: 'https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/2560px-BNI_logo.svg.png' },
                { id: 'mandiri', name: 'Mandiri Virtual Account', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/2560px-Bank_Mandiri_logo_2016.svg.png' },
            ]
        },
        {
            id: 'qris',
            title: 'QRIS',
            options: [
                { id: 'qris', name: 'QRIS', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/QRIS_logo.svg/2560px-QRIS_logo.svg.png' },
            ]
        }
    ];

    const handlePaymentSelect = (methodId, optionId) => {
        setSelectedPayment({ methodId, optionId });
    };

    const timeSlots = [
        { id: 1, time: '08:00', available: true },
        { id: 2, time: '09:00', available: false },
        { id: 3, time: '10:00', available: true },
        { id: 4, time: '11:00', available: true },
        { id: 5, time: '13:00', available: true },
        { id: 6, time: '14:00', available: false },
        { id: 7, time: '15:00', available: true },
        { id: 8, time: '16:00', available: true },
    ];

    const handleNavigateToMaps = () => {
        navigation.navigate('Maps', {
            location: {
                latitude: -6.2088,  // Sesuaikan dgn koordinat court
                longitude: 106.8456
            },
            courtName: court.name
        });
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out ${court.name} on CourtApp! Great badminton court with excellent facilities.`,
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const validatePromoCode = () => {
        // Implement promo code validation
        if (promoCode === 'DISC20') {
            setPromoDiscount(20);
        }
    };

    const getFinalAmount = () => {
        const discountedPrice = totalPrice * (1 - promoDiscount/100);
        return paymentType === 'dp' ? discountedPrice * 0.5 : discountedPrice;
    };

    const handlePaymentSuccess = () => {
        setShowPaymentModal(false);
        setSelectedPayment(null);
        setPromoCode('');
        setPromoDiscount(0);
        navigation.replace('MainApp');
    };



    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Court Image */}
                <Image source={{ uri: courtDetails?.buildingDetails.imgUrl }} style={styles.courtImage} />
                
                {/* Back Button */}
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={24} color="#1F2937" />
                </TouchableOpacity>

                {/* Court Info */}
                <View style={styles.content}>
                    <View style={styles.headerInfo}>
                        <View style={styles.mainInfo}>
                            <Text style={styles.courtName}>{courtDetails?.buildingDetails.name}</Text>
                            <View style={styles.ratingContainer}>
                                <Ionicons name="star" size={16} color="#F59E0B" />
                                <Text style={styles.rating}>4.8</Text>
                                <Text style={styles.ratingCount}>(128 reviews)</Text>
                            </View>
                            <View style={styles.locationInfo}>
                                <Ionicons name="location-outline" size={16} color="#64748B" />
                                <Text style={styles.locationText}>{courtDetails?.buildingDetails.address}</Text>
                            </View>
                        </View>
                        <View style={styles.priceInfo}>
                            <Text style={styles.price}>{courtDetails?.price.toLocaleString()}</Text>
                            <Text style={styles.priceUnit}>/hour</Text>
                            <View style={styles.statusContainer}>
                                <View style={styles.statusDot} />
                                <Text style={styles.statusText}>Open Now</Text>
                            </View>
                            <TouchableOpacity 
                                style={styles.chatButton}
                                onPress={() => navigation.navigate('ChatDetail', { 
                                    chatId: `court_${court.id}`,
                                    name: `Admin ${court.name}`,
                                    userId: courtDetails?.buildingDetails.userId,
                                    courtId: courtDetails?._id,
                                    buildingId: courtDetails?.buildingDetails._id
                                })}
                            >
                                <Ionicons name="chatbubble-outline" size={20} color="#fff" />
                                <Text style={styles.chatButtonText}>Chat Admin</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Description */}
                    <View style={styles.descriptionSection}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <View>
                            <Text style={styles.description}>
                                {showFullDesc 
                                    ? courtDetails?.description 
                                    : courtDetails?.description?.slice(0, 150) + (courtDetails?.buildingDetails.description?.length > 150 ? '...' : '')}
                            </Text>
                            {courtDetails?.description?.length > 150 && (
                                <TouchableOpacity onPress={() => setShowFullDesc(!showFullDesc)}>
                                    <Text style={styles.readMore}>
                                        {showFullDesc ? 'Show Less' : 'Read More'}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    {/* Location Map */}
                    <CourtMap 
                        court={court}
                        onNavigate={handleNavigateToMaps}
                        onShare={handleShare}
                    />

                    {/* Calendar */}
                    <CourtCalendar 
                        selectedDate={selectedDate}
                        onDateSelect={setSelectedDate}
                    />

                    {/* Time Slots */}
                    <CourtTimeSlots 
                        selectedDate={selectedDate}
                        selectedTimes={selectedTimes}
                        onTimeSelect={handleTimeSelection}
                        timeSlots={timeSlots}
                    />

                    {/* Facilities */}
                    <CourtFacilities />

                    {/* Reviews dipindah ke paling bawah */}
                    <CourtReviews reviews={reviews} />
                </View>
            </ScrollView>

            {/* Bottom Button */}
            <View style={styles.bottomContainer}>
                <View style={styles.bottomContent}>
                    <View>
                        <Text style={styles.totalLabel}>Total Price ({selectedTimes.length} hours)</Text>
                        <Text style={styles.totalPrice}>Rp {totalPrice.toLocaleString()}</Text>
                    </View>
                    <TouchableOpacity 
                        style={[
                            styles.bookButton, 
                            (!selectedDate || selectedTimes.length === 0) && styles.bookButtonDisabled
                        ]}
                        disabled={!selectedDate || selectedTimes.length === 0}
                        onPress={() => setShowPaymentModal(true)}
                    >
                        <Text style={styles.bookButtonText}>Book Now</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Booking Modal tetap sama */}
            <BookingModal
                visible={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                court={court}
                selectedDate={selectedDate}
                selectedTimes={selectedTimes}
                totalPrice={totalPrice}
                paymentMethods={paymentMethods}
                onPaymentSelect={handlePaymentSelect}
                selectedPayment={selectedPayment}
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                promoDiscount={promoDiscount}
                validatePromoCode={validatePromoCode}
                paymentType={paymentType}
                setPaymentType={setPaymentType}
                getFinalAmount={getFinalAmount}
                handleConfirm={handlePaymentSuccess}
                timeSlots={timeSlots}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    courtImage: {
        width: '100%',
        height: 300,
    },
    backButton: {
        position: 'absolute',
        top: 44,
        left: 24,
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    content: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: -24,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 24,
        paddingTop: 24,
    },
    headerInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    mainInfo: {
        flex: 1,
        marginRight: 16,
    },
    courtName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    rating: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
        marginLeft: 4,
    },
    ratingCount: {
        fontSize: 14,
        color: '#64748B',
        marginLeft: 4,
    },
    locationInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontSize: 14,
        color: '#64748B',
        marginLeft: 4,
        flex: 1,
    },
    priceInfo: {
        alignItems: 'flex-end',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    price: {
        fontSize: 20,
        fontWeight: '700',
        color: '#E11D48',
    },
    priceUnit: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 2,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        backgroundColor: '#F0FDF4',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#22C55E',
        marginRight: 4,
    },
    statusText: {
        fontSize: 12,
        color: '#22C55E',
        fontWeight: '500',
    },
    chatButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#115E59',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginTop: 12,
        gap: 6,
    },
    chatButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    bottomContainer: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    bottomContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    totalLabel: {
        fontSize: 13,
        color: '#64748B',
        marginBottom: 4,
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F2937',
    },
    bookButton: {
        backgroundColor: '#E11D48',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 12,
    },
    bookButtonDisabled: {
        backgroundColor: '#94A3B8',
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    descriptionSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 12,
        letterSpacing: 0.5,
    },
    description: {
        fontSize: 15,
        lineHeight: 24,
        color: '#64748B',
    },
    readMore: {
        color: '#E11D48',
        fontWeight: '600',
        marginTop: 8,
    },
});