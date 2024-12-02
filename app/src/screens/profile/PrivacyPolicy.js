import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function PrivacyPolicy() {
    const navigation = useNavigation();

    const sections = [
        {
            title: "1. Data yg Kita Kumpulin",
            content: "Kita ngumpulin beberapa data kmu:\n\n• Data Pribadi:\n- Nama lengkap\n- Email\n- No HP\n- Foto profil\n\n• Data Aktivitas:\n- Riwayat booking\n- Pembayaran\n- Login history\n- Preferensi lapangan"
        },
        {
            title: "2. Gmn Kita Pake Data Kmu",
            content: "Data kmu kita pake utk:\n\n• Proses booking & pembayaran\n• Kirim notifikasi penting\n• Improve layanan kita\n• Personalisasi pengalaman\n• Analisis & statistik\n\nTenang ae, kita ga akan:\n• Jual data kmu\n• Share ke pihak ga bertanggung jawab\n• Spam kmu dgn promo ga penting"
        },
        {
            title: "3. Keamanan Data",
            content: "Kita jaga data kmu pake:\n\n• Encryption standard industri\n• Firewall & security system\n• Access control ketat\n• Regular security audit\n• Backup berkala"
        },
        {
            title: "4. Cookies & Tracking",
            content: "Kita pake cookies utk:\n\n• Keep login session\n• Inget preferensi kmu\n• Analisis penggunaan app\n• Improve performance\n\nKmu bs disable cookies, tp bbrp fitur mgkn ga works maksimal ya bestie 🍪"
        },
        {
            title: "5. Hak Kmu",
            content: "Kmu punya hak utk:\n\n• Akses data kmu\n• Update data\n• Hapus data\n• Minta data diekspor\n• Cabut persetujuan\n\nMau exercise rights kmu? Chat CS kita ae ya! 😊"
        },
        {
            title: "6. Data Anak di Bawah Umur",
            content: "• App kita utk 17+\n• Klo di bawah 17 hrs didampingi ortu\n• Kita ga sengaja collect data anak2\n• Klo ketauan langsung kita hapus"
        },
        {
            title: "7. Update Privacy Policy",
            content: "• Kita bs update policy ini sewaktu2\n• Kmu bakal diberitahu klo ada update\n• Lanjut pake app = setuju sm update\n• Ga setuju? Sadly kmu hrs stop pake app 🥺"
        },
        {
            title: "8. Data Retention",
            content: "• Data aktif: selama kmu pake app\n• Data transaksi: min. 5 tahun\n• Data backup: max 30 hari\n• Deleted data: langsung dihapus permanent"
        },
        {
            title: "9. Transfer Data",
            content: "• Data bs ditransfer ke server kita\n• Server lokasi di ID & SG\n• Pake encryption pas transfer\n• Ikutin standard PDPA & GDPR"
        },
        {
            title: "10. Kontak Privacy Officer",
            content: "Ada concern soal privacy?\n\n• Email: privacy@example.com\n• Form: privacy.example.com\n• Tel: 0812-3456-7890\n\nPrivacy officer kita siap bantu 24/7! 🛡️"
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
                <Text style={styles.headerTitle}>Privacy Policy</Text>
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
                        <Ionicons name="shield-checkmark" size={24} color="#EA580C" />
                        <Text style={styles.cardTitle}>Privasi Kmu Priority Kita!</Text>
                    </View>
                    <Text style={styles.cardContent}>
                        Kita serius bgt soal privacy, makanya kita jelasin detail di sini gmn kita protect data kmu aowkaokwaokaw 🔒
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
                        Privasi kmu = Tanggung jawab kita! 🤝
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