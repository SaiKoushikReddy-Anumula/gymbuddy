import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants';
import Card from '../components/Card';
import Button from '../components/Button';

const WorkoutPlanScreen: React.FC = () => {
  const workoutPlans = [
    {
      id: 1,
      title: 'Beginner Full Body',
      duration: '4 weeks',
      workouts: 3,
      difficulty: 'Beginner',
      description: 'Perfect for those just starting their fitness journey',
      exercises: 8,
      color: Colors.primary,
    },
    {
      id: 2,
      title: 'Push Pull Legs',
      duration: '6 weeks',
      workouts: 6,
      difficulty: 'Intermediate',
      description: 'Classic split for muscle building and strength',
      exercises: 15,
      color: Colors.secondary,
    },
    {
      id: 3,
      title: 'HIIT Cardio Blast',
      duration: '3 weeks',
      workouts: 4,
      difficulty: 'Advanced',
      description: 'High intensity workouts for fat burning',
      exercises: 12,
      color: Colors.error,
    },
  ];

  const renderWorkoutPlan = (plan: any) => (
    <Card key={plan.id} style={styles.planCard}>
      <View style={styles.planHeader}>
        <View style={styles.planInfo}>
          <Text style={styles.planTitle}>{plan.title}</Text>
          <Text style={styles.planDescription}>{plan.description}</Text>
        </View>
        <View style={[styles.difficultyBadge, { backgroundColor: plan.color + '20' }]}>
          <Text style={[styles.difficultyText, { color: plan.color }]}>
            {plan.difficulty}
          </Text>
        </View>
      </View>
      
      <View style={styles.planStats}>
        <View style={styles.statItem}>
          <Ionicons name="calendar" size={16} color={Colors.textSecondary} />
          <Text style={styles.statText}>{plan.duration}</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="fitness" size={16} color={Colors.textSecondary} />
          <Text style={styles.statText}>{plan.workouts}/week</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="list" size={16} color={Colors.textSecondary} />
          <Text style={styles.statText}>{plan.exercises} exercises</Text>
        </View>
      </View>
      
      <View style={styles.planActions}>
        <Button
          title="Start Plan"
          onPress={() => console.log(`Starting ${plan.title}`)}
          variant="primary"
          size="small"
          style={styles.actionButton}
        />
        <Button
          title="Preview"
          onPress={() => console.log(`Previewing ${plan.title}`)}
          variant="outline"
          size="small"
          style={styles.actionButton}
        />
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[Colors.background, Colors.backgroundSecondary]}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Workout Plans</Text>
          <Text style={styles.headerSubtitle}>
            Choose the perfect plan to reach your fitness goals
          </Text>
        </LinearGradient>

        {/* Current Plan Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Plan</Text>
          <Card style={styles.currentPlanCard} variant="elevated">
            <View style={styles.currentPlanContent}>
              <View style={styles.currentPlanInfo}>
                <Text style={styles.currentPlanTitle}>Push Pull Legs</Text>
                <Text style={styles.currentPlanProgress}>Week 3 of 6</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '50%' }]} />
                </View>
              </View>
              <TouchableOpacity style={styles.continueButton}>
                <Ionicons name="play-circle" size={40} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </Card>
        </View>

        {/* Available Plans */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Plans</Text>
          {workoutPlans.map(renderWorkoutPlan)}
        </View>

        {/* Custom Plan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Create Custom Plan</Text>
          <Card style={styles.customPlanCard}>
            <Ionicons name="add-circle" size={48} color={Colors.primary} />
            <Text style={styles.customPlanTitle}>Build Your Own</Text>
            <Text style={styles.customPlanDescription}>
              Create a personalized workout plan tailored to your goals
            </Text>
            <Button
              title="Create Custom Plan"
              onPress={() => console.log('Creating custom plan')}
              variant="outline"
              size="medium"
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
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  headerTitle: {
    fontSize: FontSizes.xxxl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  currentPlanCard: {
    padding: Spacing.lg,
  },
  currentPlanContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentPlanInfo: {
    flex: 1,
  },
  currentPlanTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  currentPlanProgress: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.backgroundTertiary,
    borderRadius: BorderRadius.full,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
  },
  continueButton: {
    marginLeft: Spacing.lg,
  },
  planCard: {
    marginBottom: Spacing.md,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  planInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  planTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  planDescription: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  difficultyBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  difficultyText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  planStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
  },
  planActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
  customPlanCard: {
    alignItems: 'center',
    padding: Spacing.xl,
  },
  customPlanTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  customPlanDescription: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
});

export default WorkoutPlanScreen;
