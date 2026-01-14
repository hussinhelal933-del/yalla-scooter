// بيانات الربط بفايربيز
const firebaseConfig = { 
    apiKey: "AIzaSy...", // حط الـ API Key بتاعك هنا
    databaseURL: "https://yalla-scooter-pro-default-rtdb.firebaseio.com",
    authDomain: "yalla-scooter-pro.firebaseapp.com"
};
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

let isLoginView = true;

// وظيفة التبديل بين الدخول والتسجيل
function toggleView() {
    isLoginView = !isLoginView;
    document.getElementById('authTitle').innerText = isLoginView ? "تسجيل الدخول" : "إنشاء حساب جديد";
    document.getElementById('mainBtn').innerText = isLoginView ? "دخول" : "تسجيل";
    document.getElementById('toggleText').innerText = isLoginView ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟";
    document.getElementById('toggleBtn').innerText = isLoginView ? "سجل الآن" : "دخول";
    document.getElementById('phoneGroup').style.display = isLoginView ? "none" : "block";
}

// وظيفة تنفيذ الدخول أو التسجيل
function handleAuth() {
    const email = document.getElementById('userEmail').value;
    const pass = document.getElementById('userPass').value;
    const phone = document.getElementById('userPhone').value;

    if (isLoginView) {
        // تسجيل دخول بالإيميل
        auth.signInWithEmailAndPassword(email, pass)
            .then(() => location.href = 'index.html')
            .catch(err => alert("خطأ: " + err.message));
    } else {
        // إنشاء حساب جديد
        auth.createUserWithEmailAndPassword(email, pass)
            .then((res) => {
                // حفظ رقم الهاتف في قاعدة البيانات
                db.ref(`users/${res.user.uid}`).set({
                    email: email,
                    phone: phone,
                    balance: 0,
                    name: "عميل يالا"
                });
                location.href = 'index.html';
            })
            .catch(err => alert("خطأ في التسجيل: " + err.message));
    }
}

// أهم جزء: حفظ تسجيل الدخول (لو المستخدم مسجل قبل كدة يدخله فوراً)
auth.onAuthStateChanged(user => {
    if (user && location.pathname.includes('auth.html')) {
        location.href = 'index.html'; // لو مسجل دخول ودخل صفحة الـ auth، واديه الخريطة فوراً
    }
});
