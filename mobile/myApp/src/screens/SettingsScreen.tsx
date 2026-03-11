import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants';
import Card from '../components/Card';
import Button from '../components/Button';
import { Routes } from '../navigation/routes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/routes';

interface SettingsScreenProps {
  navigation: any;
  route?: any;
}

interface NotificationSettings {
  workoutReminders: boolean;
  achievementNotifications: boolean;
  socialNotifications: boolean;
  emailUpdates: boolean;
}

interface PrivacySettings {
  publicProfile: boolean;
  shareWorkouts: boolean;
  shareProgress: boolean;
  analyticsTracking: boolean;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const [notifications, setNotifications] = useState<NotificationSettings>({
    workoutReminders: true,
    achievementNotifications: true,
    socialNotifications: false,
    emailUpdates: true,
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    publicProfile: false,
    shareWorkouts: true,
    shareProgress: true,
    analyticsTracking: true,
  });

  const updateNotificationSetting = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updatePrivacySetting = (key: keyof PrivacySettings, value: boolean) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to permanently delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Account',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account Deleted', 'Your account has been permanently deleted.');
            navigation.navigate(Routes.LANDING);
          }
        },
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert('Export Data', 'Your data export has been initiated. You will receive an email with your data within 24 hours.');
  };

  const handleClearCache = () => {
    Alert.alert('Cache Cleared', 'App cache has been successfully cleared.');
  };

  const renderSettingToggle = (
    title: string,
    subtitle: string,
    value: boolean,
    onValueChange: (value: boolean) => void
  ) => (
    <View style={styles.settingRow}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: Colors.backgroundTertiary, true: Colors.primary + '80' }}
        thumbColor={value ? Colors.primary : Colors.textMuted}
      />
    </View>
  );

  const renderSettingButton = (
    title: string,
    subtitle: string,
    onPress: () => void,
    icon?: string,
    destructive?: boolean
  ) => (
    <TouchableOpacity
      style={styles.settingRow}
      onPress={onPress}
    >
      <View style={styles.settingInfo}>
        <Text style={[
          styles.settingTitle,
          destructive && styles.settingTitleDestructive
        ]}>
          {icon && <Text style={styles.settingIcon}>{icon} </Text>}
          {title}
        </Text>
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      </View>
      <Text style={[
        styles.settingArrow,
        destructive && styles.settingArrowDestructive
      ]}>
        ›
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[Colors.background, Colors.backgroundSecondary]}
          style={styles.header}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Settings</Text>
        </LinearGradient>

        {/* Notifications */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>🔔 Notifications</Text>
          <View style={styles.settingsGroup}>
            {renderSettingToggle(
              'Workout Reminders',
              'Get reminded about your scheduled workouts',
              notifications.workoutReminders,
              (value) => updateNotificationSetting('workoutReminders', value)
            )}
            {renderSettingToggle(
              'Achievement Notifications',
              'Celebrate your fitness milestones',
              notifications.achievementNotifications,
              (value) => updateNotificationSetting('achievementNotifications', value)
            )}
            {renderSettingToggle(
              'Social Notifications',
              'Friend activities and community updates',
              notifications.socialNotifications,
              (value) => updateNotificationSetting('socialNotifications', value)
            )}
            {renderSettingToggle(
              'Email Updates',
              'Weekly progress reports and tips',
              notifications.emailUpdates,
              (value) => updateNotificationSetting('emailUpdates', value)
            )}
          </View>
        </Card>

        {/* Privacy */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>🔒 Privacy & Sharing</Text>
          <View style={styles.settingsGroup}>
            {renderSettingToggle(
              'Public Profile',
              'Allow others to find and view your profile',
              privacy.publicProfile,
              (value) => updatePrivacySetting('publicProfile', value)
            )}
            {renderSettingToggle(
              'Share Workouts',
              'Let friends see your workout activities',
              privacy.shareWorkouts,
              (value) => updatePrivacySetting('shareWorkouts', value)
            )}
            {renderSettingToggle(
              'Share Progress',
              'Show your fitness journey to friends',
              privacy.shareProgress,
              (value) => updatePrivacySetting('shareProgress', value)
            )}
            {renderSettingToggle(
              'Analytics Tracking',
              'Help improve the app with usage data',
              privacy.analyticsTracking,
              (value) => updatePrivacySetting('analyticsTracking', value)
            )}
          </View>
        </Card>

        {/* Account */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>👤 Account</Text>
          <View style={styles.settingsGroup}>
            {renderSettingButton(
              'Export My Data',
              'Download all your workout and progress data',
              handleExportData,
              '📊'
            )}
            {renderSettingButton(
              'Connected Apps',
              'Manage third-party app connections',
              () => {},
              '🔗'
            )}
            {renderSettingButton(
              'Subscription',
              'Manage your premium subscription',
              () => {},
              '⭐'
            )}
          </View>
        </Card>

        {/* App Settings */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ App Settings</Text>
          <View style={styles.settingsGroup}>
            {renderSettingButton(
              'Units & Measurements',
              'Metric or Imperial system',
              () => {},
              '📏'
            )}
            {renderSettingButton(
              'Clear Cache',
              'Free up storage space',
              handleClearCache,
              '🗑️'
            )}
            {renderSettingButton(
              'App Language',
              'Change display language',
              () => {},
              '🌐'
            )}
          </View>
        </Card>

        {/* Support */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>❓ Support</Text>
          <View style={styles.settingsGroup}>
            {renderSettingButton(
              'Help Center',
              'Find answers to common questions',
              () => {},
              '📖'
            )}
            {renderSettingButton(
              'Contact Support',
              'Get help from our team',
              () => {},
              '💬'
            )}
            {renderSettingButton(
              'Report a Bug',
              'Help us improve the app',
              () => {},
              '🐛'
            )}
            {renderSettingButton(
              'Rate the App',
              'Share your feedback on the app store',
              () => {},
              '⭐'
            )}
          </View>
        </Card>

        {/* Legal */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Legal</Text>
          <View style={styles.settingsGroup}>
            {renderSettingButton(
              'Terms of Service',
              'View our terms and conditions',
              () => {},
              '📄'
            )}
            {renderSettingButton(
              'Privacy Policy',
              'Learn how we protect your data',
              () => {},
              '🛡️'
            )}
            {renderSettingButton(
              'Licenses',
              'View open source licenses',
              () => {},
              '📜'
            )}
          </View>
        </Card>

        {/* Danger Zone */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>⚠️ Danger Zone</Text>
          <View style={styles.settingsGroup}>
            {renderSettingButton(
              'Delete Account',
              'Permanently delete your account and all data',
              handleDeleteAccount,
              '🗑️',
              true
            )}
          </View>
        </Card>

        {/* App Info */}
        <Card style={styles.section}>
          <View style={styles.appInfo}>
            <Text style={styles.appName}>GymBuddy</Text>
            <Text style={styles.appVersion}>Version 1.0.0</Text>
            <Text style={styles.buildNumber}>Build 2024.12.1</Text>
          </View>
        </Card>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: Colors.text,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: 'bold',
    color: Colors.text,
  },
  
  // Sections
  section: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  settingsGroup: {
    gap: Spacing.sm,
  },
  
  // Setting Rows
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  settingTitle: {
    fontSize: FontSizes.md,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  settingTitleDestructive: {
    color: Colors.warning,
  },
  settingSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  settingIcon: {
    fontSize: FontSizes.md,
  },
  settingArrow: {
    fontSize: FontSizes.lg,
    color: Colors.textMuted,
    fontWeight: '300',
  },
  settingArrowDestructive: {
    color: Colors.warning,
  },
  
  // App Info
  appInfo: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  appName: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  appVersion: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  buildNumber: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  
  // Bottom Spacer
  bottomSpacer: {
    height: Spacing.xl,
  },
});

export default SettingsScreen;
