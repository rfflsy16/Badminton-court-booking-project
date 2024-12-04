import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { useState } from 'react';

export default function Midtrans() {
    const route = useRoute();
    const { midtransUrl, midtransToken } = route.params;
    const [isLoading, setIsLoading] = useState(true);
    
    console.log('Attempting to load Midtrans URL:', midtransUrl);

    if (!midtransUrl) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Text>No payment URL provided</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: midtransUrl }}
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
        </View>
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
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        color: '#EA580C',
        fontSize: 16,
        fontWeight: '500'
    }
});
