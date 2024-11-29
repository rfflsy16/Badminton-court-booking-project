import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
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
        color: '#000',
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
});