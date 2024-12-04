import { useRoute, useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';

export default function Midtrans() {
    const route = useRoute();
    const navigation = useNavigation();
    const { midtransUrl, midtransToken } = route.params;
    const [isLoading, setIsLoading] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);
    
    
    console.log('Attempting to load Midtrans URL:', midtransUrl);

    const handleNavigationStateChange = (navState) => {
        // Check if the URL contains success indicators from Midtrans
        if (navState.url.includes('status_code=200') || navState.url.includes('transaction_status=settlement')) {
            setShowSuccess(true);
            setTimeout(() => {
                navigation.replace('MainApp');
            }, 2000);
        }
    };

    if (!midtransUrl) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Text>No payment URL provided</Text>
            </View>
        );
    }

    

    return (
        <>
        <Button
            title="Refresh Payment"
            onPress={() => {
                navigation.replace('Midtrans', { midtransUrl, midtransToken });
            }}
        />
            <WebView
                source={{ uri: midtransUrl }}
                   

                onNavigationStateChange={handleNavigationStateChange}
                style={styles.webview}
                onError={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    console.warn('WebView error:', nativeEvent);
                    setIsLoading(false);
                }}
                onHttpError={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    console.warn('WebView HTTP error:', nativeEvent);
                    setIsLoading(false);
                }}
                onLoadStart={() => {
                    console.log('WebView starting to load');
                    setIsLoading(true);
                }}
                onLoadEnd={() => {
                    console.log('WebView finished loading');
                    setIsLoading(false);
                }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                thirdPartyCookiesEnabled={true}
                mediaPlaybackRequiresUserAction={false}
                allowsInlineMediaPlayback={true}
                scalesPageToFit={true}
                mixedContentMode="compatibility"
                userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36"
            />
            {isLoading && (
                <View style={[styles.loadingContainer, styles.centerContent]}>
                    <ActivityIndicator size="large" color="#EA580C" />
                    <Text style={styles.loadingText}>Loading payment page...</Text>
                </View>
            )}
            {showSuccess && (
                <Animatable.View 
                    style={[styles.successContainer, styles.centerContent]}
                    animation="zoomIn"
                    duration={500}
                >
                    <Animatable.View 
                        animation="bounceIn" 
                        delay={500}
                        style={styles.successIconContainer}
                    >
                        <Ionicons name="checkmark-circle" size={80} color="#22c55e" />
                    </Animatable.View>
                    <Animatable.Text 
                        animation="fadeInUp" 
                        delay={1000}
                        style={styles.successText}
                    >
                        Payment Successful!
                    </Animatable.Text>
                </Animatable.View>
            )}
        </>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    successContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        zIndex: 999,
    },
    successIconContainer: {
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        color: '#EA580C',
        fontSize: 16,
        fontWeight: '500'
    },
    successText: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#22c55e'
    }
});
