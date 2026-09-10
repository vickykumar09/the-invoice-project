import IconBtn from "@/components/IconBtn";
import { gray } from "@/constants/color-palettes";
import { toDateString } from "@/utils/date-time/convert";
import { formatDateString } from "@/utils/date-time/format";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

type Props = {
  value: string;
  minimumDate?: Date;
  maximumDate?: Date;
  onChange: (date: string) => void;
};

// Date-only fields (invoice_date, order_date, due_date): "YYYY-MM-DD"
// Timestamp fields (created_at, updated_at, synced_at): toISOString()

export default function DatePicker({
  value,
  minimumDate,
  maximumDate,
  onChange,
}: Props) {
  const [show, setShow] = useState<boolean>(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate) {
      const date = toDateString(selectedDate);
      onChange(date);
    }
    setShow(false);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.valueText}>
          {value ? (
            formatDateString(value)
          ) : (
            <Text
              style={{ color: gray[4] }}
            >{`e.g. ${formatDateString(new Date().toISOString())}`}</Text>
          )}
        </Text>

        <View style={styles.iconWrapper}>
          <IconBtn
            icon={Ionicons}
            name="calendar-outline"
            size={26}
            onPress={() => setShow(true)}
          />
        </View>
      </View>

      {/* Modal To Pick Date  */}
      {show && (
        <DateTimePicker
          mode="date"
          value={new Date(value) || new Date()}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
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
  valueText: {
    fontSize: 15,
    padding: 12,
  },
  iconWrapper: {
    width: 50,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    backgroundColor: gray[1],
    borderLeftWidth: 1.5,
    borderLeftColor: gray[2],
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
});
