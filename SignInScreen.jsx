import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Dimensions,
  Animated,
  Image,
} from "react-native";

const { width, height } = Dimensions.get("window");

const C = {
  bg: "#F5F7FA",
  surface: "#FFFFFF",
  primary: "#1ABCAA",       
  primaryDark: "#14A090",
  primaryLight: "#E6F9F7",
  text: "#0D1B2A",
  textMid: "#4A5568",
  textSoft: "#A0AEC0",
  border: "#E2E8F0",
  borderFocus: "#1ABCAA",
  error: "#E53E3E",
  googleRed: "#EA4335",
  appleDark: "#000000",
  facebookBlue: "#1877F2",
  divider: "#CBD5E0",
  inputBg: "#F8FAFC",
  shadow: "rgba(26, 188, 170, 0.15)",
};

const T = {
  display: Platform.select({ ios: "Georgia", android: "serif" }),
  body: Platform.select({ ios: "System", android: "sans-serif" }),
  mono: Platform.select({ ios: "Courier New", android: "monospace" }),
};

function MedicalCrossIcon({ size = 28, color = "#FFFFFF" }) {
  const arm = size * 0.28;
  const mid = (size - arm) / 2;
  return (
    <View style={{ width: size, height: size, position: "relative" }}>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: mid,
          width: arm,
          height: size,
          backgroundColor: color,
          borderRadius: arm * 0.3,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: mid,
          left: 0,
          width: size,
          height: arm,
          backgroundColor: color,
          borderRadius: arm * 0.3,
        }}
      />
    </View>
  );
}

function EyeIcon({ visible = true, color = "#A0AEC0" }) {
  return (
    <View style={{ width: 22, height: 22, alignItems: "center", justifyContent: "center" }}>
      <View
        style={{
          width: 18,
          height: 11,
          borderRadius: 9,
          borderWidth: 1.8,
          borderColor: color,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Pupil */}
        {visible && (
          <View
            style={{
              width: 5,
              height: 5,
              borderRadius: 2.5,
              backgroundColor: color,
            }}
          />
        )}
      </View>
      {!visible && (
        <View
          style={{
            position: "absolute",
            width: 22,
            height: 1.8,
            backgroundColor: color,
            transform: [{ rotate: "-35deg" }],
          }}
        />
      )}
    </View>
  );
}

function CheckmarkIcon({ size = 14, color = "#FFFFFF" }) {
  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <View
        style={{
          width: size * 0.55,
          height: size * 0.3,
          borderBottomWidth: 2,
          borderLeftWidth: 2,
          borderColor: color,
          transform: [{ rotate: "-45deg" }, { translateY: -2 }],
        }}
      />
    </View>
  );
}

function GoogleG({ size = 18 }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 2,
        borderColor: "#EA4335",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Text style={{ color: "#EA4335", fontSize: size * 0.55, fontWeight: "700", lineHeight: size * 0.7 }}>
        G
      </Text>
    </View>
  );
}

function AppleMark({ size = 18 }) {
  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "#000", fontSize: size * 0.9, lineHeight: size * 1.1, fontWeight: "600" }}>
        
      </Text>
    </View>
  );
}

function FacebookF({ size = 18 }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: 4,
        backgroundColor: "#1877F2",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#fff", fontSize: size * 0.65, fontWeight: "900", lineHeight: size * 0.85 }}>
        f
      </Text>
    </View>
  );
}

