import { View, StyleSheet, ScrollView } from "react-native";
import Header from "../components/home/Header";
import FeaturedCourts from "../components/home/FeaturedCourts";
import QuickActions from "../components/home/QuickActions";
import AvailableTimeSlots from "../components/home/AvailableTimeSlots";

export default function Home() {
    return (
        <View style={styles.container}>
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
                <FeaturedCourts />
                <QuickActions />
                <AvailableTimeSlots />
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