import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { useState, useCallback } from "react";
import Header from "../components/home/Header";
import PromoBanner from "../components/home/PromoBanner";
import FeaturedCourts from "../components/home/FeaturedCourts";

export default function Home() {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // Di sini bs tambah logic utk refresh data
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView 
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={["#EA580C"]}
                    />
                }
            >
                <PromoBanner />
                <FeaturedCourts />
                {/* Kasih padding bottom spy scroll nya enak */}
                <View style={{ height: 20 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});