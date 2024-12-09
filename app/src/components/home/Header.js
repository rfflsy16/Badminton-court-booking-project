import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export default function Header() {
    const navigation = useNavigation();
    const [userToken, setUserToken] = useState("");
    const [myProfile, setMyProfile] = useState({});
    
    useEffect(() => {
        
        async function getToken() {
            const token = await SecureStore.getItemAsync('userToken');
            setUserToken(token);

        }
        getToken();
    
    },[])

    useEffect(() => {
        getMyProfile();
      }, [userToken]);

    
    const getMyProfile = async () => {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/profile`,{
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            })
            setMyProfile(response.data);
        } catch (error) {
            console.log(error);
        }
    
    }

    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.greeting}>{`Hello, ${myProfile.fullName}!`} 👋</Text>
                <Text style={styles.subtitle}>Find and book your court</Text>
            </View>
            <TouchableOpacity 
                style={styles.notificationButton}
                onPress={() => navigation.navigate('Notifications')}
            >
                <Ionicons name="notifications-outline" size={24} color="#1F2937" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    subtitle: {
        fontSize: 16,
        color: '#94A3B8',
        marginTop: 4,
    },
    notificationButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
