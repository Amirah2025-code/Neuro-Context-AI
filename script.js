// ===============================
//  NEURO-CONTEXT AI CORE ENGINE
//  Ultra-Precision Semantic Analyzer
//  © 2025 – Amirah
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("userInput");
    const resultBox = document.getElementById("result");

    window.analyze = function () {
        const text = input.value.trim();

        if (text.length === 0) {
            resultBox.innerHTML = "⚠️ الرجاء إدخال نص للتحليل.";
            return;
        }

        // MAIN AI ENGINE
        const analysis = neuroContextEngine(text);

        // OUTPUT
        resultBox.innerHTML = analysis;
    };
});

// ===============================
//    INTELLIGENT ANALYSIS ENGINE
// ===============================
function neuroContextEngine(text) {

    // 1 ـــــــ استخراج النبرة
    const tone = detectTone(text);

    // 2 ـــــــ تحليل المعنى الدقيق
    const intent = detectIntent(text);

    // 3 ـــــــ تحليل المشاعر ودرجة القوة
    const emotion = detectEmotion(text);

    // 4 ـــــــ بنية الجملة والتناسق
    const structure = detectStructure(text);

    // 5 ـــــــ إنشاء تقرير متكامل
    return `
    <div class='box'>
        <h2>🔍 التحليل السياقي المتقدم</h2>

        <p><strong>🟡 النبرة:</strong> ${tone}</p>
        <p><strong>🟣 النية الأساسية:</strong> ${intent}</p>
        <p><strong>🔵 الحالة الشعورية:</strong> ${emotion}</p>
        <p><strong>🟠 البنية اللغوية:</strong> ${structure}</p>

        <hr>

        <h3>🧠 التلخيص الذكي:</h3>
        <p>${smartSummary(text)}</p>
    </div>
    `;
}

// =======================================
//       MODULE (1): Tone Detection
// =======================================
function detectTone(text) {
    if (/شك|أظن|ربما/.test(text)) return "متردد";
    if (/أريد|أحتاج/.test(text)) return "حازم";
    if (/شكراً|ممتاز|جميل/.test(text)) return "إيجابي";
    if (/لا|خطأ|مستحيل/.test(text)) return "رافض";

    return "محايد";
}

// =======================================
//       MODULE (2): Intent Detection
// =======================================
function detectIntent(text) {
    if (/ليش|لماذا|كيف/.test(text)) return "بحث عن تفسير";
    if (/أريد|ارجو|ساعد/.test(text)) return "طلب مساعدة";
    if (/اعمل|نفذ|سوي/.test(text)) return "أمر مباشر";

    return "نية عامة غير محددة";
}

// =======================================
//       MODULE (3): Emotion Detection
// =======================================
function detectEmotion(text) {
    if (/زعلان|حزين/.test(text)) return "حزن";
    if (/معصب|غاضب/.test(text)) return "غضب";
    if (/خايف|قلقان/.test(text)) return "قلق";
    if (/مبسوط|سعيد/.test(text)) return "سعادة";

    return "غير واضح";
}

// =======================================
//       MODULE (4): Structure Analysis
// =======================================
function detectStructure(text) {
    if (text.length < 20) return "قصير ومباشر";
    if (text.length < 60) return "متوسط وواضح";
    return "نص طويل يحتوي تفاصيل متعددة";
}

// =======================================
//       Module (5): Smart Summary
// =======================================
function smartSummary(text) {
    return "النص يعكس: " + text.slice(0, 40) + (text.length > 40 ? "..." : "");
}
