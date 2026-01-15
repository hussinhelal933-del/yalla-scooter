import { db } from '../../firebase';
import { ref, onValue } from 'firebase/database';

/**
 * دالة للاستماع للسكوترات المتاحة في قاعدة البيانات
 * @param {function} callback - الدالة التي سيتم تحديث شاشة الخريطة من خلالها
 */
export const listenToScooters = (callback) => {
  // تحديد المسار في قاعدة البيانات (Nodes)
  const scootersRef = ref(db, 'live_nodes');
  
  // البدء في مراقبة أي تغيير يحدث في هذا المسار
  const unsubscribe = onValue(scootersRef, (snapshot) => {
    const data = snapshot.val();
    const availableScooters = [];

    if (data) {
      // تحويل البيانات من شكل Object إلى Array ليسهل عرضها على الخريطة
      Object.keys(data).forEach((key) => {
        const scooter = data[key];
        
        // لا نعرض إلا السكوترات التي حالتها "available"
        if (scooter.status === 'available') {
          availableScooters.push({
            id: key,
            lat: scooter.lat,
            lon: scooter.lon,
            battery: scooter.bat || 100 // إذا لم توجد نسبة بطارية نفترض أنها 100
          });
        }
      });
    }
    
    // إرسال القائمة المحدثة للشاشة
    callback(availableScooters);
  });

  // إرجاع دالة الإغلاق (Unsubscribe) للحفاظ على أداء الجهاز
  return unsubscribe;
};