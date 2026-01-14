const firebaseConfig = {
    databaseURL: "https://yalla-scooter-pro-default-rtdb.firebaseio.com"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const todayKey = () => new Date().toISOString().split('T')[0];

// تحديث الأرصدة والديون
db.ref('users').on('value', snap => {
    let wallets = 0, debt = 0;
    snap.forEach(u => {
        const data = u.val();
        wallets += (data.balance || 0);
        debt += (data.debt || 0);
    });
    document.getElementById('finWallets').innerText = wallets.toFixed(0) + " ج";
    document.getElementById('finDebt').innerText = debt.toFixed(0) + " ج";
});

// تحديث المالية
db.ref('finance_pure').on('value', snap => {
    const today = todayKey();
    const month = today.slice(0, 7);
    let todayRev = 0, todayTrips = 0, monthRev = 0;
    let listHTML = "";

    snap.forEach(d => {
        const f = d.val();
        // تصميم الكارت للموبايل بدل الجدول
        listHTML = `
        <div class="history-item">
            <div>
                <small style="color:#555">${d.key}</small>
                <div style="font-weight:bold">${f.trips} رحلة</div>
            </div>
            <div style="color:#00d2ff; font-weight:bold">+ ${f.revenue} ج</div>
        </div>` + listHTML;

        if (d.key === today) { todayRev = f.revenue; todayTrips = f.trips; }
        if (d.key.startsWith(month)) { monthRev += f.revenue; }
    });

    document.getElementById('financeBody').innerHTML = listHTML;
    document.getElementById('finToday').innerText = todayRev + " ج";
    document.getElementById('finMonth').innerText = monthRev + " ج";
    document.getElementById('finTrips').innerText = todayTrips;
    document.getElementById('finAvg').innerText = todayTrips ? (todayRev / todayTrips).toFixed(1) + " ج" : "0 ج";
});
