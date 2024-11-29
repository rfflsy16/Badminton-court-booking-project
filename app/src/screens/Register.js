import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>

            <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#aaa"
            />


            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Profile Image URL"
                placeholderTextColor="#aaa"
            />

            <TouchableOpacity style={styles.registerButton} >
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
        color: '#fff',
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
});