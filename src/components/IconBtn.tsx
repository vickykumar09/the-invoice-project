import { Pressable, StyleSheet } from "react-native";
import type { ComponentType } from "react";

type IconBtnProps = {
  icon: ComponentType<any>;
  name: string;
  size?: number;
  color?: string;
  onPress: () => void;
};

export default function IconBtn({
  icon: Icon,
  name,
  size = 24,
  color = "black",
  onPress,
}: IconBtnProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
      ]}
    >
      <Icon
        name={name}
        size={size}
        color={color}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.2,
  },
})