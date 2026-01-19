import { BorderRadius, Colors, Spacing } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface AuthPageProps {
  onSignUp?: (data: { name?: string; email: string; password: string }) => void;
  onSignIn?: (data: { email: string; password: string }) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onSignUp, onSignIn }) => {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignUp = () => {
    if (onSignUp && formData.email && formData.password) {
      onSignUp({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
    }
  };

  const handleSignIn = () => {
    if (onSignIn && formData.email && formData.password) {
      onSignIn({
        email: formData.email,
        password: formData.password,
      });
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="calendar" size={28} color={Colors.primary} />
          <Text style={styles.appName}>EventScape</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "signin" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("signin")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "signin" && styles.activeTabText,
            ]}
          >
            Sign In
          </Text>
          {activeTab === "signin" && <View style={styles.tabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "signup" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("signup")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "signup" && styles.activeTabText,
            ]}
          >
            Sign Up
          </Text>
          {activeTab === "signup" && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
      </View>

      {/* Form Container */}
      <View style={styles.formContainer}>
        {activeTab === "signup" && (
          <>
            {/* Name Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="person-outline"
                  size={18}
                  color={Colors.textGrey}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  placeholderTextColor={Colors.textGrey}
                  value={formData.name}
                  onChangeText={(text) =>
                    setFormData({ ...formData, name: text })
                  }
                />
              </View>
            </View>
          </>
        )}

        {/* Email Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="mail-outline"
              size={18}
              color={Colors.textGrey}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={Colors.textGrey}
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) =>
                setFormData({ ...formData, email: text })
              }
            />
          </View>
        </View>

        {/* Password Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="lock-closed-outline"
              size={18}
              color={Colors.textGrey}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={Colors.textGrey}
              secureTextEntry={!showPassword}
              value={formData.password}
              onChangeText={(text) =>
                setFormData({ ...formData, password: text })
              }
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={18}
                color={Colors.textGrey}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={
            activeTab === "signup" ? handleSignUp : handleSignIn
          }
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>
            {activeTab === "signup" ? "Create Account" : "Sign In"}
          </Text>
        </TouchableOpacity>

        {/* Sign In / Sign Up Link */}
        <View style={styles.toggleAuthContainer}>
          <Text style={styles.toggleAuthText}>
            {activeTab === "signup"
              ? "Already have an account? "
              : "Don't have an account? "}
          </Text>
          <TouchableOpacity
            onPress={() =>
              setActiveTab(activeTab === "signup" ? "signin" : "signup")
            }
          >
            <Text style={styles.toggleAuthLink}>
              {activeTab === "signup" ? "Sign In" : "Sign Up"}
            </Text>
          </TouchableOpacity>
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
  header: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingHorizontal: Spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: Colors.textGrey,
    fontWeight: "500",
  },
  activeTabText: {
    color: Colors.primary,
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    height: 2,
    backgroundColor: Colors.primary,
    width: "100%",
  },
  formContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xl,
  },
  inputGroup: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightGrey,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    height: 48,
  },
  inputIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    color: Colors.text,
    fontSize: 14,
  },
  eyeIcon: {
    padding: Spacing.sm,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    alignItems: "center",
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
  submitButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
  toggleAuthContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleAuthText: {
    fontSize: 14,
    color: Colors.textLight,
  },
  toggleAuthLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "bold",
  },
});
