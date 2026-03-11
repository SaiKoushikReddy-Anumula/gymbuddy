import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants';
import Card from '../components/Card';
import Button from '../components/Button';

const CommunityForumScreen: React.FC = () => {
  const forumCategories = [
    {
      id: 1,
      title: 'General Discussion',
      description: 'General fitness and lifestyle topics',
      posts: 1247,
      members: 2340,
      icon: 'chatbubbles',
      color: Colors.primary,
    },
    {
      id: 2,
      title: 'Workout Routines',
      description: 'Share and discuss workout plans',
      posts: 856,
      members: 1890,
      icon: 'fitness',
      color: Colors.secondary,
    },
    {
      id: 3,
      title: 'Nutrition & Diet',
      description: 'Healthy eating and nutrition advice',
      posts: 723,
      members: 1560,
      icon: 'nutrition',
      color: Colors.info,
    },
    {
      id: 4,
      title: 'Progress Photos',
      description: 'Share your transformation journey',
      posts: 432,
      members: 980,
      icon: 'images',
      color: Colors.warning,
    },
  ];

  const recentPosts = [
    {
      id: 1,
      title: 'Need help with my deadlift form',
      author: 'FitnessNewbie23',
      category: 'Workout Routines',
      replies: 12,
      likes: 25,
      timeAgo: '2h ago',
      avatar: 'FN',
    },
    {
      id: 2,
      title: 'Amazing results after 3 months!',
      author: 'TransformationGuy',
      category: 'Progress Photos',
      replies: 8,
      likes: 45,
      timeAgo: '4h ago',
      avatar: 'TG',
    },
    {
      id: 3,
      title: 'Best pre-workout meals?',
      author: 'HealthyEater',
      category: 'Nutrition & Diet',
      replies: 15,
      likes: 18,
      timeAgo: '6h ago',
      avatar: 'HE',
    },
  ];

  const renderCategory = (category: any) => (
    <TouchableOpacity key={category.id} style={styles.categoryCard}>
      <Card style={styles.categoryContent} variant="elevated">
        <View style={styles.categoryHeader}>
          <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
            <Ionicons name={category.icon as any} size={24} color={category.color} />
          </View>
          <View style={styles.categoryInfo}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <Text style={styles.categoryDescription}>{category.description}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
        </View>
        <View style={styles.categoryStats}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{category.posts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{category.members}</Text>
            <Text style={styles.statLabel}>Members</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  const renderPost = (post: any) => (
    <TouchableOpacity key={post.id} style={styles.postCard}>
      <Card style={styles.postContent}>
        <View style={styles.postHeader}>
          <View style={styles.postAvatar}>
            <Text style={styles.postAvatarText}>{post.avatar}</Text>
          </View>
          <View style={styles.postInfo}>
            <Text style={styles.postTitle} numberOfLines={2}>
              {post.title}
            </Text>
            <View style={styles.postMeta}>
              <Text style={styles.postAuthor}>{post.author}</Text>
              <Text style={styles.postCategory}> • {post.category}</Text>
              <Text style={styles.postTime}> • {post.timeAgo}</Text>
            </View>
          </View>
        </View>
        <View style={styles.postStats}>
          <View style={styles.postStat}>
            <Ionicons name="chatbubble-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.postStatText}>{post.replies}</Text>
          </View>
          <View style={styles.postStat}>
            <Ionicons name="heart-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.postStatText}>{post.likes}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[Colors.background, Colors.backgroundSecondary]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.headerTitle}>Community Forum</Text>
              <Text style={styles.headerSubtitle}>
                Connect with fellow fitness enthusiasts
              </Text>
            </View>
            <Button
              title="New Post"
              onPress={() => console.log('Creating new post')}
              variant="primary"
              size="small"
              icon={<Ionicons name="add" size={16} color={Colors.text} />}
            />
          </View>
        </LinearGradient>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <Card style={styles.statsCard} variant="elevated">
            <View style={styles.statsRow}>
              <View style={styles.quickStat}>
                <Text style={styles.quickStatNumber}>4.2K</Text>
                <Text style={styles.quickStatLabel}>Members</Text>
              </View>
              <View style={styles.quickStat}>
                <Text style={styles.quickStatNumber}>15.6K</Text>
                <Text style={styles.quickStatLabel}>Posts</Text>
              </View>
              <View style={styles.quickStat}>
                <Text style={styles.quickStatNumber}>89</Text>
                <Text style={styles.quickStatLabel}>Online</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          {forumCategories.map(renderCategory)}
        </View>

        {/* Recent Posts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Posts</Text>
          {recentPosts.map(renderPost)}
          
          <Button
            title="View All Posts"
            onPress={() => console.log('Viewing all posts')}
            variant="outline"
            fullWidth
            style={styles.viewAllButton}
          />
        </View>

        {/* Rules Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Community Guidelines</Text>
          <Card style={styles.rulesCard}>
            <View style={styles.rule}>
              <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
              <Text style={styles.ruleText}>Be respectful and supportive</Text>
            </View>
            <View style={styles.rule}>
              <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
              <Text style={styles.ruleText}>No spam or self-promotion</Text>
            </View>
            <View style={styles.rule}>
              <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
              <Text style={styles.ruleText}>Share accurate fitness information</Text>
            </View>
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  quickStats: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  statsCard: {
    padding: Spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickStat: {
    alignItems: 'center',
  },
  quickStatNumber: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  quickStatLabel: {
    fontSize: FontSizes.sm,
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
  categoryCard: {
    marginBottom: Spacing.md,
  },
  categoryContent: {
    padding: Spacing.md,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  categoryDescription: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  categoryStats: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: FontSizes.md,
    fontWeight: 'bold',
    color: Colors.text,
  },
  statLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  postCard: {
    marginBottom: Spacing.md,
  },
  postContent: {
    padding: Spacing.md,
  },
  postHeader: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  postAvatarText: {
    fontSize: FontSizes.sm,
    fontWeight: 'bold',
    color: Colors.text,
  },
  postInfo: {
    flex: 1,
  },
  postTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  postMeta: {
    flexDirection: 'row',
  },
  postAuthor: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  postCategory: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
  },
  postTime: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
  },
  postStats: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  postStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postStatText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
  },
  viewAllButton: {
    marginTop: Spacing.md,
  },
  rulesCard: {
    gap: Spacing.md,
  },
  rule: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ruleText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginLeft: Spacing.sm,
  },
});

export default CommunityForumScreen;
