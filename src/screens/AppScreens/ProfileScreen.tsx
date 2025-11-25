import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  I18nManager,
  Alert,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/i18n';
import Storage from '../../utils/storage';
import RNRestart from 'react-native-restart';
import { storeUserData } from '../../redux/UserSlice';

const PROFILE_PIC =
  'https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png';

const ProfileScreen: React.FC = () => {
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user.value);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [biometricEnabled, setBiometricEnabled] = useState<boolean>(false);

  const onLogout = () => {
    Alert.alert(t('logout'), t('logoutMsg'), [
      {
        text: t('cancel'),
        style: 'cancel',
      },
      {
        text: t('logout'),
        style: 'destructive',
        onPress: async () => {
          await Storage.removeItem('user'); // remove user data
          // await Storage.removeItem("useBiometrics"); // optional
          dispatch(storeUserData(null)); // clear redux
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        },
      },
    ]);
  };

  const onChangeLanguage = () => {
    Alert.alert('Select Language', 'Please choose your preferred language:', [
      {
        text: 'English',
        onPress: async () => {
          i18n.changeLanguage('en');
          I18nManager.forceRTL(false);
          I18nManager.allowRTL(false);
          Storage.setItem('lng', JSON.stringify({ selected: 'en' }));
          RNRestart.Restart(); // MUST restart for RTL/LTR switch
        },
      },
      {
        text: 'العربية',
        onPress: async () => {
          i18n.changeLanguage('ar');
          I18nManager.forceRTL(true);
          I18nManager.allowRTL(true);
          Storage.setItem('lng', JSON.stringify({ selected: 'ar' }));
          RNRestart.Restart();
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  return (
    <SafeAreaProvider style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.header}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: PROFILE_PIC }} style={styles.avatar} />
          </View>

          <Text style={styles.name}>{userData?.name}</Text>
          <Text style={styles.email}>{userData?.email}</Text>
        </View>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('FavEvent')}
            activeOpacity={0.7}
          >
            <View style={styles.rowLeft}>
              <Text style={styles.rowIcon}>⭐</Text>
              <Text style={styles.rowText}>{t('myFavoriteEvent')}</Text>
            </View>
            <Text
              style={[
                styles.chev,
                {
                  transform: [{ scaleX: isRTL ? -1 : 1 }],
                },
              ]}
            >
              ›
            </Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          {/* <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Text style={styles.rowIcon}>🔒</Text>
              <Text style={styles.rowText}>{t('enableBioLogin')}</Text>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ true: '#6C5CE7', false: '#E6E9F2' }}
              thumbColor={biometricEnabled ? '#FFFFFF' : '#FFFFFF'}
            />
          </View> */}

          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.row}
            onPress={onChangeLanguage}
            activeOpacity={0.7}
          >
            <View style={styles.rowLeft}>
              <Text style={styles.rowIcon}>🔃</Text>
              <Text style={[styles.rowText]}>{t('changeLanguage')}</Text>
            </View>
            <Text
              style={[
                styles.chev,
                {
                  transform: [{ scaleX: isRTL ? -1 : 1 }],
                },
              ]}
            >
              ›
            </Text>
          </TouchableOpacity>
          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.row}
            onPress={onLogout}
            activeOpacity={0.7}
          >
            <View style={styles.rowLeft}>
              <Text style={styles.rowIcon}>⎋</Text>
              <Text style={[styles.rowText, { color: '#E23B3B' }]}>
                {t('logout')}
              </Text>
            </View>
            <Text
              style={[
                styles.chev,
                {
                  transform: [{ scaleX: isRTL ? -1 : 1 }],
                },
              ]}
            >
              ›
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#2B2F7A',
    fontWeight: '700',
    marginBottom: 18,
  },
  header: {
    alignItems: 'center',
    width: '100%',
  },
  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editButton: {
    position: 'absolute',
    right: -6,
    bottom: -6,
    backgroundColor: '#6C5CE7',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  editIcon: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  name: {
    fontSize: 22,
    color: '#2B2F7A',
    fontWeight: '700',
    marginTop: 6,
  },
  email: {
    fontSize: 14,
    color: '#8F95A8',
    marginBottom: 18,
  },
  statsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingHorizontal: 6,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  statEmoji: {
    fontSize: 22,
  },
  statValue: {
    fontSize: 16,
    color: '#2B2F7A',
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    color: '#A1A6BF',
  },
  card: {
    marginTop: 24,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 6,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowIcon: {
    fontSize: 18,
    marginRight: 12,
    width: 26,
    textAlign: 'center',
  },
  rowText: {
    fontSize: 16,
    color: '#22223A',
    fontWeight: '600',
  },
  chev: {
    fontSize: 22,
    color: '#A1A6BF',
  },
  separator: {
    height: 1,
    backgroundColor: '#F1F3F8',
    marginLeft: 12,
    marginRight: 12,
  },
});
