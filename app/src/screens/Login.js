import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function Login() {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ShuttleSpace</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#aaa"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry
            />

            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>

            <View style={styles.bottomBanner}>
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.registerBannerText}>
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
        fontSize: 28,
        color: "#000",
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 50,
    },
    input: {
        width: "100%",
        backgroundColor: "#f8fbfc",
        color: "#fff",
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
    registerBannerText: {
        color: "#1e3c72",
        fontSize: 16,
        fontWeight: "bold",
    },
});
