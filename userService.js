import { db } from '../../firebase';
import { ref, get, update, increment } from 'firebase/database';

/**
 * جلب بيانات المستخدم بالكامل (الاسم، المحفظة، إلخ)
 * @param {string} userId - معرف المستخدم
 */
export const getUserData = async (userId) => {
  try {
    const snapshot = await get(ref(db, `users/${userId}`));
    return snapshot.val();
  } catch (error) {
    console.error("خطأ في جلب بيانات المستخدم:", error);
    return null;
  }
};

/**
 * جلب رصيد المحفظة الحالي فقط
 * @param {string} userId - معرف المستخدم
 */
export const getUserWallet = async (userId) => {
  try {
    const snapshot = await get(ref(db, `users/${userId}/wallet`));
    return snapshot.val() || 0;
  } catch (error) {
    console.error("خطأ في جلب الرصيد:", error);
    return 0;
  }
};

/**
 * إنهاء الرحلة مالياً:
 * 1. خصم التكلفة من محفظة المستخدم.
 * 2. تحديث إحصائيات الدخل اليومي لـ لوحة التحكم (Dashboard).
 * 
 * @param {string} userId - معرف المستخدم (مثلاً: user_01)
 * @param {number} cost - التكلفة النهائية للرحلة
 */
export const processRideEnd = async (userId, cost) => {
  try {
    // 1. تحديث محفظة المستخدم بالخصم (استخدام increment بالسالب)
    const userRef = ref(db, `users/${userId}`);
    await update(userRef, {
      wallet: increment(-cost) 
    });

    // 2. تحديث بيانات الإيرادات في الـ Dashboard المالية
    // نستخدم التاريخ الحالي كمفتاح لتنظيم الدخل يوم ببيوم
    const today = new Date().toISOString().split('T')[0];
    const statsRef = ref(db, `statistics/daily_income/${today}`);
    
    await update(statsRef, {
      total_revenue: increment(cost),
      total_rides: increment(1)
    });

    console.log("تمت العملية المالية وتحديث الـ Dashboard بنجاح ✅");
    return { success: true };
  } catch (error) {
    console.error("فشل في إتمام العملية المالية:", error);
    return { success: false, error };
  }
};