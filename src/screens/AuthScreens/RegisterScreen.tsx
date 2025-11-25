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
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation';
import { validateField } from '../../utils/validation';
import { toast } from '../../utils/toast';
import { RegisterUser } from '../../services/AuthAPIs';
import { useDispatch } from 'react-redux';
import { storeUserData } from '../../redux/UserSlice';
import { useTranslation } from 'react-i18next';

const RegisterScreen: React.FC = () => {
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleRegisterUser = () => {
    let nameError = validateField('fullName', state.fullName);
    let emailError = validateField('email', state.email);
    let passwordError = validateField('password', state.password);

    if (nameError) {
      toast.error('Invalid Name', nameError);
      return;
    }
    if (emailError) {
      toast.error('Invalid Email', emailError);
      return;
    }
    if (passwordError) {
      toast.error('Invalid Password', passwordError);
      return;
    }

    // Proceed with registration logic (e.g., API call)
    RegisterUser(state.fullName, state.email, state.password)
      .then(res => {
        if (res.success) {
          dispatch(storeUserData(res?.data));
          toast.success('Registration Successful', res.message);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        } else {
          toast.error('Registration Failed', res.message);
        }
      })
      .catch(err => {
        toast.error(
          'Registration Error',
          'An error occurred during registration.',
        );
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>{t('register')}</Text>
      <CustomInput
        icon="👤"
        placeholder={t('fullName')}
        value={state.fullName}
        onChangeText={txt =>
          setState(prevState => ({ ...prevState, fullName: txt }))
        }
      />
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
        secureTextEntry
        placeholder={t('password')}
        value={state.password}
        onChangeText={txt =>
          setState(prevState => ({ ...prevState, password: txt }))
        }
      />
      <CustomButton title={t('register')} onPress={handleRegisterUser} />
      <Text style={styles.registerPrompt}>{t('alreadyHaveAccount')}</Text>

      <CustomButton
        title={t('login')}
        variant="outlined"
        onPress={() => navigation.goBack()}
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

export default RegisterScreen;
