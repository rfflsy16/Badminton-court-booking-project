import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Language() {
    const navigation = useNavigation();
    const route = useRoute();
    const currentLanguage = route.params?.currentLanguage || 'en';
    const onSelect = route.params?.onSelect;
    
    const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

    const languages = [
        {
            id: 'en',
            name: 'English',
            native: 'English',
            flag: '🇺🇸',
            region: 'United States'
        },
        {
            id: 'en-gb',
            name: 'English',
            native: 'English',
            flag: '🇬🇧',
            region: 'United Kingdom'
        },
        {
            id: 'id',
            name: 'Indonesian',
            native: 'Bahasa Indonesia',
            flag: '🇮🇩',
            region: 'Indonesia'
        },
        {
            id: 'ms',
            name: 'Malay',
            native: 'Bahasa Melayu',
            flag: '🇲🇾',
            region: 'Malaysia'
        },
        {
            id: 'zh-cn',
            name: 'Chinese',
            native: '简体中文',
            flag: '🇨🇳',
            region: 'China'
        },
        {
            id: 'zh-tw',
            name: 'Chinese',
            native: '繁體中文',
            flag: '🇹🇼',
            region: 'Taiwan'
        },
        {
            id: 'zh-hk',
            name: 'Chinese',
            native: '繁體中文',
            flag: '🇭🇰',
            region: 'Hong Kong'
        },
        {
            id: 'ja',
            name: 'Japanese',
            native: '日本語',
            flag: '🇯🇵',
            region: 'Japan'
        },
        {
            id: 'ko',
            name: 'Korean',
            native: '한국어',
            flag: '🇰🇷',
            region: 'South Korea'
        },
        {
            id: 'th',
            name: 'Thai',
            native: 'ภาษาไทย',
            flag: '🇹🇭',
            region: 'Thailand'
        },
        {
            id: 'vi',
            name: 'Vietnamese',
            native: 'Tiếng Việt',
            flag: '🇻🇳',
            region: 'Vietnam'
        }
    ];

    const handleLanguageSelect = (langId) => {
        setSelectedLanguage(langId);
        if (onSelect) {
            onSelect(langId);
        }
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Language</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.languageList}>
                    {languages.map((lang) => (
                        <TouchableOpacity
                            key={lang.id}
                            style={[
                                styles.languageOption,
                                selectedLanguage === lang.id && styles.selectedOption
                            ]}
                            onPress={() => handleLanguageSelect(lang.id)}
                        >
                            <View style={styles.languageInfo}>
                                <Text style={styles.flag}>{lang.flag}</Text>
                                <View style={styles.languageText}>
                                    <View style={styles.nameRow}>
                                        <Text style={styles.languageName}>{lang.name}</Text>
                                        <Text style={styles.languageRegion}>{lang.region}</Text>
                                    </View>
                                    <Text style={styles.languageNative}>{lang.native}</Text>
                                </View>
                            </View>
                            {selectedLanguage === lang.id && (
                                <View style={styles.checkmarkContainer}>
                                    <Ionicons 
                                        name="checkmark-circle" 
                                        size={24} 
                                        color="#EA580C" 
                                    />
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
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
    languageList: {
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    languageOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        minHeight: 76,
    },
    selectedOption: {
        backgroundColor: '#FFF7ED',
        borderColor: '#EA580C',
    },
    languageInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 12,
    },
    flag: {
        fontSize: 28,
        width: 40,
        marginRight: 12,
    },
    languageText: {
        flex: 1,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 4,
    },
    languageName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginRight: 8,
    },
    languageRegion: {
        fontSize: 13,
        color: '#64748B',
    },
    languageNative: {
        fontSize: 14,
        color: '#64748B',
    },
    checkmarkContainer: {
        width: 24,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
