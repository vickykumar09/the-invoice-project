import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { blue } from '@/constants/ui/color-palettes';

type Props = {
  text: string;
  onPress: () => void;
  size?: number;
  color?: string;
}

export default function TextLink({
  text,
  onPress,
  size,
  color = blue[7]
}: Props) {
  return (
    <>
      <Text
        onPress={onPress} 
        style={[styles.text, {color: color, fontSize: size }]}
      >
        {text}
      </Text>
    </>
  )
}

const styles = StyleSheet.create({
  text:  {
    fontFamily: 'RajdhaniBold',
  }
})