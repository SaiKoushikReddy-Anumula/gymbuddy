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
import Card from '../components/Card';
import { Routes } from '../navigation/routes';

interface DashboardScreenProps {
  navigation: any;
  route?: any;
}

const { width } = Dimensions.get('window');

const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const statsData = [
    { title: "Today's Calories", value: "1,247", change: "+23%", color: Colors.secondary },
    { title: "Workout Streak", value: "7", change: "days", color: Colors.primary },
    { title: "Weight Progress", value: "-2.1", change: "kg", color: Colors.primary },
    { title: "Active Friends", value: "12", change: "online", color: Colors.secondary },
  ];

  const recentActivities = [
    { 
      type: 'workout', 
      title: 'Completed Chest Workout', 
      time: '2h ago', 
      details: '45 minutes • 3 exercises • 247 calories',
      icon: '💪'
    },
    { 
      type: 'diet', 
      title: 'Logged Protein Shake', 
      time: '3h ago', 
      details: '25g protein • 150 calories • Post-workout',
      icon: '🥤'
    },
    { 
      type: 'achievement', 
      title: 'Achievement Unlocked', 
      time: '1d ago', 
      details: '7 Day Streak - Beast Mode activated!',
      icon: '🏆'
    },
  ];

  const renderStatCard = (stat: any, index: number) => {
    const cardStyle = {
      ...styles.statCard,
      width: (width - 48) / 2,
    };
    
    return (
      <Card key={index} style={cardStyle}>
        <Text style={styles.statTitle}>{stat.title}</Text>
        <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
        <Text style={styles.statChange}>{stat.change}</Text>
      </Card>
    );
  };

  const renderActivityItem = (activity: any, index: number) => (
    <TouchableOpacity key={index} style={styles.activityItem}>
      <Text style={styles.activityIcon}>{activity.icon}</Text>
      <View style={styles.activityContent}>
        <Text style={styles.activityTitle}>{activity.title}</Text>
        <Text style={styles.activityDetails}>{activity.details}</Text>
      </View>
      <Text style={styles.activityTime}>{activity.time}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient
          colors={[Colors.background, Colors.backgroundSecondary]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Welcome back, John! 👋</Text>
              <Text style={styles.subGreeting}>Ready to crush your fitness goals today?</Text>
            </View>
            <TouchableOpacity style={styles.profileButton}>
              <Text style={styles.profileText}>JD</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.streakBadge}>
            <Text style={styles.streakIcon}>🔥</Text>
            <Text style={styles.streakText}>Beast Mode Streak: 7 days</Text>
          </View>
        </LinearGradient>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Today's Overview</Text>
          <View style={styles.statsGrid}>
            {statsData.map((stat, index) => renderStatCard(stat, index))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <Card style={styles.quickActionsCard}>
            <Button
              title="🏋️ Start Gym Session"
              onPress={() => navigation.navigate(Routes.GYM_SESSION)}
              variant="primary"
              size="large"
              fullWidth
              style={styles.primaryAction}
            />
            
            <View style={styles.secondaryActions}>
              <Button
                title="📸 Log Meal"
                onPress={() => navigation.navigate(Routes.DIET)}
                variant="outline"
                style={styles.secondaryAction}
              />
              <Button
                title="📊 View Progress"
                onPress={() => navigation.navigate(Routes.ANALYTICS)}
                variant="outline"
                style={styles.secondaryAction}
              />
            </View>
          </Card>
        </View>

        {/* Progress Charts */}
        <View style={styles.progressContainer}>
          <Text style={styles.sectionTitle}>This Week's Progress</Text>
          <View style={styles.chartsGrid}>
            <Card style={styles.chartCard}>
              <Text style={styles.chartTitle}>Weekly Goal</Text>
              <View style={styles.progressCircle}>
                <Text style={styles.progressValue}>5/7</Text>
                <Text style={styles.progressLabel}>Workout sessions</Text>
              </View>
            </Card>
            
            <Card style={styles.chartCard}>
              <Text style={styles.chartTitle}>Workout Time</Text>
              <View style={styles.progressCircle}>
                <Text style={styles.progressValue}>47m</Text>
                <Text style={styles.progressLabel}>Average this week</Text>
                <Text style={styles.progressImprovement}>+12% improvement</Text>
              </View>
            </Card>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activityContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Card style={styles.activityCard}>
            {recentActivities.map((activity, index) => renderActivityItem(activity, index))}
            
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All Activity</Text>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Social Feed Preview */}
        <View style={styles.socialContainer}>
          <Text style={styles.sectionTitle}>Friend Activity</Text>
          <Card style={styles.socialCard}>
            <TouchableOpacity style={styles.friendActivity}>
              <View style={styles.friendAvatar}>
                <Text style={styles.friendAvatarText}>MK</Text>
              </View>
              <View style={styles.friendContent}>
                <Text style={styles.friendName}>Mike just completed a workout!</Text>
                <Text style={styles.friendDetails}>Leg Day • 52 minutes • 312 calories</Text>
              </View>
              <Text style={styles.friendTime}>5m ago</Text>
            </TouchableOpacity>
            
            <Button
              title="View All Friends"
              onPress={() => navigation.navigate(Routes.FRIENDS)}
              variant="ghost"
              size="small"
            />
          </Card>
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
  scrollContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  greeting: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subGreeting: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    fontSize: FontSizes.md,
    fontWeight: 'bold',
    color: Colors.text,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  streakIcon: {
    fontSize: 18,
    marginRight: Spacing.sm,
  },
  streakText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.primary,
  },
  
  // Sections
  statsContainer: {
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.lg,
  },
  quickActionsContainer: {
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.lg,
  },
  progressContainer: {
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.lg,
  },
  activityContainer: {
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.lg,
  },
  socialContainer: {
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  
  // Stats
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  statCard: {
    alignItems: 'center',
    padding: Spacing.md,
  },
  statTitle: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  statValue: {
    fontSize: FontSizes.xxl,
    fontWeight: 'bold',
    marginVertical: Spacing.sm,
  },
  statChange: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
  },
  
  // Quick Actions
  quickActionsCard: {
    gap: Spacing.md,
  },
  primaryAction: {
    marginBottom: Spacing.sm,
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  secondaryAction: {
    flex: 1,
  },
  
  // Charts
  chartsGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  chartCard: {
    flex: 1,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  progressCircle: {
    alignItems: 'center',
  },
  progressValue: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  progressLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  progressImprovement: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    marginTop: Spacing.xs,
  },
  
  // Activity
  activityCard: {
    gap: 0,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  activityIcon: {
    fontSize: 24,
    marginRight: Spacing.md,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text,
  },
  activityDetails: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  activityTime: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
  },
  viewAllButton: {
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: FontSizes.md,
    color: Colors.primary,
    fontWeight: '600',
  },
  
  // Social
  socialCard: {
    gap: Spacing.md,
  },
  friendActivity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  friendAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  friendAvatarText: {
    fontSize: FontSizes.sm,
    fontWeight: 'bold',
    color: Colors.text,
  },
  friendContent: {
    flex: 1,
  },
  friendName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text,
  },
  friendDetails: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  friendTime: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
  },
});

export default DashboardScreen;
