import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
    const navigation = useNavigation();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [deviceId, setDeviceId] = useState('abc123');

    const handleRegister = async () => { 
        try {
            const response = await axios.post('https://02f4-103-121-170-7.ngrok-free.app/register', {
              
                
                    fullName,
                    email,
                    password,
                    deviceId
                
            });

            const responseText = await response.text();
            console.log(responseText, '<<<<<<<<<<<< raw response text');

            // Attempt to parse the response as JSON
            const data = JSON.parse(responseText);
            console.log(data, '<<<<<<<<<<<< parsed data');

            if (response.ok) {
                Alert.alert('Success', 'User registered successfully');
                navigation.navigate('Login');
            } else {
                Alert.alert('Error', data.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Failed to register user');
        }
    };

    return (
        <View style={styles.container}>
            {/* Add Logo */}
            <Image
                source={require("../../assets/logo2.png")} // Update this path
                style={styles.logo}
                resizeMode="contain"
            />
            {/* <Text style={styles.title}>Register</Text> */}

            <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Full Name"
                placeholderTextColor="#aaa"
            />

            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor="#aaa"
            />

            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry
            />

            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.registerButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.bottomBanner}>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.registerBannerText}>
                        Already have an account? Login
                    </Text>
                </TouchableOpacity>
            </View>

            {/* {error && <Text style={{ color: 'red', marginTop: 10 }}>Error: {error.message}</Text>} */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        color: '#1e3c72',
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 50
    },
    input: {
        width: '100%',
        backgroundColor: '#f8fbfc',
        color: "#000",
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
    },
    bottomBanner: {
        position: "absolute",
        bottom: 20,
        width: "100%",
        alignItems: "center",
        marginBottom: 50,
    },
    registerButton: {
        backgroundColor: '#1e3c72',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginTop: 20,
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerBannerText: {
        color: "#1e3c72",
        fontSize: 16,
        fontWeight: "bold",
    },
    logo: {
        width: 150, // Adjust width of the logo
        height: 150, // Adjust height of the logo
        marginTop: 30,
        marginBottom: 5,
    },
});