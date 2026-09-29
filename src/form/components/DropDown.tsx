import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type DropdownOption<T> = {
  label: string;
  value: T;
};

type DropdownProps<T> = {
  value: T | null;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
};

export function Dropdown<T>({
  value,
  options,
  onChange,
  placeholder = 'Select',
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find(
    option => option.value === value
  );

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.trigger}
        onPress={() => setOpen(prev => !prev)}
      >
        <Text
          style={[
            styles.triggerText,
            !selectedOption && styles.placeholder,
          ]}
        >
          {selectedOption?.label ?? placeholder}
        </Text>

        <Text style={styles.arrow}>
          {open ? '⌃' : '⌄'}
        </Text>
      </Pressable>

      {open && (
        <View style={styles.dropdown}>
          {options.map(option => (
            <Pressable
              key={String(option.value)}
              style={[
                styles.option,
                option.value === value && styles.selectedOption,
              ]}
              onPress={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              <Text style={styles.optionText}>
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 10,
  },

  trigger: {
    height: 48,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },

  triggerText: {
    fontSize: 16,
  },

  placeholder: {
    color: '#999',
  },

  arrow: {
    fontSize: 18,
  },

  dropdown: {
    position: 'absolute',
    top: 52,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',

    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  option: {
    minHeight: 44,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },

  selectedOption: {
    backgroundColor: '#f2f2f2',
  },

  optionText: {
    fontSize: 16,
  },
});