function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  showToggle = false,
  onToggleSecure,
  isSecureVisible,
  icon,
}) {
  const [focused, setFocused] = useState(false);
  const borderAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setFocused(true);
    Animated.timing(borderAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setFocused(false);
    Animated.timing(borderAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [C.border, C.borderFocus],
  });

  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Animated.View style={[styles.inputContainer, { borderColor }]}>
        {icon && <View style={styles.inputIcon}>{icon}</View>}
        <TextInput
          style={[styles.input, icon && { paddingLeft: 0 }]}
          placeholder={placeholder}
          placeholderTextColor={C.textSoft}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isSecureVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={handleFocus}
          onBlur={handleBlur}
          selectionColor={C.primary}
        />
        {showToggle && (
          <TouchableOpacity
            onPress={onToggleSecure}
            style={styles.eyeToggle}
            activeOpacity={0.6}
          >
            <EyeIcon visible={isSecureVisible} color={focused ? C.primary : C.textSoft} />
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
}

function SocialButton({ icon, label, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () =>
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, speed: 30 }).start();
  const handlePressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20 }).start();

  return (
    <Animated.View style={{ transform: [{ scale }], flex: 1 }}>
      <TouchableOpacity
        style={styles.socialBtn}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        {icon}
        <Text style={styles.socialBtnText}>{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const btnScale = useRef(new Animated.Value(1)).current;

  const handleSignIn = () => {
    setLoading(true);
    Animated.sequence([
      Animated.timing(btnScale, { toValue: 0.97, duration: 100, useNativeDriver: true }),
      Animated.timing(btnScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(() => {
      setTimeout(() => setLoading(false), 1500);
    });
  };

  const EmailDot = (
    <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: C.primary, marginRight: 10 }} />
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />

      <View style={styles.blobTopRight} />
      <View style={styles.blobBottomLeft} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoSection}>
            <View style={styles.logoRing}>
              <View style={styles.logoInner}>
                <MedicalCrossIcon size={30} color="#FFFFFF" />
              </View>
            </View>
            <Text style={styles.appName}>Pepsu</Text>
            <View style={styles.aiChip}>
              <View style={styles.aiDot} />
              <Text style={styles.aiChipText}>AI Telehealth</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.heading}>Welcome back</Text>
              <Text style={styles.subheading}>
                Sign in to your account to continue your health journey
              </Text>
            </View>

            <View style={styles.form}>
              <InputField
                label="Email Address"
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                icon={EmailDot}
              />

              <InputField
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                showToggle
                isSecureVisible={showPassword}
                onToggleSecure={() => setShowPassword((v) => !v)}
              />

              <View style={styles.rememberRow}>
                <TouchableOpacity
                  style={styles.rememberLeft}
                  onPress={() => setRememberMe((v) => !v)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                    {rememberMe && <CheckmarkIcon size={10} />}
                  </View>
                  <Text style={styles.rememberText}>Remember me</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.forgotText}>Forgot password?</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Animated.View style={{ transform: [{ scale: btnScale }] }}>
              <TouchableOpacity
                style={[styles.signInBtn, loading && styles.signInBtnLoading]}
                onPress={handleSignIn}
                activeOpacity={0.88}
              >
                {loading ? (
                  <View style={styles.loadingDots}>
                    {[0, 1, 2].map((i) => (
                      <View key={i} style={[styles.loadingDot, { opacity: 0.4 + i * 0.3 }]} />
                    ))}
                  </View>
                ) : (
                  <Text style={styles.signInBtnText}>Sign In</Text>
                )}
              </TouchableOpacity>
            </Animated.View>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialRow}>
              <SocialButton
                icon={<GoogleG size={18} />}
                label="Google"
                onPress={() => {}}
              />
              <View style={{ width: 10 }} />
              <SocialButton
                icon={<AppleMark size={18} />}
                label="Apple"
                onPress={() => {}}
              />
              <View style={{ width: 10 }} />
              <SocialButton
                icon={<FacebookF size={18} />}
                label="Facebook"
                onPress={() => {}}
              />
            </View>

            <View style={styles.signUpRow}>
              <Text style={styles.signUpPrompt}>Don't have an account? </Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.signUpLink}>Create account</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.footer}>
            By signing in, you agree to our{" "}
            <Text style={styles.footerLink}>Terms of Service</Text>
            {" "}and{" "}
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },

  /* Decorative blobs */
  blobTopRight: {
    position: "absolute",
    top: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: C.primaryLight,
    opacity: 0.7,
  },
  blobBottomLeft: {
    position: "absolute",
    bottom: 60,
    left: -80,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: C.primaryLight,
    opacity: 0.5,
  },

  scroll: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingBottom: 40,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },

  /* Logo */
  logoSection: {
    alignItems: "center",
    marginBottom: 28,
  },
  logoRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2,
    borderColor: C.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.surface,
    shadowColor: C.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 8,
    marginBottom: 10,
  },
  logoInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: C.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  appName: {
    fontSize: 28,
    fontFamily: T.display,
    fontWeight: "700",
    color: C.text,
    letterSpacing: 1.5,
    textTransform: "lowercase",
  },
  aiChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.primaryLight,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 6,
  },
  aiDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: C.primary,
    marginRight: 6,
  },
  aiChipText: {
    fontSize: 11,
    color: C.primary,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  /* Card */
  card: {
    backgroundColor: C.surface,
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 5,
  },
  cardHeader: {
    marginBottom: 24,
  },
  heading: {
    fontSize: 26,
    fontFamily: T.display,
    fontWeight: "700",
    color: C.text,
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  subheading: {
    fontSize: 14,
    color: C.textMid,
    lineHeight: 20,
    letterSpacing: 0.1,
  },

  /* Form */
  form: {
    marginBottom: 4,
  },
  fieldWrapper: {
    marginBottom: 18,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: C.textMid,
    marginBottom: 7,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.inputBg,
    borderWidth: 1.5,
    borderColor: C.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: C.text,
    height: "100%",
    letterSpacing: 0.2,
  },
  eyeToggle: {
    padding: 6,
    marginLeft: 4,
  },

  /* Remember / Forgot */
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
    marginBottom: 22,
  },
  rememberLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: C.divider,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.surface,
  },
  checkboxChecked: {
    backgroundColor: C.primary,
    borderColor: C.primary,
  },
  rememberText: {
    fontSize: 13,
    color: C.textMid,
  },
  forgotText: {
    fontSize: 13,
    color: C.primary,
    fontWeight: "600",
  },

  /* Sign In button */
  signInBtn: {
    backgroundColor: C.primary,
    borderRadius: 16,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 6,
  },
  signInBtnLoading: {
    backgroundColor: C.primaryDark,
  },
  signInBtnText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  loadingDots: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },

  /* Divider */
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: C.border,
  },
  dividerText: {
    fontSize: 12,
    color: C.textSoft,
    marginHorizontal: 12,
    letterSpacing: 0.3,
    fontWeight: "500",
  },

  /* Social buttons */
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.surface,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: C.border,
    height: 48,
    gap: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  socialBtnText: {
    fontSize: 13,
    color: C.text,
    fontWeight: "600",
  },

  /* Sign up */
  signUpRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 22,
  },
  signUpPrompt: {
    fontSize: 14,
    color: C.textMid,
  },
  signUpLink: {
    fontSize: 14,
    color: C.primary,
    fontWeight: "700",
  },

  /* Footer */
  footer: {
    textAlign: "center",
    fontSize: 11,
    color: C.textSoft,
    lineHeight: 18,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  footerLink: {
    color: C.primary,
    fontWeight: "600",
  },
});
