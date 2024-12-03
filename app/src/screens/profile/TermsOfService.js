import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function TermsOfService() {
    const navigation = useNavigation();

    const sections = [
        {
            title: "1. Pendahuluan",
            content: "Selamat datang di aplikasi booking lapangan badminton kita nih! Dgn make aplikasi ini, kmu setuju sama semua ketentuan yg ada di sini ya bestie 🏸"
        },
        {
            title: "2. Penggunaan Layanan",
            content: "• Kmu hrs udh 17+ atau di bawah pengawasan ortu\n• Wajib kasih data yg valid\n• Ga boleh nyalahgunain platform\n• Bertanggung jawab atas semua aktivitas di akun kmu"
        },
        {
            title: "3. Booking & Pembayaran",
            content: "• Booking berlaku stlh pembayaran sukses\n• Pembayaran hrs sesuai dgn harga yg tertera\n• Pembatalan booking ikutin kebijakan refund\n• Kita berhak batalin booking klo ada kecurangan"
        },
        {
            title: "4. Kebijakan Pembatalan",
            content: "• Pembatalan H-1: refund 80%\n• Pembatalan H-0: no refund\n• Force majeure dikaji case by case\n• Refund diproses max 14 hari kerja"
        },
        {
            title: "5. Hak & Kewajiban",
            content: "Kita berhak:\n• Update terms kapan aja\n• Suspend akun yg melanggar\n• Batalin transaksi mencurigakan\n\nKmu wajib:\n• Jaga ketertiban\n• Ikutin aturan venue\n• Ga ganggu user lain"
        },
        {
            title: "6. Privasi & Data",
            content: "• Kita jaga data pribadi kmu\n• Data dipake sesuai Privacy Policy\n• Kmu bs minta hapus data kapan aja\n• Kita ga jual data ke pihak ketiga"
        },
        {
            title: "7. Disclaimer",
            content: "• Kita ga nanggung kecelakaan di lapangan\n• Pastiin kondisi fit sblm main\n• Bawa perlengkapan sendiri\n• Patuhi protokol kesehatan"
        },
        {
            title: "8. Kontak",
            content: "Ada pertanyaan? Hubungi kita di:\n• Email: cs@example.com\n• WA: 0812-3456-7890\n• Live chat di app\n\nKita online 24/7 siap bantuin kmu! 😊"
        }
    ];

    const SectionItem = ({ title, content, isLast }) => (
        <View style={[styles.section, !isLast && styles.sectionBorder]}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={styles.sectionContent}>{content}</Text>
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
                <Text style={styles.headerTitle}>Terms of Service</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView 
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.lastUpdateInfo}>
                    <Ionicons name="time-outline" size={16} color="#64748B" />
                    <Text style={styles.lastUpdateText}>
                        Last updated: 20 Mar 2024
                    </Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="information-circle" size={24} color="#EA580C" />
                        <Text style={styles.cardTitle}>Penting!</Text>
                    </View>
                    <Text style={styles.cardContent}>
                        Baca terms ini baik2 ya bestie, krn ini ngejelasin hak & kewajiban kita berdua sbg pengguna & penyedia layanan aowkaokwaokaw 📝
                    </Text>
                </View>

                {sections.map((section, index) => (
                    <SectionItem
                        key={index}
                        title={section.title}
                        content={section.content}
                        isLast={index === sections.length - 1}
                    />
                ))}

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Dgn make aplikasi ini, kmu setuju sama semua ketentuan di atas ya! 🤝
                    </Text>
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
    lastUpdateInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    lastUpdateText: {
        marginLeft: 6,
        fontSize: 14,
        color: '#64748B',
    },
    card: {
        backgroundColor: '#FFF7ED',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#FDBA74',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardTitle: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '600',
        color: '#EA580C',
    },
    cardContent: {
        fontSize: 14,
        color: '#9A3412',
        lineHeight: 20,
    },
    section: {
        paddingVertical: 16,
    },
    sectionBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 8,
    },
    sectionContent: {
        fontSize: 14,
        color: '#64748B',
        lineHeight: 20,
    },
    footer: {
        marginTop: 24,
        marginBottom: 40,
        padding: 16,
        backgroundColor: '#F1F5F9',
        borderRadius: 12,
    },
    footerText: {
        fontSize: 14,
        color: '#64748B',
        textAlign: 'center',
    },
});
