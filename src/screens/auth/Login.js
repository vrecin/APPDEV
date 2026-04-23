import { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { ROUTES } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../app/reducers/auth';
import { checkBackendConnection } from '../../app/api/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading, isError, errorMessage } = useSelector(state => state.auth);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    checkBackendConnection();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E073F" />

      {/* Decorative background orbs */}
      <View style={styles.orb1} />
      <View style={styles.orb2} />
      <View style={styles.orb3} />

      {/* Brand Mark */}
      <View style={styles.brandMark}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoIcon}>◈</Text>
        </View>
        <View style={styles.brandTextWrap}>
          <Text style={styles.brandName}>Moodura</Text>
          <Text style={styles.brandSub}>SCENTS</Text>
        </View>
      </View>

      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.eyebrow}>✦ WELCOME BACK ✦</Text>
        <Text style={styles.title}>Sign In</Text>
        <View style={styles.titleUnderline} />
        <Text style={styles.subtitle}>Every mood, every you</Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <CustomTextInput
          label={'Email'}
          placeholder={'Enter your email'}
          value={email}
          onChangeText={setEmail}
          containerStyle={styles.inputContainer}
          labelStyle={styles.inputLabel}
          textStyle={styles.inputText}
        />

        <CustomTextInput
          label={'Password'}
          placeholder={'Enter your password'}
          value={password}
          onChangeText={setPassword}
          containerStyle={[styles.inputContainer, { marginBottom: 0 }]}
          labelStyle={styles.inputLabel}
          textStyle={styles.inputText}
        />

        <TouchableOpacity style={styles.forgotWrap}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        {isError && errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <CustomButton
          label={'LOGIN'}
          containerStyle={styles.loginButton}
          textStyle={styles.loginButtonText}
          loading={isLoading === true}
          onPress={() => {
            dispatch(userLogin({ email: email.trim(), password }));
          }}
        />

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>✦</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.registerRow}>
          <Text style={styles.registerText}>Not registered yet?</Text>
          <TouchableOpacity
            style={{ marginLeft: 6 }}
            onPress={() => navigation.navigate(ROUTES.REGISTER)}
          >
            <Text style={styles.registerLink}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.footerText}>✦ MOODURA SCENTS ✦</Text>
    </View>
  );
};

const DEEP     = '#2E073F';
const VIOLET   = '#A976D1';
const LAVENDER = '#F0E8F7';
const MUTED    = '#6A5177';
const CARD     = '#FFFFFF';
const BG       = '#F6F1F8';
const BORDER   = '#E0CCE9';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  /* ── Orbs ── */
  orb1: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: DEEP,
    opacity: 0.08,
    top: -80,
    right: -100,
  },
  orb2: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: VIOLET,
    opacity: 0.1,
    bottom: 60,
    left: -80,
  },
  orb3: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: VIOLET,
    opacity: 0.06,
    top: '35%',
    right: -40,
  },

  /* ── Brand Mark ── */
  brandMark: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    gap: 10,
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: DEEP,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIcon: {
    color: VIOLET,
    fontSize: 18,
  },
  brandTextWrap: {
    alignItems: 'flex-start',
  },
  brandName: {
    fontFamily: 'Playfair Display',
    color: DEEP,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  brandSub: {
    color: VIOLET,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 3,
  },

  /* ── Header ── */
  headerContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  eyebrow: {
    color: VIOLET,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Playfair Display',
    color: DEEP,
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  titleUnderline: {
    width: 50,
    height: 2,
    backgroundColor: VIOLET,
    marginTop: 10,
    borderRadius: 2,
  },
  subtitle: {
    fontFamily: 'Roboto',
    color: MUTED,
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 8,
    letterSpacing: 0.3,
  },

  /* ── Card ── */
  card: {
    width: '100%',
    backgroundColor: CARD,
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: BORDER,
    shadowColor: DEEP,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 18,
  },
  inputLabel: {
    fontFamily: 'Roboto',
    fontSize: 11,
    fontWeight: '700',
    color: DEEP,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  inputText: {
    fontFamily: 'Roboto',
    fontSize: 15,
    color: DEEP,
    backgroundColor: LAVENDER,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: BORDER,
  },
  forgotWrap: {
    alignSelf: 'flex-end',
    marginTop: 8,
    marginBottom: 4,
  },
  forgotText: {
    fontFamily: 'Roboto',
    fontSize: 12,
    color: VIOLET,
    fontWeight: '600',
  },
  errorText: {
    color: '#c0392b',
    fontFamily: 'Roboto',
    fontSize: 13,
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  loginButton: {
    marginTop: 16,
    marginBottom: 24,
    width: '100%',
    backgroundColor: DEEP,
    borderRadius: 14,
    paddingVertical: 16,
    shadowColor: DEEP,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  loginButtonText: {
    color: LAVENDER,
    fontFamily: 'Playfair Display',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 3,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: BORDER,
  },
  dividerText: {
    color: VIOLET,
    marginHorizontal: 10,
    fontSize: 12,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontFamily: 'Roboto',
    color: MUTED,
    fontSize: 14,
  },
  registerLink: {
    fontFamily: 'Roboto',
    color: DEEP,
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 0.5,
    textDecorationLine: 'underline',
    textDecorationColor: VIOLET,
  },

  /* ── Footer ── */
  footerText: {
    color: MUTED,
    fontFamily: 'Roboto',
    fontSize: 9,
    letterSpacing: 3,
    marginTop: 28,
    fontWeight: '700',
  },
});

export default Login;