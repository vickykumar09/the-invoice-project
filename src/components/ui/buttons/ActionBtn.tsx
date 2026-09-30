import React, { ComponentType } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Feather, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { green } from '@/constants/color-palettes';

type BtnProps = {
  variant?: 'ghost' | 'outlined' | 'filled';
  shape?: 'squared' | 'rounded' | 'circle';
  backgroundColor: string;
  borderColor: string;
  disabled: boolean;
  onPress: () => void;
}

type IconProps = {
  icon: ComponentType<any>;
  name: string;
  size?: number;
  color?: string;
}

type LabelProps = {
  label: string;
  size: number;
  color: string;
}

type ActionBtnProps = {
  variant?: 'ghost' | 'outlined' | 'filled';
  shape?: 'squared' | 'rounded' | 'circle';
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
    paddingHorizontal: 24,
    paddingVertical: 12,
    iconSize: 20,
    fontSize: 15,
  },
  large: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    iconSize: 18,
    fontSize: 18,
  },
}

const shapeStyles = {
  squared: {
    borderRadius: 8
  },
  rounded: {
    borderRadius: 99
  }

}

const variantStyles = {
  ghost: {
    borderWidth: 0,
  },
  outlined: {
    borderWidth: 1.5,
    paddingHorizontal: 24,
    paddingVertical: 12
  },
  filled: {
    borderWidth: 0,
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
  const backgroundColor = isFilled ? color : green[0];
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
    borderRadius: 99,
    overflow: 'hidden',
    borderWidth: 1,
    backgroundColor: green[4]
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6
  },
  pressed: {
    opacity: 0.7
  },
  btnLabel: {
    fontFamily: 'NunitoExtraBold'
  }
})