import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

type Props = {
  label: string;
  onPress: () => void;
}

export default function GradientBtn({label, onPress}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ marginTop: 16 }}
    >
      <LinearGradient
        colors={['#7F00FF', '#E100FF']}
        style={{
          paddingVertical: 14,
          borderRadius: 12,
          alignItems: 'center'
        }}
      >
        <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})