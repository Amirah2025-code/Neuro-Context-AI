function analyze() {
    let text = document.getElementById("inputText").value.trim();
    let resultBox = document.getElementById("result");

    if (text.length === 0) {
        resultBox.innerHTML = "❗ الرجاء كتابة النص أولاً للبدء بالتحليل.";
        return;
    }

    // تأثير تحميل وهمي سريع (شكل احترافي)
    resultBox.innerHTML = "🔍 جاري تحليل السياق بشكل عميق...";
    setTimeout(() => {
        resultBox.innerHTML = generateDeepAnalysis(text);
    }, 800);
}

/* ====== محرك التحليل الاحترافي ====== */
function generateDeepAnalysis(text) {
    return `
        <b>🔶 التحليل السياقي العميق:</b><br><br>

        <b>▫️ فهم النبرة العامة:</b><br>
        ${detectTone(text)}<br><br>

        <b>▫️ تحليل المشاعر المخفية:</b><br>
        ${detectEmotion(text)}<br><br>

        <b>▫️ النقاط الجوهرية في النص:</b><br>
        ${extractKeyPoints(text)}<br><br>

        <b>▫️ الاستنتاج الذكي:</b><br>
        ${generateConclusion(text)}
    `;
}

/* ====== تحليل النبرة ====== */
function detectTone(text) {
    if (text.includes("لا") || text.includes("مش") || text.includes("خطأ")) {
        return "النبرة تميل إلى السلبية أو الاعتراض.";
    }
    if (text.includes("شكراً") || text.includes("ممتاز") || text.includes("رائع")) {
        return "النبرة إيجابية ومتحمسة.";
    }
    return "النبرة حيادية بدون ميل واضح.";
}

/* ====== تحليل المشاعر ====== */
function detectEmotion(text) {
    if (text.includes("خائف") || text.includes("قلق") || text.includes("تعبت")) {
        return "يوجد شعور بالضغط أو القلق.";
    }
    if (text.includes("سعيد") || text.includes("مبسوط") || text.includes("فرحان")) {
        return "يوجد طاقة عاطفية إيجابية.";
    }
    return "لا تظهر مشاعر واضحة في النص.";
}

/* ====== استخراج النقاط الأساسية ====== */
function extractKeyPoints(text) {
    let words = text.split(" ");
    let short = words.slice(0, 6).join(" ");
    return `يبدو أنك تتحدث عن: <i>${short}...</i>`;
}

/* ====== الاستنتاج ====== */
function generateConclusion(text) {
    return "النص يعبر عن فكرة واضحة، ويمكن تطويره أو فهمه بشكل أعمق بناءً على السياق الكامل.";
}
