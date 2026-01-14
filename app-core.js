/* 
   YALLA SCOOTER TITAN DESIGN SYSTEM V300.0 
   Theme: Premium White & Royal Blue | Rabbit Clone Architecture
*/

:root {
    --u-blue: #0066ff;
    --u-bg: #ffffff;
    --u-light: #f0f6ff;
    --text-dark: #1a1a1a;
    --text-gray: #8e8e93;
    --border: #f2f2f7;
    --danger: #ff3b30;
    --success: #34c759;
    --warn: #ff9500;
    --fallen: #bc13fe;
    --shadow-soft: 0 10px 40px rgba(0,0,0,0.06);
    --shadow-blue: 0 10px 30px rgba(0,102,255,0.25);
}

/* تنسيق تطبيق الموبايل الاحترافي */
* { box-sizing: border-box; font-family: 'Cairo', sans-serif; -webkit-tap-highlight-color: transparent; outline: none; }
body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; background: white; color: var(--text-dark); }

/* الخريطة (ستايل رابيت الرمادي) */
#map { position: absolute; inset: 0; z-index: 1; filter: grayscale(0.15) contrast(1.1); }

/* واجهة العميل العائمة (HUD) */
.hud { position: absolute; inset: 0; pointer-events: none; z-index: 1000; }
.hud button { pointer-events: auto; box-shadow: var(--shadow-soft); transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.hud button:active { transform: scale(0.9); }

/* الأزرار الدائرية (Menu, Locate, Chat) */
.fab { width: 60px; height: 60px; background: white; border: none; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; color: var(--u-blue); position: absolute; }
.btn-menu { bottom: 40px; right: 25px; }
.btn-locate { bottom: 40px; left: 25px; }
.btn-support-top { top: 60px; right: 25px; width: 48px; height: 48px; font-size: 18px; color: var(--text-dark); }

/* زر الـ Scan العملاق (Rabbit Original) */
.btn-scan-main {
    position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
    background: var(--u-blue); color: white; padding: 18px 45px; border-radius: 50px;
    font-weight: 900; font-size: 20px; width: 240px; border: none;
    box-shadow: var(--shadow-blue); pointer-events: auto;
    display: flex; align-items: center; gap: 12px; justify-content: center;
}

/* تاق المعلومات العلوي (Minutes Walk) */
.info-tag-top {
    position: absolute; top: 60px; left: 50%; transform: translateX(-50%);
    background: white; padding: 10px 25px; border-radius: 50px; 
    box-shadow: var(--shadow-soft); font-weight: 900; font-size: 13px; 
    display: flex; align-items: center; gap: 8px; border: 1.5px solid var(--border);
    pointer-events: auto;
}

/* القائمة الجانبية (Side Menu Rabbit Style) */
#side-menu { 
    position: fixed; top: 0; right: -100%; width: 85%; height: 100%; 
    background: white; z-index: 5000; padding: 70px 35px; 
    display: flex; flex-direction: column; transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: -10px 0 40px rgba(0,0,0,0.12); 
}
#side-menu.open { right: 0; }
.menu-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 4999; display: none; backdrop-filter: blur(5px); }

.menu-link { display: flex; align-items: center; gap: 20px; padding: 22px 0; border-bottom: 1px solid var(--border); font-weight: 700; color: var(--text-dark); cursor: pointer; }
.menu-link i { color: var(--u-blue); font-size: 22px; width: 30px; text-align: center; }

/* شاشات كاملة (Full Pages) */
.full-page { position: fixed; inset: 0; background: white; z-index: 6000; display: none; flex-direction: column; animation: slideUp 0.4s ease; overflow-y: auto; }
@keyframes slideUp { from {transform: translateY(100%);} to {transform: translateY(0);} }
.pg-header { padding: 25px; display: flex; align-items: center; justify-content: space-between; border-bottom: 2.5px solid var(--u-light); font-weight: 900; color: var(--u-blue); font-size: 22px; }

/* تصميم الماركرات والبطارية */
.marker-bike { width: 48px; height: 48px; background: white; border-radius: 50%; border: 2.5px solid var(--u-blue); display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-soft); position: relative; }
.batt-tag { position: absolute; top: -30px; background: white; border: 1px solid #eee; padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: 900; }
