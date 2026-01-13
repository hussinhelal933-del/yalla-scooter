// 1. إعداد Firebase (استبدل الرابط برابط قاعدة بياناتك إذا كان مختلفاً)
const firebaseConfig = {
    databaseURL: "https://yalla-scooter-pro-default-rtdb.firebaseio.com"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 2. دالة لجلب تاريخ اليوم بتنسيق (YYYY-MM-DD)
const todayKey = () => new Date().toISOString().split('T')[0];

// 3. تحديث أرصدة وديون المستخدمين بشكل لحظي
db.ref('users').on('value', snap => {
    let wallets = 0, debt = 0;
    snap.forEach(u => {
        const data = u.val();
        wallets += (data.balance || 0);
        debt += (data.debt || 0);
    });
    document.getElementById('finWallets').innerText = wallets.toFixed(1) + " ج";
    document.getElementById('finDebt').innerText = debt.toFixed(1) + " ج";
});

// 4. تحديث عدد الرحلات النشطة حالياً
db.ref('active_trips').on('value', s => {
    document.getElementById('finTrips').innerText = s.numChildren();
});

// 5. جلب ومعالجة البيانات المالية (السجل اليومي)
db.ref('finance_pure').on('value', snap => {
    const today = todayKey();
    const month = today.slice(0, 7);
    let todayRev = 0, todayTrips = 0, monthRev = 0;
    let tableRows = "";

    snap.forEach(d => {
        const f = d.val();
        // بناء صفوف الجدول (الأحدث يظهر أولاً)
        tableRows = `<tr>
            <td>${d.key}</td>
            <td>${f.trips}</td>
            <td>${f.revenue} ج</td>
        </tr>` + tableRows;

        // حساب دخل اليوم
        if (d.key === today) {
            todayRev = f.revenue;
            todayTrips = f.trips;
        }
        // حساب دخل الشهر
        if (d.key.startsWith(month)) {
            monthRev += f.revenue;
        }
    });

    // عرض البيانات في الواجهة
    document.getElementById('financeBody').innerHTML = tableRows;
    document.getElementById('finToday').innerText = todayRev + " ج";
    document.getElementById('finMonth').innerText = monthRev + " ج";
    document.getElementById('finAvg').innerText = todayTrips ? (todayRev / todayTrips).toFixed(1) + " ج" : "0 ج";
});
