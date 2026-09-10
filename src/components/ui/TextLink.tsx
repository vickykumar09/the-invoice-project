import { blue } from "@/constants/color-palettes";
import { StyleSheet, Text } from "react-native";

type Props = {
  text: string;
  onPress: () => void;
  size?: number;
  color?: string;
};

export default function TextLink({
  text,
  onPress,
  size,
  color = blue[7],
}: Props) {
  return (
    <>
      <Text
        onPress={onPress}
        style={[styles.text, { color: color, fontSize: size }]}
      >
        {text}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "RajdhaniBold",
  },
});
