import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HelpCenter() {
    const navigation = useNavigation();

    const helpSections = [
        {
            title: "Booking & Pembayaran",
            icon: "calendar",
            items: [
                { id: 1, question: "Gmn cara booking lapangan?", answer: "Kmu bs pilih venue > pilih lapangan > pilih jadwal > lakukan pembayaran" },
                { id: 2, question: "Metode pembayaran apa aja yg tersedia?", answer: "Kita nerima QRIS, transfer bank, kartu kredit, dan e-wallet" },
                { id: 3, question: "Gmn klo mau batalin booking?", answer: "Pembatalan bs dilakukan H-1, dgn pengembalian dana 80%" }
            ]
        },
        {
            title: "Akun & Keamanan",
            icon: "shield-checkmark",
            items: [
                { id: 4, question: "Lupa password gmn ya?", answer: "Klik 'Lupa Password' di halaman login, trs ikutin instruksinya" },
                { id: 5, question: "Cara ganti email?", answer: "Masuk ke Edit Profile > pilih email > update email baru" }
            ]
        },
        {
            title: "Bantuan Teknis",
            icon: "construct",
            items: [
                { id: 6, question: "App error gmn ya?", answer: "Coba clear cache atau reinstall app. Klo msh error, hub CS kita" },
                { id: 7, question: "Notif ga muncul?", answer: "Cek pengaturan notifikasi di hp kmu udh aktif blm" }
            ]
        }
    ];

    const HelpItem = ({ question, answer, isLast }) => (
        <View style={[styles.helpItem, !isLast && styles.helpItemBorder]}>
            <Text style={styles.question}>{question}</Text>
            <Text style={styles.answer}>{answer}</Text>
        </View>
    );

    const SectionHeader = ({ title, icon }) => (
        <View style={styles.sectionHeader}>
            <View style={styles.iconContainer}>
                <Ionicons name={icon} size={20} color="#EA580C" />
            </View>
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Help Center</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView 
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={20} color="#64748B" />
                    <Text style={styles.searchPlaceholder}>Cari bantuan...</Text>
                </View>

                <View style={styles.contactCard}>
                    <View style={styles.contactInfo}>
                        <Text style={styles.contactTitle}>Butuh bantuan lebih?</Text>
                        <Text style={styles.contactDesc}>Chat CS kita yg ramah2 aowkaokwaokaw 😊</Text>
                    </View>
                    <TouchableOpacity style={styles.contactButton}>
                        <Text style={styles.contactButtonText}>Chat CS</Text>
                    </TouchableOpacity>
                </View>

                {helpSections.map((section, sectionIndex) => (
                    <View 
                        key={section.title} 
                        style={[
                            styles.section,
                            sectionIndex !== helpSections.length - 1 && styles.sectionMargin
                        ]}
                    >
                        <SectionHeader title={section.title} icon={section.icon} />
                        <View style={styles.sectionContent}>
                            {section.items.map((item, index) => (
                                <HelpItem 
                                    key={item.id}
                                    question={item.question}
                                    answer={item.answer}
                                    isLast={index === section.items.length - 1}
                                />
                            ))}
                        </View>
                    </View>
                ))}
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#F1F5F9',
        borderRadius: 12,
        marginBottom: 20,
    },
    searchPlaceholder: {
        marginLeft: 8,
        fontSize: 14,
        color: '#64748B',
    },
    contactCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#FFF7ED',
        borderRadius: 12,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#FDBA74',
    },
    contactInfo: {
        flex: 1,
        marginRight: 12,
    },
    contactTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#EA580C',
        marginBottom: 4,
    },
    contactDesc: {
        fontSize: 14,
        color: '#9A3412',
    },
    contactButton: {
        backgroundColor: '#EA580C',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    contactButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        overflow: 'hidden',
    },
    sectionMargin: {
        marginBottom: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F8FAFC',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FFF7ED',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    sectionContent: {
        padding: 16,
    },
    helpItem: {
        paddingVertical: 12,
    },
    helpItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    question: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    answer: {
        fontSize: 14,
        color: '#64748B',
        lineHeight: 20,
    },
});
