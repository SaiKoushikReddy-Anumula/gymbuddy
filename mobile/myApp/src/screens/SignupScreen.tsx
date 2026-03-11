import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants';
import Button from '../components/Button';
import Card from '../components/Card';
import { Routes } from '../navigation/routes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/routes';

type Props = NativeStackScreenProps<RootStackParamList, typeof Routes.SIGNUP>;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    weight: '',
    height: '',
    gender: '',
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateBMI = () => {
    const weightNum = parseFloat(formData.weight);
    const heightNum = parseFloat(formData.height);
    
    if (weightNum && heightNum) {
      const heightInMeters = heightNum / 100;
      return (weightNum / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return '0.0';
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSignup();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    // Simulate signup process
    setTimeout(() => {
      setLoading(false);
      navigation.navigate(Routes.MAIN_TABS);
    }, 2000);
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Personal Information</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(value) => updateFormData('name', value)}
          placeholder="Enter your full name"
          placeholderTextColor={Colors.textMuted}
          autoCapitalize="words"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(value) => updateFormData('email', value)}
          placeholder="Enter your email"
          placeholderTextColor={Colors.textMuted}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={formData.password}
          onChangeText={(value) => updateFormData('password', value)}
          placeholder="Create a password"
          placeholderTextColor={Colors.textMuted}
          secureTextEntry
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          value={formData.confirmPassword}
          onChangeText={(value) => updateFormData('confirmPassword', value)}
          placeholder="Confirm your password"
          placeholderTextColor={Colors.textMuted}
          secureTextEntry
          autoCapitalize="none"
        />
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Physical Stats</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput
          style={styles.input}
          value={formData.weight}
          onChangeText={(value) => updateFormData('weight', value)}
          placeholder="Enter your weight"
          placeholderTextColor={Colors.textMuted}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Height (cm)</Text>
        <TextInput
          style={styles.input}
          value={formData.height}
          onChangeText={(value) => updateFormData('height', value)}
          placeholder="Enter your height"
          placeholderTextColor={Colors.textMuted}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderContainer}>
          {['Male', 'Female', 'Other'].map((gender) => (
            <TouchableOpacity
              key={gender}
              style={[
                styles.genderOption,
                formData.gender === gender && styles.genderOptionSelected
              ]}
              onPress={() => updateFormData('gender', gender)}
            >
              <Text style={[
                styles.genderText,
                formData.gender === gender && styles.genderTextSelected
              ]}>
                {gender}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {formData.weight && formData.height && (
        <Card style={styles.bmiCard}>
          <Text style={styles.bmiLabel}>Your BMI</Text>
          <Text style={styles.bmiValue}>{calculateBMI()}</Text>
          <Text style={styles.bmiDescription}>
            {parseFloat(calculateBMI()) < 18.5 ? 'Underweight' :
             parseFloat(calculateBMI()) < 25 ? 'Normal weight' :
             parseFloat(calculateBMI()) < 30 ? 'Overweight' : 'Obese'}
          </Text>
        </Card>
      )}
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Terms & Conditions</Text>
      
      <TouchableOpacity
        style={styles.termsContainer}
        onPress={() => setAcceptTerms(!acceptTerms)}
      >
        <View style={[styles.checkbox, acceptTerms && styles.checkboxActive]}>
          {acceptTerms && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.termsText}>
          I accept the Terms of Service and Privacy Policy
        </Text>
      </TouchableOpacity>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Account Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Name:</Text>
          <Text style={styles.summaryValue}>{formData.name}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Email:</Text>
          <Text style={styles.summaryValue}>{formData.email}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>BMI:</Text>
          <Text style={styles.summaryValue}>{calculateBMI()}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient
            colors={[Colors.background, Colors.backgroundSecondary]}
            style={styles.background}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.logo}>💪</Text>
              <Text style={styles.title}>Join GymBuddy</Text>
              <Text style={styles.subtitle}>
                Step {currentStep} of 3 - Create your account
              </Text>
              
              {/* Progress indicator */}
              <View style={styles.progressContainer}>
                {[1, 2, 3].map((step) => (
                  <View
                    key={step}
                    style={[
                      styles.progressDot,
                      step <= currentStep && styles.progressDotActive
                    ]}
                  />
                ))}
              </View>
            </View>

            {/* Form */}
            <Card style={styles.formCard}>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

              {/* Navigation buttons */}
              <View style={styles.buttonContainer}>
                {currentStep > 1 && (
                  <Button
                    title="Back"
                    onPress={handleBack}
                    variant="outline"
                    style={styles.backButton}
                  />
                )}
                
                <Button
                  title={currentStep === 3 ? 'Create Account' : 'Next'}
                  onPress={handleNext}
                  variant="primary"
                  loading={loading}
                  disabled={currentStep === 3 && !acceptTerms}
                  style={styles.nextButton}
                />
              </View>
            </Card>

            {/* Login link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate(Routes.LOGIN)}>
                <Text style={styles.loginLink}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  background: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  logo: {
    fontSize: 50,
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  progressDotActive: {
    backgroundColor: Colors.primary,
  },
  formCard: {
    marginBottom: Spacing.lg,
  },
  stepContainer: {
    gap: Spacing.lg,
  },
  stepTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  inputContainer: {
    gap: Spacing.sm,
  },
  label: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  input: {
    backgroundColor: Colors.backgroundTertiary,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: FontSizes.md,
    color: Colors.text,
    minHeight: 48,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  genderOption: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  genderOptionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '20',
  },
  genderText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  genderTextSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  bmiCard: {
    alignItems: 'center',
    backgroundColor: Colors.backgroundTertiary,
  },
  bmiLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  bmiValue: {
    fontSize: FontSizes.xxxl,
    fontWeight: 'bold',
    color: Colors.primary,
    marginVertical: Spacing.sm,
  },
  bmiDescription: {
    fontSize: FontSizes.md,
    color: Colors.text,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkmark: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
  summaryCard: {
    backgroundColor: Colors.backgroundTertiary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  summaryTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontSize: FontSizes.sm,
    color: Colors.text,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Spacing.xl,
  },
  loginText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  loginLink: {
    fontSize: FontSizes.md,
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default SignupScreen;
