/* Neuro-Context AI — analysis engine (unique version) */

const $ = (s) => document.querySelector(s);

document.addEventListener("DOMContentLoaded", () => {
  window.analyze = runAnalysis;
});

function runAnalysis() {
  const text = $("#userInput").value.trim();
  const result = $("#result");

  if (!text) {
    result.innerHTML = "⚠️ الرجاء إدخال نص للتحليل.";
    return;
  }

  const insights = extractInsights(text);

  result.innerHTML = `
    <b>🔍 التحليل:</b><br><br>
    <b>✓ الأفكار الأساسية:</b> ${insights.core}<br>
    <b>✓ النبرة العاطفية:</b> ${insights.tone}<br>
    <b>✓ استنتاج سريع:</b> ${insights.fast}<br><br>
    <small>🧠 نموذج تجريبي — قابل للتطوير لاحقاً بنموذج ML حقيقي.</small>
  `;
}

function extractInsights(text) {
  const words = text.split(/\s+/);
  const longWords = words.filter(w => w.length > 6).slice(0, 3);
  const tone = /!|\؟|\?/.test(text) ? "انفعالي / حاد" : "هادئ / منطقي";

  return {
    core: longWords.length ? longWords.join(", ") : "لا كلمات بارزة",
    tone: tone,
    fast: words.length > 12 ? "النص يحتوي على محتوى غني" : "النص قصير — تحليل محدود"
  };
}
