import Badge from "@/components/ui/Badge";
import { blue, gray } from "@/constants/color-palettes";
import globalStyles from "@/styles/globalStyles";
import { formatDateString } from "@/utils/date-time/format";
import { formatCurrency } from "@/utils/money/format";
import { StyleSheet, Text, View } from "react-native";
import { InvoicePayment } from "../../types";

export function PaymentRow({ item }: { item: InvoicePayment }) {
  const { amount, paid_on, method, reference_no } = item;
  return (
    <View style={styles.container}>
      {/* Top Row */}
      <View style={styles.top}>
        <View style={globalStyles.flex_items_center_spaced_between}>
          <Text style={{ fontSize: 17, fontWeight: 600 }}>
            {formatCurrency(amount)}
          </Text>
        </View>

        {/* Bottom Row */}
        <View style={globalStyles.flex_items_center_spaced_between}>
          <Badge label={method} backgroundColor={blue[0]} color={blue[6]} />
          <Text style={{ color: gray[6] }}>
            {formatDateString(paid_on, true)}
          </Text>
        </View>
      </View>

      {/* Bottom Row - Reference No. */}
      <View style={styles.bottom}>
        <Text style={{ color: gray[6], fontWeight: 600 }}>Ref No.:</Text>
        <Text style={{ color: gray[6], letterSpacing: 0.5 }}>
          {reference_no}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#fff",
    gap: 12,
  },
  top: {
    gap: 6,
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
