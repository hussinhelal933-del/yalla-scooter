import React, { useState } from 'react';
import { Alert } from 'react-native';

// الاستدعاءات مطابقة لأسماء ملفاتك في المجلد الرئيسي
import SplashScreen from './splashscreen'; 
import HomeScreen from './HomeScreen'; 
import ScanScreen from './scanscreen';
import ActiveRideScreen from './ActiveRideScreen'; // إضافة الشاشة المفقودة

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [activeScooterId, setActiveScooterId] = useState(null);

  // 1. عند انتهاء شاشة البداية
  const handleSplashFinish = () => {
    setCurrentScreen('home');
  };

  // 2. عند الضغط على "ابدأ الرحلة" من الخريطة
  const handleStartScan = () => {
    setCurrentScreen('scan');
  };

  // 3. عند نجاح المسح (الانتقال لعداد الرحلة)
  const handleScanSuccess = (scooterID) => {
    Alert.alert(
      "تم التعرف على السكوتر", 
      `رقم السكوتر: ${scooterID}\nجاهز لبدء الرحلة؟`,
      [
        { text: "إلغاء", onPress: () => setCurrentScreen('home'), style: "cancel" },
        { text: "بدء", onPress: () => {
          setActiveScooterId(scooterID);
          setCurrentScreen('ride'); // الانتقال لشاشة العداد والفلوس
        }}
      ]
    );
  };

  // --- منطق التبديل بين الشاشات ---

  if (currentScreen === 'splash') {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (currentScreen === 'scan') {
    return (
      <ScanScreen 
        onCancel={() => setCurrentScreen('home')} 
        onScanSuccess={handleScanSuccess} 
      />
    );
  }

  if (currentScreen === 'ride') {
    return (
      <ActiveRideScreen 
        scooterId={activeScooterId} 
        onFinish={() => setCurrentScreen('home')} 
      />
    );
  }

  // الوضع الافتراضي: الشاشة الرئيسية (Home)
  return <HomeScreen onStartScan={handleStartScan} />;
}