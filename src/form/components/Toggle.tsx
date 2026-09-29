import { blue, gray } from '@/constants/color-palettes';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type ToggleOption<T> = {
  label: string;
  value: T;
};

type ToggleProps<T> = {
  value: T;
  options: ToggleOption<T>[];
  onChange: (value: T) => void;
};

export function Toggle<T>({
  value,
  options,
  onChange,
}: ToggleProps<T>) {
  const currentIndex = options.findIndex(
    option => option.value === value
  );

  const handlePress = () => {
    const nextIndex =
      currentIndex === -1
        ? 0
        : (currentIndex + 1) % options.length;

    onChange(options[nextIndex].value);
  };

  const currentOption = options[currentIndex];

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Text style={styles.label}>
        {currentOption?.label ?? options[0]?.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 70,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: gray[2],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: gray[0],
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: blue[7],
  },
});