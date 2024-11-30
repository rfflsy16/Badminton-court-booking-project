import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
    const navigation = useNavigation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('https://643b-103-121-170-7.ngrok-free.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    email,
                    password
                }).toString(),
            });

            const data = await response.json();
            console.log(data, '<<<<<<<<<<<< data');
            if (response.ok) {
                Alert.alert('Success', 'Logged in successfully');
                navigation.navigate('HomeNavigator');
            } else {
                Alert.alert('Error', data.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Failed to log in');
        }
    };

    return (
        <View style={styles.container}>
            {/* Add Logo */}
            <Image
                source={require("../../assets/logo4.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.title}>Welcome Back!</Text>

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

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>

            <View >
                <TouchableOpacity onPress={() => navigation.navigate("HomeNavigator")}>
                    <Text >
                        Home
                    </Text>
                </TouchableOpacity>
            </View>


            <View style={styles.bottomBanner}>
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.LoginBannerText}>
                        Don't have an account? Register
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        color: "#1e3c72",
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 10,
    },
    input: {
        width: "100%",
        backgroundColor: "#f8fbfc",
        color: "#000",
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
    },
    loginButton: {
        backgroundColor: "#1e3c72",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginTop: 20,
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    bottomBanner: {
        position: "absolute",
        bottom: 20,
        width: "100%",
        alignItems: "center",
        marginBottom: 50,
    },
    LoginBannerText: {
        color: "#1e3c72",
        fontSize: 16,
        fontWeight: "bold",
    },
    logo: {
        width: 50,
        height: 50,
        marginTop: 30,
        marginBottom: 5,
    },
});
