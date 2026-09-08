import { gray } from "@/constants/color-palettes";
import inputStyles from "@/styles/inputStyles";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  label: string;
  value: string;
  minValue: number;
  maxValue: number;
  step: number;
  onChange: (value: string) => void;
};

export default function AppSlider({
  label,
  value,
  minValue,
  maxValue,
  step,
  onChange,
}: Props) {
  const [isSliding, setIsSliding] = useState<boolean>(false);
  const [localValue, setLocalValue] = useState<number>();

  return (
    <View>
      <View style={styles.container}>
        {isSliding && <Text style={styles.localValue}>{localValue}</Text>}
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 12,
            }}
          >
            <Text style={styles.minMaxValueTxt}>{minValue}</Text>
            <Slider
              style={{ flex: 1 }}
              value={Number(value)}
              minimumValue={minValue}
              maximumValue={maxValue}
              step={step}
              minimumTrackTintColor={gray[9]}
              maximumTrackTintColor={gray[4]}
              thumbTintColor={gray[9]}
              onValueChange={(value) => setLocalValue(value)}
              onSlidingStart={() => setIsSliding(true)}
              onSlidingComplete={(value) => {
                setIsSliding(false);
                onChange(String(value));
              }}
            />
            <Text style={styles.minMaxValueTxt}>{maxValue}</Text>
          </View>
          <TextInput
            placeholder={`Enter ${label.toLowerCase()}`}
            keyboardType="numeric"
            value={value}
            onChangeText={(text) => onChange(text)}
            style={[
              inputStyles.inputContainer,
              { width: "40%", textAlign: "center" },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  localValue: {
    position: "absolute",
    top: -15,
    left: "50%",
    backgroundColor: gray[2],
    padding: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  iconWrapper: {
    flex: 1,
    minWidth: 50,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    backgroundColor: gray[1],
    borderLeftWidth: 1.5,
    borderLeftColor: gray[2],
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    borderRadius: 8,
    fontSize: 20,
    fontWeight: 600,
  },
  minMaxValueTxt: {
    marginBottom: 2,
    color: gray[6],
  },
});
