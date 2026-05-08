import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "home": "Home",
      "checker": "Symptom Checker",
      "dashboard": "Dashboard",
      "login": "Login",
      "register": "Sign Up",
      "logout": "Logout",
      "hero_title": "AI-Powered Disease Prediction",
      "hero_subtitle": "Predict Early, Stay Healthy",
      "hero_desc": "Get instant health insights using advanced machine learning. Select your symptoms and receive early detection guidance in seconds.",
      "start_checker": "Start Symptom Checker",
      "join_now": "Join Now",
      "why_choose": "Why Choose HealthAI?",
      "acc_pred": "Accurate Predictions",
      "inst_res": "Instant Results",
      "prev_care": "Preventive Care",
      "how_it_works": "How It Works",
      "step1_title": "Select Symptoms",
      "step2_title": "AI Analysis",
      "step3_title": "Get Insights",
      "symptom_search_placeholder": "Search symptoms (e.g. fever, headache)...",
      "run_analysis": "Run Prediction Analysis",
      "analyzing": "Analyzing Symptoms...",
      "top_prediction": "Top Prediction",
      "confidence": "Confidence",
      "symptoms_matched": "Symptoms Matched",
      "risk_assessment": "Risk Assessment",
      "rec_actions": "Recommended Actions",
      "new_assessment": "New Assessment",
      "download_report": "Download Report (PDF)",
    }
  },
  hi: {
    translation: {
      "home": "होम",
      "checker": "लक्षण जांच",
      "dashboard": "डैशबोर्ड",
      "login": "लॉगिन",
      "register": "साइन अप",
      "logout": "लॉगआउट",
      "hero_title": "AI-आधारित रोग भविष्यवाणी",
      "hero_subtitle": "जल्दी भविष्यवाणी करें, स्वस्थ रहें",
      "hero_desc": "उन्नत मशीन लर्निंग का उपयोग करके तत्काल स्वास्थ्य जानकारी प्राप्त करें। अपने लक्षणों का चयन करें और सेकंडों में शुरुआती पहचान मार्गदर्शन प्राप्त करें।",
      "start_checker": "लक्षण जांच शुरू करें",
      "join_now": "अभी शामिल हों",
      "why_choose": "HealthAI क्यों चुनें?",
      "acc_pred": "सटीक भविष्यवाणियां",
      "inst_res": "त्वरित परिणाम",
      "prev_care": "निवारक देखभाल",
      "how_it_works": "यह कैसे काम करता है",
      "step1_title": "लक्षण चुनें",
      "step2_title": "AI विश्लेषण",
      "step3_title": "जानकारी प्राप्त करें",
      "symptom_search_placeholder": "लक्षण खोजें (जैसे बुखार, सिरदर्द)...",
      "run_analysis": "भविष्यवाणी विश्लेषण चलाएं",
      "analyzing": "लक्षणों का विश्लेषण कर रहे हैं...",
      "top_prediction": "शीर्ष भविष्यवाणी",
      "confidence": "आत्मविश्वास",
      "symptoms_matched": "मैच किए गए लक्षण",
      "risk_assessment": "जोखिम मूल्यांकन",
      "rec_actions": "अनुशंसित कार्रवाइयां",
      "new_assessment": "नया मूल्यांकन",
      "download_report": "रिपोर्ट डाउनलोड करें (PDF)",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
