import { BorderRadius, Colors, Spacing, Typography } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface VerificationSuccessProps {
  onContinue?: () => void;
  message?: string;
}

export const VerificationSuccessPage: React.FC<VerificationSuccessProps> = ({
  onContinue,
  message = "Your account has been successfully verified!",
}) => {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Checkmark Icon */}
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Ionicons
            name="checkmark"
            size={72}
            color={Colors.success}
          />
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>Account Verified</Text>

      {/* Message */}
      <Text style={styles.description}>{message}</Text>

      {/* Success Badge */}
      <View style={styles.badgeContainer}>
        <Ionicons
          name="shield-checkmark"
          size={20}
          color={Colors.success}
        />
        <Text style={styles.badgeText}>Account is secured</Text>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={onContinue}
        activeOpacity={0.8}
      >
        <Text style={styles.continueButtonText}>Continue to App</Text>
      </TouchableOpacity>

      {/* Additional Info */}
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={Colors.primary}
          />
          <Text style={styles.infoText}>Email verified</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={Colors.primary}
          />
          <Text style={styles.infoText}>Profile created</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={Colors.primary}
          />
          <Text style={styles.infoText}>Ready to plan events</Text>
        </View>
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
    width: 120,
    height: 120,
    borderRadius: BorderRadius.full,
    backgroundColor: `${Colors.success}20`,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    ...Typography.h1,
    textAlign: "center",
    marginBottom: Spacing.md,
    color: Colors.success,
  },
  description: {
    ...Typography.subtext,
    textAlign: "center",
    marginBottom: Spacing.xl,
    lineHeight: 20,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${Colors.success}15`,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.success,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  continueButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
  infoContainer: {
    gap: Spacing.md,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  infoText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: "500",
  },
});
