import { BorderRadius, Colors, Spacing, Typography } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

interface LandingPageProps {
  onGetStarted?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="calendar" size={28} color={Colors.primary} />
          <Text style={styles.appName}>EventScape</Text>
        </View>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.headline}>Ready to bring your event to life?</Text>
        <Text style={styles.subheadline}>
          Plan, organize, and execute your perfect event with ease
        </Text>

        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={onGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Image */}
      <View style={styles.heroImageContainer}>
        <View style={styles.heroImagePlaceholder}>
          <Ionicons
            name="image-outline"
            size={64}
            color={Colors.primary}
          />
          <Text style={styles.placeholderText}>Event Hall</Text>
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Ionicons
              name="sparkles"
              size={24}
              color={Colors.primary}
            />
          </View>
          <Text style={styles.statNumber}>10,000+</Text>
          <Text style={styles.statLabel}>Theme Templates</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Ionicons
              name="people"
              size={24}
              color={Colors.primary}
            />
          </View>
          <Text style={styles.statNumber}>100+</Text>
          <Text style={styles.statLabel}>Events Planned</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Ionicons
              name="star"
              size={24}
              color={Colors.primary}
            />
          </View>
          <Text style={styles.statNumber}>4.9★</Text>
          <Text style={styles.statLabel}>User Rating</Text>
        </View>
      </View>

      {/* Trending Gallery */}
      <View style={styles.gallerySection}>
        <Text style={styles.galleryTitle}>Trending Now</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.galleryScroll}
        >
          {[1, 2, 3, 4].map((item) => (
            <View key={item} style={styles.galleryCard}>
              <View style={styles.galleryImagePlaceholder}>
                <Ionicons
                  name="image"
                  size={48}
                  color={Colors.primary}
                />
              </View>
              <Text style={styles.galleryCardTitle}>Theme {item}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Footer Spacing */}
      <View style={{ height: Spacing.xl }} />
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
  heroSection: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xl,
    alignItems: "center",
  },
  headline: {
    ...Typography.h1,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  subheadline: {
    ...Typography.subtext,
    textAlign: "center",
    marginBottom: Spacing.xl,
    lineHeight: 20,
  },
  getStartedButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    minWidth: 160,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
  heroImageContainer: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xl,
  },
  heroImagePlaceholder: {
    backgroundColor: Colors.lightGrey,
    borderRadius: BorderRadius.lg,
    height: 280,
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.md,
  },
  placeholderText: {
    fontSize: 14,
    color: Colors.textLight,
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xl,
    backgroundColor: Colors.lightGrey,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
    justifyContent: "space-around",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statIconContainer: {
    marginBottom: Spacing.sm,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textGrey,
    textAlign: "center",
  },
  divider: {
    width: 1,
    height: 60,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.sm,
  },
  gallerySection: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xl,
  },
  galleryTitle: {
    ...Typography.h2,
    marginBottom: Spacing.md,
  },
  galleryScroll: {
    marginHorizontal: -Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  galleryCard: {
    marginRight: Spacing.md,
    alignItems: "center",
  },
  galleryImagePlaceholder: {
    width: 140,
    height: 200,
    backgroundColor: Colors.lightGrey,
    borderRadius: BorderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  galleryCardTitle: {
    fontSize: 12,
    color: Colors.textLight,
    fontWeight: "500",
    width: 140,
    textAlign: "center",
  },
});
