const firebaseConfig = { databaseURL: "https://yalla-scooter-pro-default-rtdb.firebaseio.com" };
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// دالة جلب الأرقام وتحليلها
db.ref().on('value', snapshot => {
    const data = snapshot.val();
    const finance = data.finance_pure || {};
    const users = data.users || {};
    const expenses = data.expenses_pure || {}; // افترضنا وجود فرع للمصاريف
    
    let totalIn = 0, totalOut = 0, wallets = 0, debt = 0;
    
    // 1. حساب الدخل
    Object.values(finance).forEach(f => totalIn += (f.revenue || 0));
    
    // 2. حساب المصاريف
    Object.values(expenses).forEach(e => totalOut += (e.amount || 0));
    
    // 3. حساب الأرصدة والديون
    Object.values(users).forEach(u => {
        wallets += (u.balance || 0);
        debt += (u.debt || 0);
    });

    // 4. صافي الربح والنمو
    const net = totalIn - totalOut;
    document.getElementById('netProfit').innerText = net.toLocaleString() + " ج";
    document.getElementById('totalRevenue').innerText = totalIn.toLocaleString() + " ج";
    document.getElementById('totalExpenses').innerText = totalOut.toLocaleString() + " ج";
    document.getElementById('finWallets').innerText = wallets.toLocaleString() + " ج";
    document.getElementById('finDebt').innerText = debt.toLocaleString() + " ج";

    // 5. تحليل أداء السكوترات (مثال)
    let scooterData = "";
    // هنا السيستم بيجرد السكوترات ويرتبها (تحليل بيانات)
    const topScooters = [{id:"05", rev:540}, {id:"02", rev:320}, {id:"09", rev:150}];
    topScooters.forEach(s => {
        scooterData += `
        <div class="scooter-row">
            <span>سكوتر رقم #${s.id}</span>
            <span class="success">${s.rev} ج</span>
        </div>`;
    });
    document.getElementById('scooterList').innerHTML = scooterData;
});

// دالة لفتح إضافة مصروف (للتجربة)
function openExpenseModal() {
    const amt = prompt("أدخل مبلغ المصروف:");
    if(amt) {
        const desc = prompt("سبب الصرف:");
        db.ref('expenses_pure').push({
            amount: parseFloat(amt),
            reason: desc,
            date: new Date().toISOString().split('T')[0]
        });
    }
}
