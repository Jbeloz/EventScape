import { BorderRadius, Colors, Spacing, Typography } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface EmailVerificationProps {
  email?: string;
  onVerify?: (code: string) => void;
  onResendCode?: () => void;
}

export const EmailVerificationPage: React.FC<EmailVerificationProps> = ({
  email = "user@example.com",
  onVerify,
  onResendCode,
}) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<TextInput[]>([]);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-move to next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join("");
    if (fullCode.length === 6 && onVerify) {
      onVerify(fullCode);
    }
  };

  const isFilled = code.every((digit) => digit !== "");

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Icon */}
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Ionicons
            name="mail-open"
            size={56}
            color={Colors.primary}
          />
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>Verify Your Email</Text>

      {/* Description */}
      <Text style={styles.description}>
        We sent a 6-digit code to {"\n"}
        <Text style={styles.email}>{email}</Text>
      </Text>

      {/* Code Input Fields */}
      <View style={styles.codeInputContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              if (ref) inputRefs.current[index] = ref;
            }}
            style={[
              styles.codeInput,
              digit !== "" && styles.codeInputFilled,
            ]}
            maxLength={1}
            keyboardType="number-pad"
            value={digit}
            onChangeText={(text) => handleCodeChange(text, index)}
            placeholder="-"
            placeholderTextColor={Colors.textGrey}
            textAlign="center"
          />
        ))}
      </View>

      {/* Verify Button */}
      <TouchableOpacity
        style={[styles.verifyButton, !isFilled && styles.verifyButtonDisabled]}
        onPress={handleVerify}
        disabled={!isFilled}
        activeOpacity={0.8}
      >
        <Text style={styles.verifyButtonText}>Verify Email</Text>
      </TouchableOpacity>

      {/* Resend Code */}
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive the code? </Text>
        <TouchableOpacity onPress={onResendCode}>
          <Text style={styles.resendLink}>Resend</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xl,
    justifyContent: "center",
    minHeight: "100%",
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.full,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    ...Typography.h1,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  description: {
    ...Typography.subtext,
    textAlign: "center",
    marginBottom: Spacing.xl,
    lineHeight: 20,
  },
  email: {
    fontWeight: "bold",
    color: Colors.primary,
  },
  codeInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  codeInput: {
    flex: 1,
    height: 56,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    backgroundColor: Colors.lightGrey,
  },
  codeInputFilled: {
    borderColor: Colors.primary,
    backgroundColor: Colors.background,
  },
  verifyButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  verifyButtonDisabled: {
    opacity: 0.5,
  },
  verifyButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  resendText: {
    fontSize: 14,
    color: Colors.textLight,
  },
  resendLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "bold",
  },
});
