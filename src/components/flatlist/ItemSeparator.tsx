import { gray } from "@/constants/color-palettes";
import { StyleProp, View, ViewStyle } from "react-native";

type Props = {
  style?: StyleProp<ViewStyle>;
};

export default function ItemSeparator({ style }: Props) {
  return (
    <View
      style={[
        {
          height: 2,
          backgroundColor: gray[1],
        },
        style,
      ]}
    />
  );
}
