import React, { useEffect } from 'react';
import { View, StyleSheet, Image, ActivityIndicator, StatusBar, Animated } from 'react-native';

export default function SplashScreen({ onFinish }) {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      onFinish();
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1C1E" />
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Image 
          source={require('./assets/logo.png')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
      </Animated.View>
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#4facfe" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1C1E', justifyContent: 'center', alignItems: 'center' },
  logoContainer: { alignItems: 'center', width: '80%', height: '40%' },
  logoImage: { width: '100%', height: '100%' },
  footer: { position: 'absolute', bottom: 60 },
});