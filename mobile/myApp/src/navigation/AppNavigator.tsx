import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import { Routes, RootStackParamList, DrawerParamList } from './routes';
import { Colors, Spacing, FontSizes } from '../constants';

// Import screens
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import DashboardScreen from '../screens/DashboardScreen';
import GymSessionScreen from '../screens/GymSessionScreen';
import DietScreen from '../screens/DietScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import AIChatbotScreen from '../screens/AIChatbotScreen';
import TutorialsScreen from '../screens/TutorialsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WorkoutPlanScreen from '../screens/WorkoutPlanScreen';
import CommunityForumScreen from '../screens/CommunityForumScreen';
import FriendsScreen from '../screens/FriendsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

interface MenuItemProps {
  icon: string;
  label: string;
  route: string;
  isActive: boolean;
  onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, route, isActive, onPress }) => (
  <TouchableOpacity
    style={[styles.menuItem, isActive && styles.menuItemActive]}
    onPress={onPress}
  >
    <View style={styles.menuItemIcon}>
      <Ionicons 
        name={icon as any} 
        size={22} 
        color={isActive ? Colors.primary : Colors.textSecondary} 
      />
    </View>
    <Text style={[styles.menuItemText, isActive && styles.menuItemTextActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const currentRoute = props.state.routes[props.state.index].name;
  
  const menuItems = [
    { icon: 'home', label: 'Dashboard', route: Routes.DASHBOARD },
    { icon: 'fitness', label: 'Gym Session', route: Routes.GYM_SESSION },
    { icon: 'nutrition', label: 'Diet', route: Routes.DIET },
    { icon: 'analytics', label: 'Analytics', route: Routes.ANALYTICS },
    { icon: 'chatbubble-ellipses', label: 'AI Chatbot', route: Routes.AI_CHATBOT },
    { icon: 'calendar', label: 'Workout Plan', route: Routes.WORKOUT_PLAN },
    { icon: 'people', label: 'Community Forum', route: Routes.COMMUNITY_FORUM },
    { icon: 'person-add', label: 'Friends', route: Routes.FRIENDS },
    { icon: 'school', label: 'Tutorials', route: Routes.TUTORIALS },
    { icon: 'settings', label: 'Settings', route: Routes.SETTINGS },
  ];

  return (
    <View style={styles.drawerContainer}>
      <SafeAreaView style={styles.drawerContent}>
        {/* Header */}
        <View style={styles.drawerHeader}>
          <Text style={styles.appTitle}>GymBuddy</Text>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => props.navigation.closeDrawer()}
          >
            <Ionicons name="chevron-back" size={24} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>JD</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
          </View>
        </View>

        {/* Menu Items */}
        <DrawerContentScrollView {...props} contentContainerStyle={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              label={item.label}
              route={item.route}
              isActive={currentRoute === item.route}
              onPress={() => {
                props.navigation.navigate(item.route);
              }}
            />
          ))}
        </DrawerContentScrollView>

        {/* Footer */}
        <View style={styles.drawerFooter}>
          <TouchableOpacity style={styles.logoutButton}>
            <Ionicons name="log-out" size={20} color={Colors.error} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors.backgroundSecondary,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: Colors.border,
        },
        headerTintColor: Colors.text,
        headerTitleStyle: {
          fontSize: FontSizes.lg,
          fontWeight: '600',
        },
        drawerStyle: {
          backgroundColor: Colors.background,
          width: 300,
        },
      }}
    >
      <Drawer.Screen 
        name={Routes.DASHBOARD}
        component={DashboardScreen as any}
        options={({ navigation }) => ({
          title: 'Dashboard',
          headerLeft: () => (
            <TouchableOpacity style={styles.headerMenuButton} onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu" size={24} color={Colors.text} />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen 
        name={Routes.GYM_SESSION}
        component={GymSessionScreen as any}
        options={({ navigation }) => ({
          title: 'Gym Session',
          headerLeft: () => (
            <TouchableOpacity style={styles.headerMenuButton} onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu" size={24} color={Colors.text} />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen 
        name={Routes.DIET}
        component={DietScreen as any}
        options={({ navigation }) => ({
          title: 'Diet Tracking',
          headerLeft: () => (
            <TouchableOpacity style={styles.headerMenuButton} onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu" size={24} color={Colors.text} />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen 
        name={Routes.ANALYTICS}
        component={AnalyticsScreen as any}
        options={({ navigation }) => ({
          title: 'Analytics',
          headerLeft: () => (
            <TouchableOpacity style={styles.headerMenuButton} onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu" size={24} color={Colors.text} />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen 
        name={Routes.AI_CHATBOT}
        component={AIChatbotScreen as any}
        options={({ navigation }) => ({
          title: 'AI Chatbot',
          headerLeft: () => (
            <TouchableOpacity style={styles.headerMenuButton} onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu" size={24} color={Colors.text} />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen 
        name={Routes.WORKOUT_PLAN}
        component={WorkoutPlanScreen}
        options={({ navigation }) => ({
          title: 'Workout Plans',
          headerLeft: () => (
            <TouchableOpacity style={styles.headerMenuButton} onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu" size={24} color={Colors.text} />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen 
        name={Routes.COMMUNITY_FORUM}
        component={CommunityForumScreen}
        options={({ navigation }) => ({
          title: 'Community',
          headerLeft: () => (
            <TouchableOpacity style={styles.headerMenuButton} onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu" size={24} color={Colors.text} />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen 
        name={Routes.FRIENDS}
        component={FriendsScreen}
        options={({ navigation }) => ({
          title: 'Friends',
          headerLeft: () => (
            <TouchableOpacity style={styles.headerMenuButton} onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu" size={24} color={Colors.text} />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen 
        name={Routes.TUTORIALS}
        component={TutorialsScreen as any}
        options={({ navigation }) => ({
          title: 'Tutorials',
          headerLeft: () => (
            <TouchableOpacity style={styles.headerMenuButton} onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu" size={24} color={Colors.text} />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen 
        name={Routes.SETTINGS}
        component={SettingsScreen as any}
        options={({ navigation }) => ({
          title: 'Settings',
          headerLeft: () => (
            <TouchableOpacity style={styles.headerMenuButton} onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu" size={24} color={Colors.text} />
            </TouchableOpacity>
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Routes.LANDING}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name={Routes.LANDING} 
          component={LandingScreen}
        />
        <Stack.Screen 
          name={Routes.LOGIN} 
          component={LoginScreen}
        />
        <Stack.Screen 
          name={Routes.SIGNUP} 
          component={SignupScreen}
        />
        <Stack.Screen 
          name={Routes.MAIN_TABS} 
          component={DrawerNavigator}
        />
        {/* Legacy routes - keeping for compatibility */}
        <Stack.Screen 
          name={Routes.HOME} 
          component={HomeScreen}
        />
        <Stack.Screen 
          name={Routes.PROFILE} 
          component={ProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  drawerContent: {
    flex: 1,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  appTitle: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  closeButton: {
    padding: Spacing.sm,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  profileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  profileAvatarText: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.backgroundSecondary,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  menuContainer: {
    paddingVertical: Spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    marginHorizontal: Spacing.sm,
    borderRadius: 12,
    marginBottom: 2,
  },
  menuItemActive: {
    backgroundColor: Colors.primary + '20',
  },
  menuItemIcon: {
    width: 28,
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  menuItemText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  menuItemTextActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  logoutText: {
    fontSize: FontSizes.md,
    color: Colors.error,
    marginLeft: Spacing.sm,
    fontWeight: '500',
  },
  headerMenuButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
});

export default AppNavigator;
