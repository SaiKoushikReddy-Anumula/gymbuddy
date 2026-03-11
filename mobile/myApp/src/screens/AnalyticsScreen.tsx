import React, { useState } from 'react';
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
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/routes';

interface AnalyticsScreenProps {
  navigation: any;
  route?: any;
}

const { width } = Dimensions.get('window');

const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({ navigation }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  
  const timeframes = [
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'year', label: 'Year' },
  ];

  const workoutData = [
    { day: 'Mon', workouts: 1, duration: 45 },
    { day: 'Tue', workouts: 0, duration: 0 },
    { day: 'Wed', workouts: 1, duration: 52 },
    { day: 'Thu', workouts: 1, duration: 38 },
    { day: 'Fri', workouts: 0, duration: 0 },
    { day: 'Sat', workouts: 1, duration: 65 },
    { day: 'Sun', workouts: 1, duration: 41 },
  ];

  const performanceMetrics = [
    { 
      muscle: 'Chest', 
      score: 85, 
      trend: 'up',
      improvement: '+12%',
      color: Colors.primary 
    },
    { 
      muscle: 'Back', 
      score: 78, 
      trend: 'up',
      improvement: '+8%',
      color: Colors.secondary 
    },
    { 
      muscle: 'Legs', 
      score: 92, 
      trend: 'up',
      improvement: '+5%',
      color: Colors.primary 
    },
    { 
      muscle: 'Arms', 
      score: 71, 
      trend: 'down',
      improvement: '-3%',
      color: Colors.warning 
    },
    { 
      muscle: 'Core', 
      score: 66, 
      trend: 'up',
      improvement: '+15%',
      color: Colors.primary 
    },
    { 
      muscle: 'Shoulders', 
      score: 89, 
      trend: 'stable',
      improvement: '±0%',
      color: Colors.textMuted 
    },
  ];

  const achievements = [
    {
      title: '7 Day Streak',
      description: 'Completed workouts for 7 consecutive days',
      icon: '🔥',
      date: '2 days ago',
      rarity: 'rare',
    },
    {
      title: 'Form Master',
      description: 'Maintained 90%+ form score for 5 workouts',
      icon: '🎯',
      date: '1 week ago',
      rarity: 'epic',
    },
    {
      title: 'Chest Champion',
      description: 'Increased bench press by 20%',
      icon: '💪',
      date: '2 weeks ago',
      rarity: 'legendary',
    },
  ];

  const formFeedbackHistory = [
    {
      exercise: 'Bench Press',
      date: 'Today',
      score: 95,
      feedback: 'Excellent form, perfect bar path',
      trend: 'improved',
    },
    {
      exercise: 'Squat',
      date: 'Yesterday',
      score: 87,
      feedback: 'Good depth, work on knee tracking',
      trend: 'stable',
    },
    {
      exercise: 'Deadlift',
      date: '2 days ago',
      score: 91,
      feedback: 'Great hip hinge, maintain neutral spine',
      trend: 'improved',
    },
  ];

  const renderWorkoutHeatmap = () => (
    <Card style={styles.heatmapCard}>
      <Text style={styles.cardTitle}>Workout Frequency</Text>
      <View style={styles.heatmapContainer}>
        {workoutData.map((day, index) => (
          <View key={index} style={styles.heatmapDay}>
            <View style={[
              styles.heatmapCell,
              day.workouts > 0 ? styles.heatmapActive : styles.heatmapInactive
            ]}>
              <Text style={[
                styles.heatmapDayText,
                day.workouts > 0 ? styles.heatmapActiveText : styles.heatmapInactiveText
              ]}>
                {day.workouts}
              </Text>
            </View>
            <Text style={styles.heatmapLabel}>{day.day}</Text>
          </View>
        ))}
      </View>
    </Card>
  );

  const renderPerformanceRadar = () => (
    <Card style={styles.radarCard}>
      <Text style={styles.cardTitle}>Performance by Muscle Group</Text>
      <View style={styles.radarContainer}>
        {performanceMetrics.map((metric, index) => (
          <View key={index} style={styles.radarItem}>
            <View style={styles.radarItemHeader}>
              <Text style={styles.radarMuscle}>{metric.muscle}</Text>
              <Text style={[
                styles.radarImprovement,
                { color: metric.trend === 'up' ? Colors.primary : 
                        metric.trend === 'down' ? Colors.error : Colors.textMuted }
              ]}>
                {metric.improvement}
              </Text>
            </View>
            
            <View style={styles.radarBar}>
              <View style={styles.radarBarBackground}>
                <View style={[
                  styles.radarBarFill,
                  { 
                    width: `${metric.score}%`,
                    backgroundColor: metric.color
                  }
                ]} />
              </View>
              <Text style={styles.radarScore}>{metric.score}</Text>
            </View>
          </View>
        ))}
      </View>
    </Card>
  );

  const renderAchievements = () => (
    <Card style={styles.achievementsCard}>
      <Text style={styles.cardTitle}>Recent Achievements</Text>
      <View style={styles.achievementsList}>
        {achievements.map((achievement, index) => (
          <View key={index} style={styles.achievementItem}>
            <Text style={styles.achievementIcon}>{achievement.icon}</Text>
            <View style={styles.achievementContent}>
              <View style={styles.achievementHeader}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <View style={[
                  styles.rarityBadge,
                  styles[`rarity${achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}` as keyof typeof styles]
                ]}>
                  <Text style={styles.rarityText}>{achievement.rarity}</Text>
                </View>
              </View>
              <Text style={styles.achievementDescription}>{achievement.description}</Text>
              <Text style={styles.achievementDate}>{achievement.date}</Text>
            </View>
          </View>
        ))}
      </View>
    </Card>
  );

  const renderFormFeedback = () => (
    <Card style={styles.feedbackCard}>
      <Text style={styles.cardTitle}>Form Analysis History</Text>
      <View style={styles.feedbackList}>
        {formFeedbackHistory.map((item, index) => (
          <View key={index} style={styles.feedbackItem}>
            <View style={styles.feedbackHeader}>
              <Text style={styles.feedbackExercise}>{item.exercise}</Text>
              <View style={styles.feedbackMeta}>
                <Text style={[styles.feedbackScore, { color: Colors.primary }]}>
                  {item.score}%
                </Text>
                <Text style={styles.feedbackDate}>{item.date}</Text>
              </View>
            </View>
            <Text style={styles.feedbackText}>{item.feedback}</Text>
            <View style={[
              styles.trendIndicator,
              item.trend === 'improved' ? styles.trendUp : 
              item.trend === 'declined' ? styles.trendDown : styles.trendStable
            ]}>
              <Text style={styles.trendText}>
                {item.trend === 'improved' ? '↗ Improved' : 
                 item.trend === 'declined' ? '↘ Needs work' : '→ Stable'}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </Card>
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
          <Text style={styles.title}>Analytics</Text>
          <Text style={styles.subtitle}>Track your progress and performance insights</Text>
          
          {/* Time frame selector */}
          <View style={styles.timeframeContainer}>
            {timeframes.map((timeframe) => (
              <TouchableOpacity
                key={timeframe.id}
                style={[
                  styles.timeframeButton,
                  selectedTimeframe === timeframe.id && styles.timeframeButtonActive
                ]}
                onPress={() => setSelectedTimeframe(timeframe.id)}
              >
                <Text style={[
                  styles.timeframeText,
                  selectedTimeframe === timeframe.id && styles.timeframeTextActive
                ]}>
                  {timeframe.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Workout Heatmap */}
          {renderWorkoutHeatmap()}

          {/* Weight Progress Chart Placeholder */}
          <Card style={styles.chartCard}>
            <Text style={styles.cardTitle}>Weight Progress</Text>
            <View style={styles.chartPlaceholder}>
              <Text style={styles.chartIcon}>📈</Text>
              <Text style={styles.chartText}>Weight tracking chart would go here</Text>
              <Text style={styles.chartSubtext}>-2.1 kg this month</Text>
            </View>
          </Card>

          {/* Performance Radar */}
          {renderPerformanceRadar()}

          {/* Form Feedback */}
          {renderFormFeedback()}

          {/* Achievements */}
          {renderAchievements()}
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
  
  // Header
  header: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  
  // Timeframe selector
  timeframeContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  timeframeButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  timeframeButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  timeframeText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  timeframeTextActive: {
    color: Colors.text,
  },
  
  // Content
  content: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  
  cardTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  
  // Heatmap
  heatmapCard: {},
  heatmapContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: Spacing.sm,
  },
  heatmapDay: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  heatmapCell: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heatmapActive: {
    backgroundColor: Colors.primary,
  },
  heatmapInactive: {
    backgroundColor: Colors.backgroundTertiary,
  },
  heatmapDayText: {
    fontSize: FontSizes.md,
    fontWeight: 'bold',
  },
  heatmapActiveText: {
    color: Colors.text,
  },
  heatmapInactiveText: {
    color: Colors.textMuted,
  },
  heatmapLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  
  // Chart placeholder
  chartCard: {},
  chartPlaceholder: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  chartIcon: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  chartText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  chartSubtext: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  
  // Radar/Performance
  radarCard: {},
  radarContainer: {
    gap: Spacing.md,
  },
  radarItem: {
    gap: Spacing.sm,
  },
  radarItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  radarMuscle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text,
  },
  radarImprovement: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  radarBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  radarBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  radarBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  radarScore: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
    minWidth: 30,
    textAlign: 'right',
  },
  
  // Achievements
  achievementsCard: {},
  achievementsList: {
    gap: Spacing.md,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  achievementIcon: {
    fontSize: 24,
  },
  achievementContent: {
    flex: 1,
    gap: Spacing.xs,
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  achievementTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text,
  },
  rarityBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  rarityRare: {
    backgroundColor: Colors.primary + '30',
  },
  rarityEpic: {
    backgroundColor: Colors.secondary + '30',
  },
  rarityLegendary: {
    backgroundColor: Colors.warning + '30',
  },
  rarityText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.text,
  },
  achievementDescription: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  achievementDate: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  
  // Form Feedback
  feedbackCard: {},
  feedbackList: {
    gap: Spacing.md,
  },
  feedbackItem: {
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feedbackExercise: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text,
  },
  feedbackMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  feedbackScore: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  feedbackDate: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
  },
  feedbackText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  trendIndicator: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  trendUp: {
    backgroundColor: Colors.primary + '20',
  },
  trendDown: {
    backgroundColor: Colors.error + '20',
  },
  trendStable: {
    backgroundColor: Colors.textMuted + '20',
  },
  trendText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
});

export default AnalyticsScreen;
