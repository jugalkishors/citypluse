// src/utils/rtl.js
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart'; // optional but recommended

export const setAppLanguage = async (lang: string) => {
  // lang = 'en' or 'ar'
  const isRTL = lang === 'ar';

  // allow RTL layouts
  I18nManager.allowRTL(isRTL);       // allow flipping layout direction
  I18nManager.forceRTL(isRTL);       // force the direction

  await AsyncStorage.setItem('appLanguage', lang);

  // RN requires reload/app restart to apply layout direction changes
  // RNRestart.Restart() will fully restart the app
  RNRestart.Restart();
};

export const getStoredLanguage = async () => {
  return (await AsyncStorage.getItem('appLanguage')) || null;
};
