import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from "react-native";

const { width } = Dimensions.get('window');
const tabWidth = (width - 40) / 2;

export default function TabBar({ activeTab, scrollX, handleTabPress }) {
    const indicatorPosition = scrollX.interpolate({
        inputRange: [0, width],
        outputRange: [0, tabWidth],
    });

    return (
        <View style={styles.tabContainer}>
            <View style={styles.tabsWrapper}>
                <TouchableOpacity 
                    style={[styles.tab]}
                    onPress={() => handleTabPress('bookings', 0)}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === 'bookings' && styles.activeTabText
                    ]}>My Bookings</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tab]}
                    onPress={() => handleTabPress('transactions', 1)}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === 'transactions' && styles.activeTabText
                    ]}>Transactions</Text>
                </TouchableOpacity>
                <Animated.View 
                    style={[
                        styles.activeIndicator,
                        {
                            transform: [{ translateX: indicatorPosition }],
                            width: tabWidth,
                        }
                    ]} 
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tabContainer: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#fff',
    },
    tabsWrapper: {
        flexDirection: 'row',
        position: 'relative',
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },
    activeIndicator: {
        position: 'absolute',
        bottom: 0,
        height: 3,
        backgroundColor: '#006D77',
        borderRadius: 4,
    },
    tabText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#94A3B8',
    },
    activeTabText: {
        color: '#006D77',
        fontWeight: '700',
    },
});
