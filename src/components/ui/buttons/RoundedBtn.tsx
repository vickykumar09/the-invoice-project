import { Pressable, StyleSheet, Text, View, } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { blue } from '@/constants/ui/color-palettes';

type Props = {
  variant: 'transparent' | 'outlined' | 'filled';
  title: string;
  icon: string;
  disabled?: boolean;
  onPress: () => void;
}

export default function RoundedBtn({ variant, title, icon, disabled, onPress }: Props) {
  return (
    <Pressable
      accessibilityLabel='hello'
      android_ripple={{ color: 'rgba(0,0,0,0.2)', borderless: true }}
      disabled={disabled}
      onPress={onPress}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.btnText}>{title}</Text>
        <FontAwesome name={icon as any} size={14} color={blue[6]}/>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16, 
    paddingVertical: 8,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: blue[6],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 12,
  },
  btnText: {
    fontFamily: "NunitoExtraBold",
    fontSize: 16,
    color: blue[6]
  }
})



// import React from 'react';
// import {
//   Pressable,
//   Text,
//   StyleSheet,
//   ViewStyle,
//   GestureResponderEvent,
//   ActivityIndicator,
//   Platform,
//   View,
// } from 'react-native';
// import { FontAwesome } from '@expo/vector-icons'

// type Props = {
//   title?: string;
//   onPress?: (e: GestureResponderEvent) => void;
//   variant?: 'primary' | 'secondary' | 'ghost';
//   disabled?: boolean;
//   loading?: boolean;
//   style?: ViewStyle | ViewStyle[];
//   testID?: string;
//   accessibilityLabel?: string;
//   radius?: number;
//   children?: React.ReactNode; // for icon + text composition
// };

// export default function RoundedPressableButton({
//   title,
//   onPress,
//   variant = 'primary',
//   disabled = false,
//   loading = false,
//   style,
//   testID,
//   accessibilityLabel,
//   radius = 999,
//   children,
// }: Props) {
//   const getVariantStyles = () => {
//     switch (variant) {
//       case 'secondary':
//         return {
//           button: styles.secondaryButton,
//           text: styles.secondaryText,
//         };
//       case 'ghost':
//         return {
//           button: styles.ghostButton,
//           text: styles.secondaryText,
//         };
//       case 'primary':
//       default:
//         return {
//           button: styles.primaryButton,
//           text: styles.primaryText,
//         };
//     }
//   };

//   const vstyles = getVariantStyles();

//   return (
//     <Pressable
//       testID={testID}
//       accessibilityLabel={accessibilityLabel ?? title}
//       accessibilityState={{ disabled: disabled || loading }}
//       android_ripple={Platform.OS === 'android' ? { color: 'rgba(0,0,0,0.08)' } : undefined}
//       disabled={disabled || loading}
//       onPress={onPress}
//       style={({ pressed }) => [
//         styles.base,
//         vstyles.button,
//         disabled ? styles.disabled : null,
//         pressed && !disabled ? styles.pressed : null,
//         { borderRadius: radius },
//         style,
//       ]}
//     >
//       <View style={styles.content} pointerEvents="none">
//         {loading ? (
//           <ActivityIndicator />
//         ) : children ? (
//           children
//         ) : (
//           <Text numberOfLines={1} style={[styles.label, vstyles.text]}>
//             {title}
//           </Text>
//         )}
//       </View>
//     </Pressable>
//   );
// }

// const styles = StyleSheet.create({
//   base: {
//     minHeight: 44,
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//     elevation: 0,
//   },
//   content: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   primaryButton: {
//     backgroundColor: '#2563EB', // blue-600
//   },
//   primaryText: {
//     color: '#FFFFFF',
//   },
//   secondaryButton: {
//     backgroundColor: '#E5E7EB', // gray-200
//   },
//   secondaryText: {
//     color: '#111827',
//   },
//   ghostButton: {
//     backgroundColor: 'transparent',
//     borderWidth: 1,
//     borderColor: '#D1D5DB',
//   },
//   pressed: {
//     opacity: 0.85,
//     transform: [{ scale: 0.995 }],
//   },
//   disabled: {
//     opacity: 0.55,
//   },
// });

// /*
// Usage examples:

// <RoundedPressableButton title="Save" onPress={() => {}} />

// <RoundedPressableButton variant="secondary" title="Cancel" onPress={() => {}} radius={24} />

// // With an icon + text composition
// <RoundedPressableButton onPress={() => {}}>
//   <Icon name="check" size={16} />
//   <View style={{ width: 8 }} />
//   <Text style={{ color: 'white', fontWeight: '600' }}>Done</Text>
// </RoundedPressableButton>

// */