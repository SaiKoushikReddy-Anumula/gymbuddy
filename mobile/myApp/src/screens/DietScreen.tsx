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
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants';
import Button from '../components/Button';
import Card from '../components/Card';
import { Routes } from '../navigation/routes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/routes';

interface DietScreenProps {
  navigation: any;
  route?: any;
}

const { width } = Dimensions.get('window');

const DietScreen: React.FC<DietScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [dailyGoal] = useState(2500); // calories
  
  const nutritionData = [
    { 
      name: 'Protein', 
      current: 142, 
      target: 150, 
      color: Colors.primary, 
      percentage: 95,
      unit: 'g'
    },
    { 
      name: 'Carbs', 
      current: 280, 
      target: 300, 
      color: Colors.secondary, 
      percentage: 93,
      unit: 'g'
    },
    { 
      name: 'Fats', 
      current: 65, 
      target: 80, 
      color: Colors.warning, 
      percentage: 81,
      unit: 'g'
    },
    { 
      name: 'Calories', 
      current: 2247, 
      target: 2500, 
      color: Colors.error, 
      percentage: 90,
      unit: 'kcal'
    },
  ];

  const recentMeals = [
    {
      type: 'Breakfast',
      time: '8:30 AM',
      items: ['Oatmeal with berries', 'Greek yogurt', 'Coffee'],
      calories: 450,
      image: '🥣',
    },
    {
      type: 'Lunch',
      time: '1:15 PM',
      items: ['Grilled chicken salad', 'Quinoa', 'Avocado'],
      calories: 650,
      image: '🥗',
    },
    {
      type: 'Snack',
      time: '4:00 PM',
      items: ['Protein shake', 'Banana'],
      calories: 320,
      image: '🥤',
    },
  ];

  const handleCameraUpload = () => {
    Alert.alert(
      'Food Photo',
      'Choose how to add your meal',
      [
        { text: 'Take Photo', onPress: () => console.log('Camera opened') },
        { text: 'Choose from Gallery', onPress: () => console.log('Gallery opened') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const renderNutritionMeter = (item: any) => (
    <View key={item.name} style={styles.nutritionMeter}>
      <View style={styles.meterHeader}>
        <Text style={styles.meterLabel}>{item.name}</Text>
        <Text style={styles.meterValue}>
          {item.current}/{item.target} {item.unit}
        </Text>
      </View>
      
      <View style={styles.meterContainer}>
        <View style={styles.meterBackground}>
          <View 
            style={[
              styles.meterFill, 
              { 
                width: `${Math.min(item.percentage, 100)}%`,
                backgroundColor: item.color 
              }
            ]} 
          />
        </View>
        <Text style={[styles.meterPercentage, { color: item.color }]}>
          {item.percentage}%
        </Text>
      </View>
    </View>
  );

  const renderMealCard = (meal: any, index: number) => (
    <TouchableOpacity key={index} style={styles.mealCard}>
      <Text style={styles.mealImage}>{meal.image}</Text>
      
      <View style={styles.mealContent}>
        <View style={styles.mealHeader}>
          <Text style={styles.mealType}>{meal.type}</Text>
          <Text style={styles.mealTime}>{meal.time}</Text>
        </View>
        
        <Text style={styles.mealItems}>
          {meal.items.join(' • ')}
        </Text>
        
        <Text style={styles.mealCalories}>{meal.calories} calories</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient
          colors={[Colors.background, Colors.backgroundSecondary]}
          style={[styles.header, { paddingTop: insets.top + Spacing.md }]}
        >
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.title}>Diet Tracker</Text>
              <Text style={styles.subtitle}>AI-powered nutrition analysis and meal tracking</Text>
            </View>
            <View style={styles.dailyGoalBadge}>
              <Text style={styles.goalPercentage}>94%</Text>
              <Text style={styles.goalLabel}>Daily Goal</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Food Upload Section */}
        <View style={styles.uploadSection}>
          <Text style={styles.sectionTitle}>Log Your Meal</Text>
          
          <Card style={styles.uploadCard}>
            <TouchableOpacity 
              style={styles.uploadArea}
              onPress={handleCameraUpload}
            >
              <Text style={styles.uploadIcon}>📷</Text>
              <Text style={styles.uploadText}>Upload food photo</Text>
              <Text style={styles.uploadSubtext}>AI will analyze nutrition automatically</Text>
            </TouchableOpacity>
            
            <Text style={styles.tagLabel}>Optional meal tag</Text>
            <Text style={styles.tagPlaceholder}>e.g., Post-workout protein shake</Text>
            
            <Button
              title="+ Manual Entry"
              onPress={() => console.log('Manual entry')}
              variant="ghost"
              size="small"
            />
          </Card>
        </View>

        {/* Nutrition Dashboard */}
        <View style={styles.nutritionSection}>
          <Text style={styles.sectionTitle}>Today's Nutrition</Text>
          
          <Card style={styles.nutritionCard}>
            {nutritionData.map(renderNutritionMeter)}
          </Card>
        </View>

        {/* Meal History */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Today's Meals</Text>
          
          <View style={styles.mealsList}>
            {recentMeals.map(renderMealCard)}
          </View>
          
          <Button
            title="View Full History"
            onPress={() => console.log('View history')}
            variant="outline"
            size="medium"
            style={styles.historyButton}
          />
        </View>

        {/* AI Insights */}
        <View style={styles.insightsSection}>
          <Text style={styles.sectionTitle}>AI Insights</Text>
          
          <Card style={styles.insightsCard}>
            <View style={styles.insightItem}>
              <Text style={styles.insightIcon}>💡</Text>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Protein Target Almost Reached</Text>
                <Text style={styles.insightText}>
                  You're 8g away from your daily protein goal. Consider a small snack.
                </Text>
              </View>
            </View>
            
            <View style={styles.insightItem}>
              <Text style={styles.insightIcon}>📈</Text>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Great Progress This Week</Text>
                <Text style={styles.insightText}>
                  You've consistently hit 90%+ of your nutrition goals for 5 days.
                </Text>
              </View>
            </View>
            
            <View style={styles.insightItem}>
              <Text style={styles.insightIcon}>⚡</Text>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Pre-Workout Fuel</Text>
                <Text style={styles.insightText}>
                  Based on your 6 PM workout, consider a light snack at 5 PM.
                </Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
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
    paddingBottom: Spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  dailyGoalBadge: {
    alignItems: 'center',
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  goalPercentage: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  goalLabel: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
  },
  
  // Sections
  uploadSection: {
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.lg,
  },
  nutritionSection: {
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.lg,
  },
  historySection: {
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.lg,
  },
  insightsSection: {
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
  
  // Upload
  uploadCard: {},
  uploadArea: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
  },
  uploadIcon: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  uploadText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  uploadSubtext: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  tagLabel: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  tagPlaceholder: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    fontStyle: 'italic',
    marginBottom: Spacing.md,
  },
  
  // Nutrition
  nutritionCard: {
    gap: Spacing.lg,
  },
  nutritionMeter: {
    gap: Spacing.sm,
  },
  meterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  meterLabel: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text,
  },
  meterValue: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  meterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  meterBackground: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  meterFill: {
    height: '100%',
    borderRadius: 4,
  },
  meterPercentage: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    minWidth: 35,
  },
  
  // Meals
  mealsList: {
    gap: Spacing.md,
  },
  mealCard: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    alignItems: 'center',
  },
  mealImage: {
    fontSize: 32,
    marginRight: Spacing.md,
  },
  mealContent: {
    flex: 1,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  mealType: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text,
  },
  mealTime: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
  },
  mealItems: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  mealCalories: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
  historyButton: {
    marginTop: Spacing.md,
  },
  
  // Insights
  insightsCard: {
    gap: Spacing.lg,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  insightIcon: {
    fontSize: 24,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  insightText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});

export default DietScreen;
