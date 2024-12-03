import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function DarkMode() {
    const navigation = useNavigation();
    const route = useRoute();
    const currentMode = route.params?.currentMode || false;
    const onSelect = route.params?.onSelect;
    
    const [isDarkMode, setIsDarkMode] = useState(currentMode);

    const handleModeChange = (value) => {
        setIsDarkMode(value);
        if (onSelect) {
            onSelect(value);
        }
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
                <Text style={styles.headerTitle}>Dark Mode</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.content}>
                <View style={styles.modeOption}>
                    <View style={styles.modeInfo}>
                        <View style={styles.iconContainer}>
                            <Ionicons 
                                name={isDarkMode ? "moon" : "sunny"} 
                                size={24} 
                                color="#1F2937" 
                            />
                        </View>
                        <View style={styles.modeText}>
                            <Text style={styles.modeTitle}>Dark Mode</Text>
                            <Text style={styles.modeDescription}>
                                {isDarkMode ? 'Dark mode is enabled' : 'Dark mode is disabled'}
                            </Text>
                        </View>
                    </View>
                    <Switch
                        trackColor={{ false: "#E2E8F0", true: "#FDBA74" }}
                        thumbColor={isDarkMode ? "#EA580C" : "#64748B"}
                        onValueChange={handleModeChange}
                        value={isDarkMode}
                    />
                </View>

                <View style={styles.infoCard}>
                    <Ionicons name="information-circle-outline" size={24} color="#64748B" />
                    <Text style={styles.infoText}>
                        Dark mode menghemat baterai pada perangkat dgn layar OLED dan lebih nyaman utk mata di kondisi cahaya rendah aowkaokwaokaw 🌙✨
                    </Text>
                </View>
            </View>
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
        padding: 20,
    },
    modeOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginBottom: 20,
    },
    modeInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 12,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F1F5F9',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    modeText: {
        flex: 1,
    },
    modeTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    modeDescription: {
        fontSize: 14,
        color: '#64748B',
    },
    infoCard: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#F1F5F9',
        borderRadius: 12,
        alignItems: 'center',
    },
    infoText: {
        flex: 1,
        marginLeft: 12,
        fontSize: 14,
        color: '#64748B',
        lineHeight: 20,
    },
});
