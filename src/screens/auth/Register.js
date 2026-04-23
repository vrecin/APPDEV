import { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { ROUTES } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../../app/reducers/auth';
import CheckBox from '@react-native-community/checkbox';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [validationError, setValidationError] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isLoading, isError, errorMessage } = useSelector(state => state.auth);

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
        <Text style={styles.eyebrow}>✦ GET STARTED ✦</Text>
        <Text style={styles.title}>Register</Text>
        <View style={styles.titleUnderline} />
        <Text style={styles.subtitle}>Your scent journey begins here</Text>
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
          placeholder={'Create a password'}
          value={password}
          onChangeText={setPassword}
          containerStyle={[styles.inputContainer, { marginBottom: 0 }]}
          labelStyle={styles.inputLabel}
          textStyle={styles.inputText}
        />

        {/* Terms — mirrors the "Forgot password?" row position in Login */}
        <View style={styles.checkboxWrap}>
          <CheckBox
            value={agreeTerms}
            onValueChange={setAgreeTerms}
            tintColors={{ true: '#2E073F', false: '#E0CCE9' }}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>
            I agree to the{' '}
            <Text style={styles.checkboxLink}>Terms & Conditions</Text>
          </Text>
        </View>

        {(isError && errorMessage) || validationError ? (
          <Text style={styles.errorText}>{validationError || errorMessage}</Text>
        ) : null}

        <CustomButton
          label={'REGISTER'}
          containerStyle={styles.registerButton}
          textStyle={styles.registerButtonText}
          loading={isLoading === true}
          onPress={() => {
            setValidationError('');
            if (!email.trim() || !password) {
              setValidationError('Email and password are required');
              return;
            }
            dispatch(userRegister({ email: email.trim(), password, agreeTerms }));
          }}
        />

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>✦</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity
            style={{ marginLeft: 6 }}
            onPress={() => navigation.navigate(ROUTES.LOGIN)}
          >
            <Text style={styles.loginLink}>Sign In</Text>
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

  /* ── Checkbox (mirrors forgotWrap in Login) ── */
  checkboxWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 8,
    marginBottom: 4,
    gap: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
  },
  checkboxLabel: {
    fontFamily: 'Roboto',
    fontSize: 12,
    color: MUTED,
    fontWeight: '500',
  },
  checkboxLink: {
    color: VIOLET,
    fontWeight: '600',
  },

  /* ── Error ── */
  errorText: {
    color: '#c0392b',
    fontFamily: 'Roboto',
    fontSize: 13,
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },

  /* ── Button ── */
  registerButton: {
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
  registerButtonText: {
    color: LAVENDER,
    fontFamily: 'Playfair Display',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 3,
  },

  /* ── Divider ── */
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

  /* ── Login Row ── */
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontFamily: 'Roboto',
    color: MUTED,
    fontSize: 14,
  },
  loginLink: {
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

export default Register;



