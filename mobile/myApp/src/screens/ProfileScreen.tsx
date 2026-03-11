import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants';
import Card from '../components/Card';
import Button from '../components/Button';
import { Routes } from '../navigation/routes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/routes';

type Props = NativeStackScreenProps<RootStackParamList, typeof Routes.PROFILE>;

interface UserStats {
  totalWorkouts: number;
  currentStreak: number;
  longestStreak: number;
  caloriesBurned: number;
  personalRecords: number;
  totalMinutes: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingField, setEditingField] = useState<string>('');
  const [tempValue, setTempValue] = useState('');
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);

  // Mock user data
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    joinDate: 'January 2024',
    height: '6\'0"',
    weight: '175 lbs',
    age: '25',
    fitnessLevel: 'Intermediate',
    goals: ['Build Muscle', 'Lose Fat', 'Improve Strength'],
    profilePicture: '👤',
  });

  const userStats: UserStats = {
    totalWorkouts: 143,
    currentStreak: 12,
    longestStreak: 28,
    caloriesBurned: 45230,
    personalRecords: 8,
    totalMinutes: 8640,
  };

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Workout',
      description: 'Complete your first workout session',
      icon: '🎯',
      earned: true,
      earnedDate: 'Jan 15, 2024',
    },
    {
      id: '2',
      title: 'Week Warrior',
      description: 'Complete 7 consecutive days of workouts',
      icon: '🔥',
      earned: true,
      earnedDate: 'Feb 3, 2024',
    },
    {
      id: '3',
      title: 'Century Club',
      description: 'Complete 100 workout sessions',
      icon: '💯',
      earned: true,
      earnedDate: 'May 20, 2024',
    },
    {
      id: '4',
      title: 'Calorie Crusher',
      description: 'Burn 50,000 total calories',
      icon: '🔥',
      earned: false,
    },
    {
      id: '5',
      title: 'Perfect Month',
      description: 'Complete every day of the month',
      icon: '🗓️',
      earned: false,
    },
    {
      id: '6',
      title: 'Strength Master',
      description: 'Set 10 new personal records',
      icon: '🏆',
      earned: false,
    },
  ];

  const handleEditField = (field: string, currentValue: string) => {
    setEditingField(field);
    setTempValue(currentValue);
    setShowEditModal(true);
  };

  const handleSaveField = () => {
    if (editingField && tempValue.trim()) {
      setUserData(prev => ({
        ...prev,
        [editingField]: tempValue.trim()
      }));
    }
    setShowEditModal(false);
    setEditingField('');
    setTempValue('');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => navigation.navigate(Routes.LANDING) },
      ]
    );
  };

  const renderStatCard = (title: string, value: string | number, subtitle?: string) => (
    <Card style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </Card>
  );

  const renderProfileField = (label: string, value: string, field: string) => (
    <TouchableOpacity
      style={styles.profileField}
      onPress={() => handleEditField(field, value)}
    >
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.fieldContent}>
        <Text style={styles.fieldValue}>{value}</Text>
        <Text style={styles.editIcon}>✏️</Text>
      </View>
    </TouchableOpacity>
  );

  const renderAchievement = (achievement: Achievement) => (
    <View key={achievement.id} style={[
      styles.achievementCard,
      !achievement.earned && styles.achievementCardLocked
    ]}>
      <View style={styles.achievementIcon}>
        <Text style={[
          styles.achievementEmoji,
          !achievement.earned && styles.achievementEmojiLocked
        ]}>
          {achievement.earned ? achievement.icon : '🔒'}
        </Text>
      </View>
      
      <View style={styles.achievementInfo}>
        <Text style={[
          styles.achievementTitle,
          !achievement.earned && styles.achievementTitleLocked
        ]}>
          {achievement.title}
        </Text>
        <Text style={[
          styles.achievementDescription,
          !achievement.earned && styles.achievementDescriptionLocked
        ]}>
          {achievement.description}
        </Text>
        {achievement.earned && achievement.earnedDate && (
          <Text style={styles.achievementDate}>Earned {achievement.earnedDate}</Text>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient
          colors={[Colors.background, Colors.backgroundSecondary]}
          style={styles.header}
        >
          <View style={styles.profileSection}>
            <TouchableOpacity style={styles.profilePictureContainer}>
              <Text style={styles.profilePicture}>{userData.profilePicture}</Text>
              <View style={styles.editProfilePicture}>
                <Text style={styles.editProfilePictureText}>📷</Text>
              </View>
            </TouchableOpacity>
            
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{userData.name}</Text>
              <Text style={styles.userEmail}>{userData.email}</Text>
              <Text style={styles.joinDate}>Member since {userData.joinDate}</Text>
              
              <View style={styles.fitnessLevelBadge}>
                <Text style={styles.fitnessLevelText}>{userData.fitnessLevel}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <Text style={styles.sectionTitle}>Your Statistics</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.statsContainer}>
              {renderStatCard('Total Workouts', userStats.totalWorkouts)}
              {renderStatCard('Current Streak', userStats.currentStreak, 'days')}
              {renderStatCard('Longest Streak', userStats.longestStreak, 'days')}
              {renderStatCard('Calories Burned', `${(userStats.caloriesBurned / 1000).toFixed(1)}K`)}
              {renderStatCard('Personal Records', userStats.personalRecords)}
              {renderStatCard('Total Time', `${Math.floor(userStats.totalMinutes / 60)}h`, `${userStats.totalMinutes % 60}m`)}
            </View>
          </ScrollView>
        </View>

        {/* Goals Section */}
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Current Goals</Text>
            <TouchableOpacity onPress={() => setShowGoalsModal(true)}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.goalsContainer}>
            {userData.goals.map((goal, index) => (
              <View key={index} style={styles.goalChip}>
                <Text style={styles.goalText}>{goal}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Achievements Preview */}
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Achievements</Text>
            <TouchableOpacity onPress={() => setShowAchievementsModal(true)}>
              <Text style={styles.editButton}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.achievementsPreview}>
            {achievements.filter(a => a.earned).slice(-3).map(renderAchievement)}
          </View>
        </Card>

        {/* Personal Information */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.profileFields}>
            {renderProfileField('Height', userData.height, 'height')}
            {renderProfileField('Weight', userData.weight, 'weight')}
            {renderProfileField('Age', userData.age, 'age')}
          </View>
        </Card>

        {/* Settings */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsOptions}>
            <TouchableOpacity 
              style={styles.settingOption}
              onPress={() => navigation.navigate(Routes.SETTINGS)}
            >
              <Text style={styles.settingText}>⚙️ Settings</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingOption}>
              <Text style={styles.settingText}>🔔 Notifications</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingOption}>
              <Text style={styles.settingText}>🔒 Privacy</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingOption}>
              <Text style={styles.settingText}>📊 Data Export</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingOption}>
              <Text style={styles.settingText}>❓ Help & Support</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <Button
            title="Logout"
            onPress={handleLogout}
            style={styles.logoutButton}
            variant="secondary"
          />
        </View>
      </ScrollView>

      {/* Edit Field Modal */}
      <Modal
        visible={showEditModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit {editingField}</Text>
            <TextInput
              style={styles.modalInput}
              value={tempValue}
              onChangeText={setTempValue}
              placeholder={`Enter ${editingField}`}
              placeholderTextColor={Colors.textMuted}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowEditModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonPrimary]}
                onPress={handleSaveField}
              >
                <Text style={[styles.modalButtonText, styles.modalButtonTextPrimary]}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Achievements Modal */}
      <Modal
        visible={showAchievementsModal}
        animationType="slide"
        onRequestClose={() => setShowAchievementsModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderTitle}>Achievements</Text>
            <TouchableOpacity onPress={() => setShowAchievementsModal(false)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.achievementsModal}>
            <View style={styles.achievementsGrid}>
              {achievements.map(renderAchievement)}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
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
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  profilePictureContainer: {
    position: 'relative',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicture: {
    fontSize: 32,
  },
  editProfilePicture: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editProfilePictureText: {
    fontSize: 12,
  },
  profileInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  userName: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.text,
  },
  userEmail: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  joinDate: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
  },
  fitnessLevelBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    marginTop: Spacing.sm,
  },
  fitnessLevelText: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
  
  // Quick Stats
  quickStats: {
    paddingVertical: Spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  statCard: {
    width: 120,
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  statValue: {
    fontSize: FontSizes.xxl,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  statTitle: {
    fontSize: FontSizes.sm,
    color: Colors.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  statSubtitle: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  
  // Sections
  section: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    padding: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  editButton: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
  
  // Goals
  goalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  goalChip: {
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  goalText: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
  
  // Achievements
  achievementsPreview: {
    gap: Spacing.md,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.backgroundTertiary,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  achievementCardLocked: {
    opacity: 0.5,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementEmoji: {
    fontSize: 20,
  },
  achievementEmojiLocked: {
    opacity: 0.5,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  achievementTitleLocked: {
    color: Colors.textMuted,
  },
  achievementDescription: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  achievementDescriptionLocked: {
    color: Colors.textMuted,
  },
  achievementDate: {
    fontSize: FontSizes.xs,
    color: Colors.primary,
    fontWeight: '500',
    marginTop: Spacing.xs,
  },
  
  // Profile Fields
  profileFields: {
    gap: Spacing.sm,
  },
  profileField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  fieldLabel: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  fieldContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  fieldValue: {
    fontSize: FontSizes.md,
    color: Colors.text,
    fontWeight: '500',
  },
  editIcon: {
    fontSize: 14,
    opacity: 0.6,
  },
  
  // Settings
  settingsOptions: {
    gap: Spacing.sm,
  },
  settingOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingText: {
    fontSize: FontSizes.md,
    color: Colors.text,
  },
  settingArrow: {
    fontSize: FontSizes.lg,
    color: Colors.textMuted,
  },
  
  // Logout
  logoutSection: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xl,
  },
  logoutButton: {
    backgroundColor: Colors.warning + '20',
    borderColor: Colors.warning,
    borderWidth: 1,
  },
  
  // Modals
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.black + '80',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  modalInput: {
    backgroundColor: Colors.backgroundTertiary,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: FontSizes.md,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  modalButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    backgroundColor: Colors.backgroundTertiary,
  },
  modalButtonPrimary: {
    backgroundColor: Colors.primary,
  },
  modalButtonText: {
    fontSize: FontSizes.md,
    color: Colors.text,
    fontWeight: '600',
  },
  modalButtonTextPrimary: {
    color: Colors.text,
  },
  
  // Achievement Modal
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalHeaderTitle: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.text,
  },
  modalClose: {
    fontSize: FontSizes.lg,
    color: Colors.textMuted,
  },
  achievementsModal: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  achievementsGrid: {
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
  },
});

export default ProfileScreen;
