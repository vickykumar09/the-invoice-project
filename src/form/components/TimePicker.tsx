import IconBtn from "@/components/IconBtn";
import { gray } from "@/constants/color-palettes";
import inputStyles from "@/styles/inputStyles";
import { dateToTime, formatTime, timeToDate } from "@/utils/date-time/format";
import { FontAwesome5 } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

type Props = {
  value: string;
  onChange: (time: string) => void;
};

/**
 * A time picker that stores selected time as an `HH:mm` string.
 *
 * Displays the stored time in 12-hour AM/PM format and uses the
 * current time as the initial picker value when no time is selected.
 */

export default function TimePicker({ value, onChange }: Props) {
  const [show, setShow] = useState<boolean>(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate) {
      const time = dateToTime(selectedDate);
      onChange(time);
    }
    setShow(false);
  };

  return (
    <>
      <View style={styles.container}>
        {value ? (
          <Text style={styles.valueTxt}>{formatTime(value)}</Text>
        ) : (
          <Text style={styles.placeholderTxt}>Select Time</Text>
        )}

        <View style={inputStyles.iconWrapper}>
          <IconBtn
            icon={FontAwesome5}
            name="clock"
            onPress={() => setShow(true)}
          />
        </View>
      </View>

      {/* Modal To Pick Time */}
      {show && (
        <DateTimePicker
          mode="time"
          value={value ? timeToDate(value) : new Date()}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleChange}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: gray[2],
    backgroundColor: gray[0],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  valueTxt: {
    fontSize: 15,
    padding: 12,
  },
  placeholderTxt: {
    fontSize: 15,
    padding: 12,
    color: gray[5],
  },
});
