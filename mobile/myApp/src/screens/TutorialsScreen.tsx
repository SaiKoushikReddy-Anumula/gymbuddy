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
  Dimensions,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants';
import Card from '../components/Card';

interface TutorialsScreenProps {
  navigation: any;
  route?: any;
}

const { width } = Dimensions.get('window');

interface Tutorial {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  thumbnail: string;
  views: number;
  rating: number;
  isPopular?: boolean;
}

const TutorialsScreen: React.FC<TutorialsScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedInstructor, setSelectedInstructor] = useState('All');

  const categories = ['All', 'Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core', 'Cardio'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const instructors = ['All', 'Mike Johnson', 'Sarah Chen', 'David Rodriguez', 'Emma Wilson'];

  const featuredTutorials: Tutorial[] = [
    {
      id: '1',
      title: 'Perfect Bench Press Form',
      instructor: 'Mike Johnson',
      duration: '12:34',
      difficulty: 'Intermediate',
      category: 'Chest',
      thumbnail: '💪',
      views: 15420,
      rating: 4.9,
      isPopular: true,
    },
    {
      id: '2',
      title: 'Squat Depth and Mobility',
      instructor: 'Sarah Chen',
      duration: '15:22',
      difficulty: 'Beginner',
      category: 'Legs',
      thumbnail: '🏋️',
      views: 23150,
      rating: 4.8,
      isPopular: true,
    },
    {
      id: '3',
      title: 'Cardio for Muscle Building',
      instructor: 'David Rodriguez',
      duration: '8:56',
      difficulty: 'Intermediate',
      category: 'Cardio',
      thumbnail: '🏃',
      views: 8900,
      rating: 4.7,
      isPopular: true,
    },
  ];

  const allTutorials: Tutorial[] = [
    ...featuredTutorials,
    {
      id: '4',
      title: 'Deadlift Technique Mastery',
      instructor: 'Mike Johnson',
      duration: '18:45',
      difficulty: 'Advanced',
      category: 'Back',
      thumbnail: '🏋️',
      views: 12300,
      rating: 4.9,
    },
    {
      id: '5',
      title: 'Core Strength Fundamentals',
      instructor: 'Emma Wilson',
      duration: '10:12',
      difficulty: 'Beginner',
      category: 'Core',
      thumbnail: '💪',
      views: 9800,
      rating: 4.6,
    },
    {
      id: '6',
      title: 'Shoulder Mobility Routine',
      instructor: 'Sarah Chen',
      duration: '14:33',
      difficulty: 'Intermediate',
      category: 'Shoulders',
      thumbnail: '🤸',
      views: 7650,
      rating: 4.8,
    },
    {
      id: '7',
      title: 'Advanced Arm Training',
      instructor: 'David Rodriguez',
      duration: '20:18',
      difficulty: 'Advanced',
      category: 'Arms',
      thumbnail: '💪',
      views: 11200,
      rating: 4.7,
    },
    {
      id: '8',
      title: 'HIIT Workout for Beginners',
      instructor: 'Emma Wilson',
      duration: '25:00',
      difficulty: 'Beginner',
      category: 'Cardio',
      thumbnail: '🔥',
      views: 18900,
      rating: 4.5,
    },
  ];

  const filteredTutorials = allTutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tutorial.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || tutorial.difficulty === selectedDifficulty;
    const matchesInstructor = selectedInstructor === 'All' || tutorial.instructor === selectedInstructor;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesInstructor;
  });


  const renderTutorialCard = ({ item }: { item: Tutorial }) => (
    <TouchableOpacity style={styles.tutorialCard}>
      <View style={styles.thumbnailContainer}>
        <Text style={styles.thumbnail}>{item.thumbnail}</Text>
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
        {item.isPopular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>Popular</Text>
          </View>
        )}
        <TouchableOpacity style={styles.playButton}>
          <Text style={styles.playIcon}>▶️</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.tutorialContent}>
        <Text style={styles.tutorialTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.instructorName}>{item.instructor}</Text>
        
        <View style={styles.tutorialMeta}>
          <View style={styles.metaItem}>
            <Text style={[
              styles.difficultyBadge,
              styles[`difficulty${item.difficulty}` as keyof typeof styles]
            ]}>
              {item.difficulty}
            </Text>
          </View>
          
          <View style={styles.metaStats}>
            <Text style={styles.metaStat}>⭐ {item.rating}</Text>
            <Text style={styles.metaStat}>{(item.views / 1000).toFixed(1)}K views</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );


  const renderFeaturedCard = (tutorial: Tutorial) => (
    <TouchableOpacity key={tutorial.id} style={styles.featuredCard}>
      <LinearGradient
        colors={[Colors.primary + '20', Colors.secondary + '20']}
        style={styles.featuredGradient}
      >
        <View style={styles.featuredContent}>
          <Text style={styles.featuredThumbnail}>{tutorial.thumbnail}</Text>
          <View style={styles.featuredInfo}>
            <Text style={styles.featuredTitle}>{tutorial.title}</Text>
            <Text style={styles.featuredInstructor}>{tutorial.instructor}</Text>
            <View style={styles.featuredMeta}>
              <Text style={styles.featuredDuration}>{tutorial.duration}</Text>
              <Text style={styles.featuredRating}>⭐ {tutorial.rating}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );


  const renderFilterSection = (
    title: string,
    options: string[],
    selected: string,
    onSelect: (option: string) => void
  ) => (
    <View style={styles.filterSection}>
      <Text style={styles.filterTitle}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filterOptions}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.filterOption,
                selected === option && styles.filterOptionSelected
              ]}
              onPress={() => onSelect(option)}
            >
              <Text style={[
                styles.filterOptionText,
                selected === option && styles.filterOptionTextSelected
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
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
          <View style={styles.headerLeft}>
            <Text style={styles.title}>Tutorials</Text>
            <Text style={styles.subtitle}>Learn proper form and techniques from fitness experts</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.videosCount}>
              <Text style={styles.videosCountNumber}>8</Text>
              <Text style={styles.videosCountText}>Videos</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search tutorials..."
              placeholderTextColor={Colors.textMuted}
            />
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filtersContainer}>
          {renderFilterSection('Categories', categories, selectedCategory, setSelectedCategory)}
          {renderFilterSection('Difficulty', difficulties, selectedDifficulty, setSelectedDifficulty)}
          {renderFilterSection('Instructors', instructors, selectedInstructor, setSelectedInstructor)}
        </View>

        {/* Featured Section */}
        {!searchQuery && selectedCategory === 'All' && selectedDifficulty === 'All' && selectedInstructor === 'All' && (
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>⭐ Popular This Week</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.featuredList}>
                {featuredTutorials.map(renderFeaturedCard)}
              </View>
            </ScrollView>
          </View>
        )}

        {/* Results */}
        <View style={styles.resultsSection}>
          <View style={styles.resultsHeader}>
            <Text style={styles.sectionTitle}>
              {searchQuery || selectedCategory !== 'All' || selectedDifficulty !== 'All' || selectedInstructor !== 'All'
                ? `${filteredTutorials.length} Results`
                : 'All Tutorials'}
            </Text>
            <TouchableOpacity style={styles.sortButton}>
              <Text style={styles.sortText}>Most Popular ⌄</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={filteredTutorials}
            renderItem={renderTutorialCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.tutorialRow}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.background,
  },
  headerLeft: {
    flex: 1,
    paddingRight: Spacing.lg,
    justifyContent: 'center',
  },
  headerRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 2,
    lineHeight: FontSizes.xxl + 4,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: FontSizes.md + 4,
  },
  videosCount: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary + '20',
  },
  videosCountNumber: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  videosCountText: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
  },
  
  // Search
  searchSection: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundTertiary,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  searchIcon: {
    fontSize: 18,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.md,
    color: Colors.text,
  },
  
  // Filters
  filtersContainer: {
    paddingVertical: Spacing.md,
    gap: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  filterSection: {
    gap: Spacing.sm,
  },
  filterTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.text,
    paddingHorizontal: Spacing.md,
  },
  filterOptions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  filterOption: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.backgroundTertiary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterOptionSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterOptionText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  filterOptionTextSelected: {
    color: Colors.text,
    fontWeight: '600',
  },
  
  // Featured
  featuredSection: {
    paddingVertical: Spacing.lg,
  },
  featuredList: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.md,
    alignItems: 'stretch', // Force equal height for cards
  },
  featuredCard: {
    width: width * 0.8,
    minHeight: 110,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginRight: Spacing.md, // spacing between cards
    backgroundColor: Colors.cardBackground,
  },
  featuredGradient: {
    flex: 1,
    minHeight: 110,
    justifyContent: 'space-between',
    padding: Spacing.lg,
  },
  featuredContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  featuredThumbnail: {
    fontSize: 48,
  },
  featuredInfo: {
    flex: 1,
  },
  featuredTitle: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  featuredInstructor: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  featuredMeta: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  featuredDuration: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
  featuredRating: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  
  // Results
  resultsSection: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sortButton: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  sortText: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  
  // Tutorial Cards
  tutorialRow: {
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  tutorialCard: {
    width: (width - 48) / 2,
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  thumbnailContainer: {
    position: 'relative',
    backgroundColor: Colors.backgroundTertiary,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    fontSize: 32,
  },
  durationBadge: {
    position: 'absolute',
    bottom: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: Colors.background + '80',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  durationText: {
    fontSize: FontSizes.xs,
    color: Colors.text,
    fontWeight: '600',
  },
  popularBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  popularText: {
    fontSize: FontSizes.xs,
    color: Colors.text,
    fontWeight: '600',
  },
  playButton: {
    position: 'absolute',
    backgroundColor: Colors.primary + '90',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    fontSize: 18,
  },
  
  // Tutorial Content
  tutorialContent: {
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  tutorialTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text,
    lineHeight: 20,
  },
  instructorName: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  tutorialMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  metaItem: {},
  difficultyBadge: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
  },
  difficultyBeginner: {
    backgroundColor: Colors.primary + '20',
    color: Colors.primary,
  },
  difficultyIntermediate: {
    backgroundColor: Colors.secondary + '20',
    color: Colors.secondary,
  },
  difficultyAdvanced: {
    backgroundColor: Colors.warning + '20',
    color: Colors.warning,
  },
  metaStats: {
    gap: Spacing.xs,
  },
  metaStat: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    textAlign: 'right',
  },
});

export default TutorialsScreen;
