import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants';
import Button from '../components/Button';
import Card from '../components/Card';

interface WorkoutSession {
  isActive: boolean;
  currentExercise: string;
  reps: number;
  sets: number;
  totalSets: number;
  restTime: number;
  calories: number;
  duration: number;
}

const exercises = [
  { name: 'Bench Press', sets: 3, reps: 12, completed: 2 },
  { name: 'Incline Dumbbell Press', sets: 3, reps: 10, completed: 0 },
  { name: 'Chest Flyes', sets: 2, reps: 15, completed: 0 },
  { name: 'Push-ups', sets: 2, reps: 20, completed: 0 },
];

const GymSessionScreen: React.FC = () => {
  const [session, setSession] = useState<WorkoutSession>({
    isActive: false,
    currentExercise: 'Bench Press',
    reps: 8,
    sets: 2,
    totalSets: 3,
    restTime: 0,
    calories: 127,
    duration: 1425,
  });
  const [timer, setTimer] = useState(0);
  const [restTimer, setRestTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (session.isActive) {
      interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [session.isActive]);

  useEffect(() => {
    let restInt: NodeJS.Timeout;
    if (restTimer > 0) {
      restInt = setInterval(() => setRestTimer(prev => (prev <= 1 ? 0 : prev - 1)), 1000);
    }
    return () => clearInterval(restInt);
  }, [restTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartSession = () => setSession(prev => ({ ...prev, isActive: true }));
  const handlePauseSession = () => setSession(prev => ({ ...prev, isActive: false }));
  const handleStopSession = () => {
    setSession(prev => ({ ...prev, isActive: false }));
    setTimer(0);
    setRestTimer(0);
  };
  const handleRestTimer = () => setRestTimer(120);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={{alignItems: 'center', paddingBottom: Spacing.xl}}
        showsVerticalScrollIndicator={false}
      >

        {/* Metrics Row */}
        <Card style={styles.card}>
          <View style={styles.metricsRow}>
            <View style={styles.metricBlock}>
              <Text style={styles.metricValue}>{session.reps}/12</Text>
              <Text style={styles.metricLabel}>Reps</Text>
            </View>
            <View style={styles.metricBlock}>
              <Text style={styles.metricValue}>{session.sets}/{session.totalSets}</Text>
              <Text style={styles.metricLabel}>Sets</Text>
            </View>
            <View style={styles.metricBlock}>
              <Text style={styles.metricValue}>{session.calories}</Text>
              <Text style={styles.metricLabel}>Calories</Text>
            </View>
            <View style={styles.metricBlock}>
              <Text style={styles.metricValue}>{formatTime(session.duration + timer)}</Text>
              <Text style={styles.metricLabel}>Time</Text>
            </View>
          </View>
        </Card>

        {/* Current Exercise Card */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Current Exercise</Text>
          <Text style={styles.currentExercise}>{session.currentExercise}</Text>
          {restTimer > 0 && (
            <View style={styles.restBox}>
              <Text style={styles.restLabel}>Rest Time</Text>
              <Text style={styles.restTime}>{formatTime(restTimer)}</Text>
            </View>
          )}
        </Card>

        {/* Camera */}
        <Card style={styles.cameraCard}>
          <View style={styles.cameraArea}>
            <Text style={styles.cameraIcon}>📷</Text>
            <Text style={styles.cameraLabel}>AI Camera Active - Tracking Your Form</Text>
          </View>
        </Card>

        {/* Exercise List Card */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Today's Workout</Text>
          {exercises.map((exercise, idx) => (
            <View key={idx} style={styles.exerciseRow}>
              <View style={[
                styles.exerciseCheckbox,
                exercise.completed === exercise.sets && styles.exerciseCheckboxCompleted,
              ]}>
                {exercise.completed === exercise.sets && (
                  <Text style={styles.exerciseCheckMark}>✓</Text>
                )}
              </View>
              <View>
                <Text style={[
                  styles.exerciseName,
                  exercise.completed === exercise.sets && styles.exerciseDone,
                ]}>{exercise.name}</Text>
                <Text style={styles.exerciseSub}>
                  {exercise.completed}/{exercise.sets} sets • {exercise.reps} reps
                </Text>
              </View>
            </View>
          ))}
        </Card>

        {/* Session Controls */}
        <View style={styles.controlsArea}>
          {!session.isActive ? (
            <Button title="Start Session" onPress={handleStartSession} variant="primary" size="large" />
          ) : (
            <View style={styles.liveControls}>
              <Button 
                title="Pause" 
                onPress={handlePauseSession} 
                variant="danger" 
                size="medium" 
              />
              <Button 
                title="Stop" 
                onPress={handleStopSession} 
                variant="outline" 
                size="medium" 
              />
              <Button 
                title="Rest" 
                onPress={handleRestTimer} 
                variant="secondary" 
                size="medium" 
              />
            </View>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollArea: { flex: 1, width: '100%' },
  card: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.backgroundTertiary,
    borderRadius: BorderRadius.md,
  },
  cameraCard: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: Spacing.md,
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.backgroundTertiary,
    borderRadius: BorderRadius.md,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  metricBlock: {
    alignItems: 'center',
    minWidth: 60,
    marginHorizontal: Spacing.sm,
  },
  metricValue: { fontSize: FontSizes.lg, fontWeight: 'bold', color: Colors.primary },
  metricLabel: { fontSize: FontSizes.sm, color: Colors.textSecondary },

  sectionTitle: { fontSize: FontSizes.md, fontWeight: 'bold', color: Colors.primary, marginVertical: Spacing.sm },
  currentExercise: { fontSize: FontSizes.lg, fontWeight: '600', color: Colors.text, marginBottom: Spacing.sm },

  restBox: {
    backgroundColor: Colors.backgroundTertiary,
    borderRadius: 8,
    padding: Spacing.md,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  restLabel: { fontSize: FontSizes.xs, color: Colors.textSecondary, marginBottom: 2 },
  restTime: { fontSize: FontSizes.lg, color: Colors.secondary, fontWeight: 'bold' },

  cameraArea: { alignItems: 'center', paddingVertical: Spacing.lg },
  cameraIcon: { fontSize: 66, marginBottom: Spacing.md },
  cameraLabel: { fontSize: FontSizes.md, color: Colors.textSecondary, textAlign: 'center' },

  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.sm,
  },
  exerciseCheckbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    backgroundColor: Colors.background,
  },
  exerciseCheckboxCompleted: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  exerciseCheckMark: { color: '#FFF', fontSize: 13, fontWeight: 'bold' }, // Use pure white for best visibility
  exerciseName: { fontSize: FontSizes.sm, fontWeight: '600', color: Colors.text },
  exerciseSub: { fontSize: FontSizes.xs, color: Colors.textSecondary },
  exerciseDone: { textDecorationLine: 'line-through', color: Colors.textMuted },

  controlsArea: { width: '90%', alignSelf: 'center', marginVertical: Spacing.xl },
  liveControls: { flexDirection: 'row', justifyContent: 'space-between', gap: Spacing.sm },
});

export default GymSessionScreen;
