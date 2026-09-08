import { blue, gray } from "@/constants/color-palettes";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { INVOICE_TYPES } from "../constants/invoice-types";
import { InvoiceType } from "../types/invoice";

type Props = {
  visible: boolean;
  hasGSTIN: boolean;
  onClose: () => void;
};

export default function InvoiceTypeDialog({
  visible,
  hasGSTIN,
  onClose,
}: Props) {
  const router = useRouter();

  const handlePress = (invoice_type: InvoiceType) => {
    const start = Date.now();
    router.push({
      pathname: "/invoices/new",
      params: {
        invoice_type: invoice_type,
      },
    });
    onClose();
    console.log("router.push took", Date.now() - start, "ms");
  };

  // Bill of Supply - A GST document used when no tax is charged but GSTIN exists
  return (
    <Modal
      visible={visible}
      transparent={true}
      statusBarTranslucent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {INVOICE_TYPES.map((each) => {
            const { key, title, subtitle } = each;
            return (
              <View key={key} style={styles.pressableWrapper}>
                <Pressable
                  onPress={() => handlePress(key)}
                  disabled={hasGSTIN}
                  accessibilityRole="button"
                  android_ripple={{ color: gray[9] }}
                  style={({ pressed }) => [
                    styles.pressable,
                    { paddingHorizontal: 20, paddingVertical: 14 },
                    pressed && styles.pressed,
                  ]}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "600",
                        color: blue[8],
                      }}
                    >
                      {title}
                    </Text>
                    <Text>{subtitle}</Text>
                  </View>
                  <Feather name="chevron-right" size={20} />
                </Pressable>
              </View>
            );
          })}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    gap: 16,
  },
  pressableWrapper: {
    overflow: "hidden",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: gray[2],
    backgroundColor: gray[1],
  },
  pressable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  pressed: {
    opacity: 0.7,
    borderRadius: 8,
  },
});
