import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Storage from './src/utils/storage';
import { storeUserData } from './src/redux/UserSlice';
import i18n from './src/i18n/i18n';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const userData = useSelector((state: any) => state.user.value);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<'Login' | 'Home' | ''>('');

  useEffect(() => {
    Storage.getItem('user')
      .then(res => {
        Storage.getItem('lng')
          .then(lang => {
            if (lang?.selected) {
              i18n.changeLanguage(lang?.selected);
            } else {
              Storage.setItem('lng', JSON.stringify({ selected: 'en' }));
            }
          })
          .catch(err =>
            console.error('Error fetching language from storage:', err),
          );

        if (res) {
          dispatch(storeUserData(res));
          setLoading('Home');
        } else {
          setLoading('Login');
        }
      })
      .catch(err => {
        setLoading('Login');
        console.error('Error fetching user data from storage:', err);
      });
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#000' : '#FFF'}
      />
      {loading != '' && <AppNavigator screenName={loading} />}
      <Toast />
    </SafeAreaProvider>
  );
}

export default App;
