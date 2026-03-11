export const Colors = {
  // Primary accent - Modern green with better contrast
  primary: '#10B981', // Emerald green - more professional than neon
  primaryDark: '#059669',
  primaryLight: '#34D399',
  
  // Secondary accent - Modern blue/purple
  secondary: '#8B5CF6', // Violet - pairs well with green
  secondaryDark: '#7C3AED',
  secondaryLight: '#A78BFA',
  
  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Dark theme background colors - Better hierarchy
  background: '#0F0F0F', // True black for OLED-friendly
  backgroundSecondary: '#1A1A1A', // Dark gray for cards
  backgroundTertiary: '#262626', // Lighter gray for elevated surfaces
  cardBackground: '#1A1A1A', // Cards same as secondary
  surface: '#262626', // Interactive surfaces
  
  // Text colors with better contrast
  text: '#FFFFFF', // Pure white for primary text
  textSecondary: '#D1D5DB', // Light gray for secondary text
  textMuted: '#9CA3AF', // Muted gray for tertiary text
  textDark: '#6B7280', // Even more muted
  
  // Border colors
  border: '#374151', // Subtle gray border
  borderLight: '#4B5563', // Lighter border
  borderFocus: '#10B981', // Primary color for focused elements
  
  // Button colors
  buttonPrimary: '#10B981',
  buttonSecondary: '#8B5CF6',
  buttonDanger: '#EF4444',
  buttonGhost: 'transparent',
  
  // Other
  transparent: 'transparent',
  shadow: 'rgba(0, 0, 0, 0.25)',
  shadowLight: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Gradients
  gradientStart: '#10B981',
  gradientEnd: '#8B5CF6',
  gradientDark: '#0F0F0F',
  gradientLight: '#1A1A1A',
  
  // Special colors
  accent: '#10B981', // Same as primary for consistency
  highlight: '#10B98120', // Primary with opacity
  divider: '#374151',
} as const;
