// src/i18n.js
import RNLocalize from 'react-native-localize';
import i18n, { changeLanguage } from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation:
    {
        upcomingEvents: 'Upcoming Events',
        favoriteEvents: 'Favorite Events',
        myFavoriteEvent: 'My Favorites Events',
        enableBioLogin: 'Enable Biometric Login',
        noFavoriteEvents: 'No favorite events found.',
        morning: 'Good morning',
        afternoon: 'Good afternoon',
        evening: 'Good evening',
        login: 'Login',
        register: 'Register',
        logout: 'Logout',
        changeLanguage: 'Change Language',
        logoutMsg: 'Are you sure you want to logout?',
        cancel: 'Cancel',
        fullName: 'Full Name',
        emailAddress: 'Email Address',
        password: 'Password',
        dontHaveAccount: "Don't you have an account?",
        alreadyHaveAccount: 'Already you have an account?',
        searchEvent: 'Search Events',
    }
},
  ar: {
    translation:
    {
        upcomingEvents: 'الأحداث القادمة',
        favoriteEvents: 'الأحداث المفضلة',
        myFavoriteEvent: 'أحداثي المفضلة',
        enableBioLogin: 'تمكين تسجيل الدخول البيومتري',
        noFavoriteEvents: 'لم يتم العثور على أحداث مفضلة.',
        morning: 'صباح الخير',
        afternoon: 'مساء الخير',
        logout: 'مساء الخير',
        evening: 'مساء الخير',
        login: 'تسجيل الدخول',
        register: 'تسجيل',
        changeLanguage: 'تغيير اللغة',
        logoutMsg: 'هل أنت متأكد أنك تريد تسجيل الخروج؟',
        cancel: 'إلغاء',
        fullName: 'الاسم الكامل',
        emailAddress: 'عنوان البريد الإلكتروني',
        password: 'كلمة المرور',
        dontHaveAccount: 'أليس لديك حساب؟',
        alreadyHaveAccount: 'هل لديك حساب بالفعل؟',
        searchEvent: 'حدث البحث',
    }
},
};

let languageTag = 'en';
let isRTL = false;

try {
  const locales = RNLocalize.getLocales();

  if (Array.isArray(locales) && locales.length > 0) {
    languageTag = locales[0]?.languageTag ?? 'en';
    isRTL = locales[0]?.isRTL ?? false;
  }
} catch (e) {
  console.log('Localize Error:', e);
}

i18n.use(initReactI18next).init({
  resources,
  lng: languageTag.startsWith('ar') ? 'ar' : 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
