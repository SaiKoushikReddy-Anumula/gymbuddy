import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Routes } from '../navigation/routes';
import { Button } from '../components';
import { Colors, Spacing, FontSizes } from '../constants';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, typeof Routes.HOME>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }: HomeScreenProps) => {
  const handleNavigateToProfile = () => {
    navigation.navigate(Routes.PROFILE);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome to GymBuddy! 🏋️‍♂️</Text>
        <Text style={styles.subtitle}>
          Your fitness journey starts here. Track your workouts, set goals, and stay motivated!
        </Text>
        
        <View style={styles.buttonContainer}>
          <Button
            title="View Profile"
            onPress={handleNavigateToProfile}
            variant="primary"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  welcomeText: {
    fontSize: FontSizes.xxxl,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.xl,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
});

export default HomeScreen;
