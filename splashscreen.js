import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, ActivityIndicator, Animated, StatusBar } from 'react-native';

export default function SplashScreen({ onFinish }) {
  // إعداد أنيميشن الظهور التدريجي
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // تشغيل الأنيميشن (يستغرق ثانية ونصف)
    Animated.timing(fadeAnim, { 
      toValue: 1, 
      duration: 1500, 
      useNativeDriver: true 
    }).start();

    // الانتظار لمدة 3.5 ثانية إجمالاً قبل الانتقال للشاشة التالية
    const timer = setTimeout(() => {
      onFinish();
    }, 3500);

    return () => clearTimeout(timer);
  }, [fadeAnim, onFinish]);

  return (
    <View style={styles.container}>
      {/* ضبط لون شريط الحالة ليتماشى مع الخلفية الغامقة */}
      <StatusBar barStyle="light-content" backgroundColor="#1A1C1E" />
      
      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.logo} 
          resizeMode="contain" 
        />
      </Animated.View>

      <View style={styles.footer}>
        {/* مؤشر تحميل باللون اللبني المميز للهوية */}
        <ActivityIndicator size="large" color="#4facfe" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#1A1C1E', // اللون الغامق المتناسق مع اللوجو
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  logo: { 
    width: 280, 
    height: 280 
  },
  footer: { 
    position: 'absolute', 
    bottom: 80 
  }
});