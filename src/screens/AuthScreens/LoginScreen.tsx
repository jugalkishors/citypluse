import React from 'react';
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  I18nManager,
} from 'react-native';
import Font from '../../assets/fonts';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation';
import { validateField } from '../../utils/validation';
import { toast } from '../../utils/toast';
import { LoginUser } from '../../services/AuthAPIs';
import { useDispatch } from 'react-redux';
import { storeUserData } from '../../redux/UserSlice';
import { useTranslation } from 'react-i18next';

const LoginScreen: React.FC = () => {
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    email: '',
    password: '',
  });

  const handleLogin = () => {
    let emailError = validateField('email', state.email);
    let passwordError = validateField('password', state.password);

    if (emailError) {
      toast.error('Invalid Email', emailError);
      return;
    }
    if (passwordError) {
      toast.error('Invalid Password', passwordError);
      return;
    }

    LoginUser(state.email, state.password)
      .then(res => {
        if (res.success) {
          dispatch(storeUserData(res?.data));
          toast.success('Login Successful', res.message);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        } else {
          toast.error('Login Failed', res.message);
        }
      })
      .catch(err => {
        toast.error('Login Error', 'An error occurred during login.');
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>{t('login')}</Text>
      <CustomInput
        icon="✉️"
        placeholder={t('emailAddress')}
        value={state.email}
        onChangeText={txt =>
          setState(prevState => ({ ...prevState, email: txt }))
        }
      />
      <CustomInput
        icon="🔒"
        placeholder={t('password')}
        secureTextEntry
        value={state.password}
        onChangeText={txt =>
          setState(prevState => ({ ...prevState, password: txt }))
        }
      />
      <CustomButton title={t('login')} onPress={handleLogin} />
      <Text style={styles.registerPrompt}>{t('dontHaveAccount')}</Text>
      <CustomButton
        title={t('register')}
        variant="outlined"
        onPress={() => navigation.navigate('Register')}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FAFD',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: Font.AsapBold,
    fontSize: 32,
    color: '#111',
    marginBottom: 32,
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F1F8',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    width: '100%',
    height: 56,
  },
  icon: {
    marginRight: 12,
    fontSize: 20,
    color: '#111',
  },
  input: {
    flex: 1,
    fontFamily: Font.AsapMedium,
    fontSize: 16,
    color: '#111',
  },
  loginButton: {
    backgroundColor: '#111',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontFamily: Font.AsapBold,
    fontSize: 20,
  },
  registerPrompt: {
    color: '#111',
    fontFamily: Font.AsapMedium,
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  registerButton: {
    borderWidth: 2,
    borderColor: '#111',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F5FAFD',
  },
  registerButtonText: {
    color: '#111',
    fontFamily: Font.AsapBold,
    fontSize: 20,
  },
});

export default LoginScreen;
