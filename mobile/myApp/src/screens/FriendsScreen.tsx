import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants';
import Card from '../components/Card';
import Button from '../components/Button';

const FriendsScreen: React.FC = () => {
  const friends = [
    {
      id: 1,
      name: 'Mike Johnson',
      username: '@mikefitness',
      avatar: 'MJ',
      status: 'online',
      lastWorkout: '2h ago',
      streak: 15,
      mutualFriends: 3,
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      username: '@sarahstrong',
      avatar: 'SW',
      status: 'online',
      lastWorkout: '4h ago',
      streak: 8,
      mutualFriends: 7,
    },
    {
      id: 3,
      name: 'David Chen',
      username: '@davidlifts',
      avatar: 'DC',
      status: 'offline',
      lastWorkout: '1d ago',
      streak: 22,
      mutualFriends: 2,
    },
    {
      id: 4,
      name: 'Emma Davis',
      username: '@emmafit',
      avatar: 'ED',
      status: 'online',
      lastWorkout: '30min ago',
      streak: 12,
      mutualFriends: 5,
    },
  ];

  const friendRequests = [
    {
      id: 1,
      name: 'Alex Thompson',
      username: '@alexworkout',
      avatar: 'AT',
      mutualFriends: 8,
    },
    {
      id: 2,
      name: 'Lisa Rodriguez',
      username: '@lisafit',
      avatar: 'LR',
      mutualFriends: 4,
    },
  ];

  const renderFriend = (friend: any) => (
    <TouchableOpacity key={friend.id} style={styles.friendCard}>
      <Card style={styles.friendContent}>
        <View style={styles.friendHeader}>
          <View style={styles.friendAvatarContainer}>
            <View style={styles.friendAvatar}>
              <Text style={styles.friendAvatarText}>{friend.avatar}</Text>
            </View>
            <View style={[
              styles.statusIndicator,
              { backgroundColor: friend.status === 'online' ? Colors.success : Colors.textMuted }
            ]} />
          </View>
          <View style={styles.friendInfo}>
            <Text style={styles.friendName}>{friend.name}</Text>
            <Text style={styles.friendUsername}>{friend.username}</Text>
            <Text style={styles.friendActivity}>
              Last workout: {friend.lastWorkout}
            </Text>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-horizontal" size={20} color={Colors.textMuted} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.friendStats}>
          <View style={styles.friendStat}>
            <Text style={styles.friendStatNumber}>{friend.streak}</Text>
            <Text style={styles.friendStatLabel}>Day Streak</Text>
          </View>
          <View style={styles.friendStat}>
            <Text style={styles.friendStatNumber}>{friend.mutualFriends}</Text>
            <Text style={styles.friendStatLabel}>Mutual Friends</Text>
          </View>
          <Button
            title="Message"
            onPress={() => console.log(`Messaging ${friend.name}`)}
            variant="outline"
            size="small"
            style={styles.messageButton}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );

  const renderFriendRequest = (request: any) => (
    <Card key={request.id} style={styles.requestCard}>
      <View style={styles.requestContent}>
        <View style={styles.requestInfo}>
          <View style={styles.friendAvatar}>
            <Text style={styles.friendAvatarText}>{request.avatar}</Text>
          </View>
          <View style={styles.requestDetails}>
            <Text style={styles.friendName}>{request.name}</Text>
            <Text style={styles.friendUsername}>{request.username}</Text>
            <Text style={styles.mutualFriends}>
              {request.mutualFriends} mutual friends
            </Text>
          </View>
        </View>
        <View style={styles.requestActions}>
          <TouchableOpacity style={styles.acceptButton}>
            <Ionicons name="checkmark" size={16} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.declineButton}>
            <Ionicons name="close" size={16} color={Colors.text} />
          </TouchableOpacity>
        </View>
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
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.headerTitle}>Friends</Text>
              <Text style={styles.headerSubtitle}>
                Stay connected with your fitness community
              </Text>
            </View>
            <TouchableOpacity style={styles.addFriendButton}>
              <Ionicons name="person-add" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={Colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search friends..."
              placeholderTextColor={Colors.textMuted}
            />
          </View>
        </View>

        {/* Friend Requests */}
        {friendRequests.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Friend Requests ({friendRequests.length})
            </Text>
            {friendRequests.map(renderFriendRequest)}
          </View>
        )}

        {/* Online Friends */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Online Now ({friends.filter(f => f.status === 'online').length})
          </Text>
          {friends.filter(f => f.status === 'online').map(renderFriend)}
        </View>

        {/* All Friends */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Friends ({friends.length})</Text>
          {friends.map(renderFriend)}
        </View>

        {/* Suggested Friends */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suggested for You</Text>
          <Card style={styles.suggestedCard}>
            <View style={styles.suggestedContent}>
              <Ionicons name="people" size={32} color={Colors.primary} />
              <Text style={styles.suggestedTitle}>Find More Friends</Text>
              <Text style={styles.suggestedDescription}>
                Connect with people based on your interests and workout preferences
              </Text>
              <Button
                title="Discover Friends"
                onPress={() => console.log('Discovering friends')}
                variant="primary"
                size="medium"
              />
            </View>
          </Card>
        </View>

        {/* Leaderboard Preview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Weekly Leaderboard</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <Card style={styles.leaderboardCard}>
            {friends.slice(0, 3).map((friend, index) => (
              <View key={friend.id} style={styles.leaderboardItem}>
                <View style={styles.leaderboardRank}>
                  <Text style={styles.rankNumber}>{index + 1}</Text>
                </View>
                <View style={styles.friendAvatar}>
                  <Text style={styles.friendAvatarText}>{friend.avatar}</Text>
                </View>
                <View style={styles.leaderboardInfo}>
                  <Text style={styles.friendName}>{friend.name}</Text>
                  <Text style={styles.leaderboardScore}>
                    {friend.streak * 50} points
                  </Text>
                </View>
                {index === 0 && (
                  <Ionicons name="trophy" size={20} color={Colors.warning} />
                )}
              </View>
            ))}
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
  addFriendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.md,
    color: Colors.text,
    marginLeft: Spacing.sm,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
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
    marginBottom: Spacing.md,
  },
  viewAllText: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    fontWeight: '500',
  },
  friendCard: {
    marginBottom: Spacing.md,
  },
  friendContent: {
    padding: Spacing.md,
  },
  friendHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  friendAvatarContainer: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  friendAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  friendAvatarText: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.text,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.backgroundSecondary,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  friendUsername: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  friendActivity: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
  },
  moreButton: {
    padding: Spacing.xs,
  },
  friendStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  friendStat: {
    alignItems: 'center',
  },
  friendStatNumber: {
    fontSize: FontSizes.md,
    fontWeight: 'bold',
    color: Colors.text,
  },
  friendStatLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  messageButton: {
    marginLeft: 'auto',
  },
  requestCard: {
    marginBottom: Spacing.md,
    padding: Spacing.md,
  },
  requestContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  requestInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  requestDetails: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  mutualFriends: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },
  requestActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  acceptButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggestedCard: {
    alignItems: 'center',
    padding: Spacing.xl,
  },
  suggestedContent: {
    alignItems: 'center',
  },
  suggestedTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  suggestedDescription: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  leaderboardCard: {
    gap: Spacing.md,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leaderboardRank: {
    width: 24,
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  rankNumber: {
    fontSize: FontSizes.md,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  leaderboardInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  leaderboardScore: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});

export default FriendsScreen;
