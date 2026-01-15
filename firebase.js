import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// بيانات مشروعك من Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyC7BK9qmdE9Bo335g6SoJqhNc-tvfRbjXc",
  authDomain: "yala-scooter-bed63.firebaseapp.com",
  databaseURL: "https://yala-scooter-bed63-default-rtdb.firebaseio.com",
  projectId: "yala-scooter-bed63",
  storageBucket: "yala-scooter-bed63.firebasestorage.app",
  messagingSenderId: "999568071208",
  appId: "1:999568071208:web:5947277bda9864199ef31d"
};

// تشغيل الاتصال
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// تصدير db لاستخدامها في باقي الخدمات
export { db };