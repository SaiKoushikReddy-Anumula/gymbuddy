import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants';
import Button from '../components/Button';
import { Routes } from '../navigation/routes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/routes';

type Props = NativeStackScreenProps<RootStackParamList, typeof Routes.LANDING>;

const { width, height } = Dimensions.get('window');

const LandingScreen: React.FC<Props> = ({ navigation }) => {
  const features = [
    {
      icon: '🏋️‍♂️',
      title: 'AI WORKOUT COACH',
      description: 'Personalized training with real-time form analysis',
      gradient: [Colors.primary, Colors.secondary],
    },
    {
      icon: '📊',
      title: 'PROGRESS TRACKING',
      description: 'Advanced analytics and performance metrics',
      gradient: [Colors.secondary, Colors.primary],
    },
    {
      icon: '🍎',
      title: 'NUTRITION GUIDE',
      description: 'Smart meal planning and macro tracking',
      gradient: [Colors.primary + '80', Colors.secondary + '80'],
    },
    {
      icon: '🤝',
      title: 'SOCIAL FITNESS',
      description: 'Connect with friends and join challenges',
      gradient: [Colors.secondary + '80', Colors.primary + '80'],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <LinearGradient
          colors={[Colors.background, Colors.background, Colors.background]}
          style={styles.heroSection}
        >
          {/* Background Pattern */}
          <View style={styles.backgroundPattern}>
            <Text style={styles.patternText}>💪</Text>
            <Text style={styles.patternText}>🏋️</Text>
            <Text style={styles.patternText}>⚡</Text>
            <Text style={styles.patternText}>🔥</Text>
            <Text style={styles.patternText}>💪</Text>
            <Text style={styles.patternText}>🏋️</Text>
          </View>
          
          <View style={styles.heroContent}>
            {/* App Logo */}
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={[Colors.primary, Colors.secondary]}
                style={styles.logoGradient}
              >
                <Text style={styles.logoIcon}>💪</Text>
              </LinearGradient>
              <Text style={styles.logoText}>GYMBUDDY</Text>
            </View>
            
            {/* Hero Title */}
            <View style={styles.heroTextContainer}>
              <Text style={styles.heroTitle}>
                UNLEASH YOUR{'\n'}
                <Text style={styles.heroTitleAccent}>INNER BEAST</Text>
              </Text>
              <Text style={styles.heroSubtitle}>
                Transform your body with AI-powered workouts,{'\n'}
                real-time coaching, and social motivation.
              </Text>
            </View>

            {/* Stats Preview */}
            <View style={styles.statsPreview}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>50K+</Text>
                <Text style={styles.statLabel}>USERS</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>1M+</Text>
                <Text style={styles.statLabel}>WORKOUTS</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>24/7</Text>
                <Text style={styles.statLabel}>AI COACH</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Features Grid */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>
            <Text style={styles.sectionTitleAccent}>PREMIUM</Text> FEATURES
          </Text>
          
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <TouchableOpacity key={index} style={styles.featureCard}>
                <LinearGradient
                  colors={[feature.gradient[0], feature.gradient[1]]}
                  style={styles.featureGradient}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                >
                  <View style={styles.featureContent}>
                    <Text style={styles.featureIcon}>{feature.icon}</Text>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureDescription}>{feature.description}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Social Proof */}
        <View style={styles.socialProofSection}>
          <Text style={styles.socialProofTitle}>JOIN THE ELITE</Text>
          <View style={styles.testimonialCard}>
            <LinearGradient
              colors={[Colors.backgroundTertiary, Colors.cardBackground]}
              style={styles.testimonialGradient}
            >
              <Text style={styles.testimonialText}>
                "GymBuddy transformed my fitness journey. The AI coach is like having 
                a personal trainer 24/7. I've never been stronger!"
              </Text>
              <View style={styles.testimonialAuthor}>
                <Text style={styles.authorName}>ALEX STEEL</Text>
                <Text style={styles.authorTitle}>FITNESS INFLUENCER</Text>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <LinearGradient
            colors={[Colors.background, Colors.background]}
            style={styles.ctaContainer}
          >
            <Text style={styles.ctaTitle}>
              READY TO <Text style={styles.ctaTitleAccent}>DOMINATE</Text>?
            </Text>
            <Text style={styles.ctaSubtitle}>
              Join thousands of athletes already crushing their goals
            </Text>
            
            <View style={styles.ctaButtons}>
              <Button
                title="START CRUSHING IT"
                onPress={() => navigation.navigate(Routes.SIGNUP)}
                style={styles.primaryButton}
                variant="primary"
              />
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.navigate(Routes.LOGIN)}
              >
                <Text style={styles.secondaryButtonText}>ALREADY A BEAST? LOGIN</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  
  // Hero Section
  heroSection: {
    minHeight: height * 0.7,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xxl,
    position: 'relative',
    justifyContent: 'center',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    opacity: 0.05,
  },
  patternText: {
    fontSize: 60,
    color: Colors.primary,
    margin: Spacing.lg,
  },
  heroContent: {
    alignItems: 'center',
    zIndex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    elevation: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  logoIcon: {
    fontSize: 40,
    color: Colors.text,
  },
  logoText: {
    fontSize: FontSizes.xxl,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: 4,
  },
  
  // Hero Text
  heroTextContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 42,
    marginBottom: Spacing.lg,
    letterSpacing: 2,
  },
  heroTitleAccent: {
    color: Colors.primary,
    textShadowColor: Colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  heroSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: width * 0.8,
  },
  
  // Stats Preview
  statsPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundTertiary + '80',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: FontSizes.xl,
    fontWeight: '900',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    fontWeight: '600',
    letterSpacing: 1,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.md,
  },
  
  // Features Section
  featuresSection: {
    padding: Spacing.xl,
    backgroundColor: Colors.background,
  },
  sectionTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: '900',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    letterSpacing: 2,
  },
  sectionTitleAccent: {
    color: Colors.primary,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  featureCard: {
    width: (width - Spacing.xl * 2 - Spacing.md) / 2,
    height: 180,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    elevation: 5,
  },
  featureGradient: {
    flex: 1,
    padding: Spacing.lg,
  },
  featureContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  featureTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.xs,
    letterSpacing: 1,
  },
  featureDescription: {
    fontSize: FontSizes.xs,
    color: Colors.text + 'E6',
    textAlign: 'center',
    lineHeight: 16,
  },
  
  // Social Proof
  socialProofSection: {
    padding: Spacing.xl,
    backgroundColor: Colors.backgroundSecondary,
  },
  socialProofTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '900',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    letterSpacing: 2,
  },
  testimonialCard: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  testimonialGradient: {
    padding: Spacing.xl,
  },
  testimonialText: {
    fontSize: FontSizes.md,
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.lg,
    fontStyle: 'italic',
  },
  testimonialAuthor: {
    alignItems: 'center',
  },
  authorName: {
    fontSize: FontSizes.md,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 1,
  },
  authorTitle: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  
  // CTA Section
  ctaSection: {
    minHeight: height * 0.4,
  },
  ctaContainer: {
    flex: 1,
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: '900',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.md,
    letterSpacing: 2,
  },
  ctaTitleAccent: {
    color: Colors.primary,
    textShadowColor: Colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  ctaSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
  },
  ctaButtons: {
    width: '100%',
    gap: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  secondaryButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 1,
  },
  freeText: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 1,
  },
});

export default LandingScreen;
