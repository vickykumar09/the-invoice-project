import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons';

type ActionBtnProps = {
  variant?: 'outlined' | 'filled';
  size?: 'small' | 'medium' | 'large'; 
  disabled?: boolean;
  iconName: keyof typeof Feather.glyphMap;
  btnLabel?: string;
  rippleColor: string;
  color: string;
  onPress: () => void;
}

const sizeStyles = {
  small: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    iconSize: 16,
    fontSize: 14,
  },
  medium: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    iconSize: 20,
    fontSize: 15,
  },
  large: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    iconSize: 24,
    fontSize: 16,
  },
}

const variantStyles = {
  filled: {
    borderWidth: 0,
  },
  outlined: {
    borderWidth: 1,
  },
};

export default function ActionBtn({
  variant = 'outlined',
  size = 'large',
  disabled,
  iconName,
  btnLabel,
  rippleColor,
  color,
  onPress
}: ActionBtnProps) {

  const isFilled = variant === 'filled';
  const backgroundColor = isFilled ? color : '#fff';
  const contentColor = isFilled ? '#fff' : color;

  const { iconSize, fontSize, paddingHorizontal, paddingVertical } = sizeStyles[size];
  const borderWidth = variantStyles[variant]
  return (
    <View style={[styles.container, borderWidth, { borderColor: color }]}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
        android_ripple={{ color: rippleColor }}

        style={({ pressed }) => [
          styles.pressable,
          { backgroundColor: backgroundColor, paddingHorizontal: paddingHorizontal, paddingVertical: paddingVertical },
          pressed && styles.pressed
        ]}
      >
        <Feather name={iconName} size={iconSize} color={contentColor}/>
        <Text style={[styles.btnLabel, {color: contentColor, fontSize: fontSize}]}>{btnLabel}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  pressed: {
    opacity: 0.7
  },
  btnLabel: {
    fontFamily: 'NunitoExtraBold'
  }
})