export const Routes = {
  // Auth screens
  LANDING: 'Landing',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  
  // Main app screens
  MAIN_TABS: 'MainTabs',
  DASHBOARD: 'Dashboard',
  GYM_SESSION: 'GymSession',
  DIET: 'Diet',
  ANALYTICS: 'Analytics',
  AI_CHATBOT: 'AIChatbot',
  WORKOUT_PLAN: 'WorkoutPlan',
  COMMUNITY_FORUM: 'CommunityForum',
  FRIENDS: 'Friends',
  TUTORIALS: 'Tutorials',
  SETTINGS: 'Settings',
  
  // Legacy routes (keeping for compatibility)
  HOME: 'Home',
  PROFILE: 'Profile',
} as const;

export type RootStackParamList = {
  [Routes.LANDING]: undefined;
  [Routes.LOGIN]: undefined;
  [Routes.SIGNUP]: undefined;
  [Routes.MAIN_TABS]: undefined;
  [Routes.DASHBOARD]: undefined;
  [Routes.GYM_SESSION]: undefined;
  [Routes.DIET]: undefined;
  [Routes.ANALYTICS]: undefined;
  [Routes.AI_CHATBOT]: undefined;
  [Routes.WORKOUT_PLAN]: undefined;
  [Routes.COMMUNITY_FORUM]: undefined;
  [Routes.FRIENDS]: undefined;
  [Routes.TUTORIALS]: undefined;
  [Routes.SETTINGS]: undefined;
  [Routes.HOME]: undefined;
  [Routes.PROFILE]: undefined;
};

export type DrawerParamList = {
  [Routes.DASHBOARD]: undefined;
  [Routes.GYM_SESSION]: undefined;
  [Routes.DIET]: undefined;
  [Routes.ANALYTICS]: undefined;
  [Routes.AI_CHATBOT]: undefined;
  [Routes.WORKOUT_PLAN]: undefined;
  [Routes.COMMUNITY_FORUM]: undefined;
  [Routes.FRIENDS]: undefined;
  [Routes.TUTORIALS]: undefined;
  [Routes.SETTINGS]: undefined;
};

// Legacy - keeping for compatibility
export type MainTabsParamList = {
  [Routes.DASHBOARD]: undefined;
  [Routes.GYM_SESSION]: undefined;
  [Routes.TUTORIALS]: undefined;
  [Routes.DIET]: undefined;
  [Routes.AI_CHATBOT]: undefined;
};
