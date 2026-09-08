import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';

type PillBtnProps = {
  variant?: 'outlined' | 'filled';
  size?: 'small' | 'medium' | 'large'; 
  disabled?: boolean;
  iconName: keyof typeof Feather.glyphMap;
  btnLabel?: string;
  rippleColor: string;
  color: string;
  onPress: () => void;
}

export default function PillBtn({
  variant = 'outlined',
  size = 'large',
  disabled,
  iconName,
  btnLabel,
  rippleColor,
  color,
  onPress
}: PillBtnProps) {
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
    fontFamily: 'NunitoBold'
  }
})