import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, BorderRadius, Spacing } from '../constants';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  shadow?: boolean;
  variant?: 'default' | 'elevated' | 'outlined';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  style, 
  padding = Spacing.md,
  shadow = true,
  variant = 'default'
}) => {
  const cardStyles = [
    styles.card,
    styles[variant],
    { padding }, 
    shadow && styles.shadow,
    style
  ];

  return (
    <View style={cardStyles}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
  },
  default: {
    backgroundColor: Colors.backgroundSecondary,
  },
  elevated: {
    backgroundColor: Colors.backgroundTertiary,
  },
  outlined: {
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  shadow: {
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
});

export default Card;
