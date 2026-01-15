import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { processRideEnd } from './userService';

export default function ActiveRideScreen({ scooterId, onFinish }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const cost = ((seconds / 60) * 2).toFixed(2); // التكلفة: 2 جنيه للدقيقة

  const handleEndRide = async () => {
    await processRideEnd('user_01', parseFloat(cost));
    Alert.alert("انتهت الرحلة", `التكلفة: ${cost} ج.م`);
    onFinish();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1C1E" />
      <Text style={styles.title}>رحلة نشطة - سكوتر {scooterId}</Text>
      <View style={styles.timerCircle}>
        <Text style={styles.timer}>{Math.floor(seconds/60)}:{seconds%60 < 10 ? '0' : ''}{seconds%60}</Text>
        <Text style={styles.cost}>{cost} ج.م</Text>
      </View>
      <TouchableOpacity style={styles.stopBtn} onPress={handleEndRide}>
        <Text style={styles.stopText}>إنهاء الرحلة</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1C1E', justifyContent: 'center', alignItems: 'center' },
  title: { color: '#4facfe', fontSize: 22, fontWeight: 'bold', marginBottom: 50 },
  timerCircle: { width: 250, height: 250, borderRadius: 125, borderWidth: 5, borderColor: '#4facfe', justifyContent: 'center', alignItems: 'center' },
  timer: { fontSize: 60, color: '#fff', fontWeight: 'bold' },
  cost: { fontSize: 30, color: '#4facfe', marginTop: 10 },
  stopBtn: { backgroundColor: '#ff4b2b', padding: 20, borderRadius: 15, width: '80%', alignItems: 'center', marginTop: 60 },
  stopText: { color: '#fff', fontSize: 20, fontWeight: 'bold' }
});