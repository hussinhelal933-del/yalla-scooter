import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Dimensions, 
  StatusBar, 
  ActivityIndicator 
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { listenToScooters } from '../services/scooterService';

const { width, height } = Dimensions.get('window');

/**
 * الشاشة الرئيسية للتطبيق (الخريطة)
 * @param {function} onStartScan - وظيفة لفتح شاشة الكاميرا
 */
export default function HomeScreen({ onStartScan }) {
  const [scooters, setScooters] = useState([]);
  const [loading, setLoading] = useState(true);

  // إحداثيات افتراضية (القاهرة) لحين تحديد موقع المستخدم
  const [region] = useState({
    latitude: 30.0444, 
    longitude: 31.2357, 
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });

  useEffect(() => {
    // 1. بدء الاستماع للبيانات الحية من Firebase
    const unsubscribe = listenToScooters((data) => {
      setScooters(data);
      setLoading(false);
    });

    // 2. تنظيف الاتصال عند مغادرة الشاشة
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      {/* جعل شريط الحالة شفافاً فوق الخريطة */}
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* الخريطة الأساسية */}
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE} // استخدام خرائط جوجل
        initialRegion={region}
        showsUserLocation={true} // إظهار نقطة موقع المستخدم الزرقاء
        showsMyLocationButton={false}
      >
        {/* عرض ماركر (Marker) لكل سكوتر متاح في القائمة */}
        {scooters.map((scooter) => (
          <Marker
            key={scooter.id}
            coordinate={{ latitude: scooter.lat, longitude: scooter.lon }}
            title={`سكوتر: ${scooter.id}`}
          >
            {/* تصميم أيقونة السكوتر على الخريطة */}
            <View style={styles.markerContainer}>
               <Ionicons name="bicycle" size={18} color="white" />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* أزرار التحكم العلوية */}
      <View style={styles.topNavigation}>
        <TouchableOpacity style={styles.roundBtn}>
          <Ionicons name="menu" size={26} color="#1A1C1E" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.roundBtn}>
          <Ionicons name="help-circle-outline" size={26} color="#1A1C1E" />
        </TouchableOpacity>
      </View>

      {/* مؤشر تحميل يظهر فقط عند فتح التطبيق لأول مرة */}
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#4facfe" />
        </View>
      )}

      {/* القائمة السفلية (Bottom Sheet) - ستايل Rabbit */}
      <View style={styles.bottomSheet}>
        <View style={styles.dragHandle} />
        
        <View style={styles.headerRow}>
          <Text style={styles.brandTitle}>Yalla Scooter</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>متاح الآن</Text>
          </View>
        </View>

        <Text style={styles.description}>
          هناك {scooters.length} سكوترات حولك. اختر الأقرب وابدأ رحلتك.
        </Text>
        
        <TouchableOpacity 
          style={styles.mainActionBtn} 
          onPress={onStartScan}
          activeOpacity={0.8}
        >
          <Ionicons name="qr-code-outline" size={24} color="white" style={{marginRight: 12}} />
          <Text style={styles.mainActionText}>Scan to Ride</Text>
        </TouchableOpacity>
      </View>

      {/* زر تحديد الموقع الحالي (العائم) */}
      <TouchableOpacity style={styles.locateBtn}>
        <Ionicons name="locate" size={24} color="#4facfe" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  map: { width: width, height: height },
  
  // استايل أيقونة السكوتر
  markerContainer: { 
    backgroundColor: '#4facfe', 
    padding: 7, 
    borderRadius: 20, 
    borderWidth: 2, 
    borderColor: '#fff',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5
  },

  // التحكم العلوي
  topNavigation: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  roundBtn: { 
    backgroundColor: 'white', 
    padding: 12, 
    borderRadius: 15, 
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10
  },

  // القائمة السفلية
  bottomSheet: { 
    position: 'absolute', 
    bottom: 0, 
    width: '100%', 
    backgroundColor: 'white', 
    paddingHorizontal: 25, 
    paddingBottom: 40,
    paddingTop: 15,
    borderTopLeftRadius: 35, 
    borderTopRightRadius: 35,
    elevation: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 20
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  brandTitle: { fontSize: 26, fontWeight: 'bold', color: '#1A1C1E' },
  badge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20
  },
  badgeText: { color: '#4facfe', fontSize: 12, fontWeight: 'bold' },
  description: { fontSize: 14, color: '#777', marginBottom: 25, lineHeight: 20 },
  
  // زر المسح (الرئيسي)
  mainActionBtn: { 
    backgroundColor: '#4facfe', 
    flexDirection: 'row',
    height: 65, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  mainActionText: { color: 'white', fontSize: 20, fontWeight: 'bold' },

  // زر الموقع العائم
  locateBtn: {
    position: 'absolute',
    bottom: 230,
    right: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10
  },

  // طبقة التحميل
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center'
  }
});