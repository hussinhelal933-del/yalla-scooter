const firebaseConfig = { databaseURL: "https://yalla-scooter-pro-default-rtdb.firebaseio.com" };
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const uid = "user_933"; 

// تحديث الرصيد
db.ref(`users/${uid}/balance`).on('value', s => {
    if(document.getElementById('userBalance')) document.getElementById('userBalance').innerText = s.val().toFixed(2);
});

// بدء الرحلة
function startUnlock() {
    db.ref(`users/${uid}/balance`).once('value').then(s => {
        if(s.val() < 10) alert("الرصيد غير كافٍ (أقل مبلغ 10 ج)");
        else location.href = 'ride.html';
    });
}

// محرك العداد (يشتغل فقط في صفحة ride.html)
if(location.pathname.includes('ride.html')) {
    let sec = 0, startFee = 5, minPrice = 2;
    setInterval(() => {
        sec++;
        let cost = startFee + ((sec/60) * minPrice);
        document.getElementById('timer').innerText = Math.floor(sec/60).toString().padStart(2,'0') + ":" + (sec%60).toString().padStart(2,'0');
        document.getElementById('cost').innerText = cost.toFixed(2);
        // تحديث الشبكة (المالية بتشوف ده لايف)
        db.ref(`active_trips/${uid}`).update({ cost: cost, time: sec });
    }, 1000);
}

function stopRide() {
    alert("تم إنهاء الرحلة.. شكراً لاستخدام يالا سكوتر");
    location.href = 'index.html';
}
