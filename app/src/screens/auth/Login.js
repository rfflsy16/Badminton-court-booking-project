import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../../context/AuthContext";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const navigation = useNavigation();
    const authContext = useContext(AuthContext);
    const base_url = process.env.EXPO_PUBLIC_BASE_URL;


    useEffect(() => {
        const validateForm = () => {
            const isEmailValid = email.trim() !== "" && email.includes("@");
            const isPasswordValid = password.trim().length >= 5;
            setIsFormValid(isEmailValid && isPasswordValid);
        };
        validateForm();
    }, [email, password]);

    useEffect(() => {
        if (authContext.isLogin) {
            navigation.navigate('MainApp'); 
        }
    }, [authContext.isLogin]);

    const handleLogin = async () => {
        if (!isFormValid) return alert('Please fill in all fields');

        try {
            // Call login API
            const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/login`, {
                email,
                password
            });

            const responseProfile = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/profile`,{
                headers: {
                    'Authorization': `Bearer ${response.data.access_token}`
                }
            })
            
            // If login successful
            if (response.data.access_token) {
                // Store token
                await SecureStore.setItemAsync('userToken', response.data.access_token);
                
                // Store user info
                const userInfo = {
                    userId: responseProfile.data._id,
                    username: responseProfile.data.username,
                    email: responseProfile.data.email,
                    role: responseProfile.data.role
                };
                await SecureStore.setItemAsync('userInfo', JSON.stringify(userInfo));
                // Update auth context
                authContext.setIsLogin(true);
            }
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            alert('Invalid email or password');
        }
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome Back! 👋</Text>
                    <Text style={styles.subtitle}>
                        Sign in to continue booking your favorite courts
                    </Text>
                </View>

                <View style={styles.form}>
                    {/* Email Input */}
                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="mail-outline"
                            size={20}
                            color="#94A3B8"
                            style={styles.inputIcon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#94A3B8"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="lock-closed-outline"
                            size={20}
                            color="#94A3B8"
                            style={styles.inputIcon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#94A3B8"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.passwordIcon}
                        >
                            <Ionicons
                                name={showPassword ? "eye-off-outline" : "eye-outline"}
                                size={20}
                                color="#94A3B8"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Forgot Password */}
                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    {/* Sign In Button */}
                    <TouchableOpacity
                        style={[
                            styles.signInButton,
                            !isFormValid && styles.signInButtonDisabled,
                        ]}
                        onPress={handleLogin}
                        disabled={!isFormValid}
                    >
                        <Text style={[
                            styles.signInButtonText,
                            !isFormValid && styles.signInButtonTextDisabled
                        ]}>
                            Sign In
                        </Text>
                    </TouchableOpacity>

                    {/* Register Link */}
                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>Don't have an account? </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Register")}
                        >
                            <Text style={styles.registerLink}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    header: {
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#1F2937",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "#94A3B8",
        lineHeight: 24,
    },
    form: {
        flex: 1,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 56,
        backgroundColor: "#F8FAFC",
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        color: "#1F2937",
        fontSize: 16,
    },
    passwordIcon: {
        padding: 4,
    },
    forgotPassword: {
        alignSelf: "flex-end",
        marginBottom: 24,
    },
    forgotPasswordText: {
        color: "#006D77",
        fontSize: 14,
        fontWeight: "500",
    },
    signInButton: {
        backgroundColor: "#006D77",
        height: 56,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 24,
    },
    signInButtonDisabled: {
        backgroundColor: "#E2E8F0",
    },
    signInButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    signInButtonTextDisabled: {
        color: "#94A3B8",
    },
    registerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    registerText: {
        color: "#64748B",
        fontSize: 14,
    },
    registerLink: {
        color: "#006D77",
        fontSize: 14,
        fontWeight: "500",
    },
});