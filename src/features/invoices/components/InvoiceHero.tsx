import { gray, green, rose } from "@/constants/color-palettes";
import { useInvoice } from "@/contexts/InvoiceContext";
import globalStyles from "@/styles/globalStyles";
import { formatDateString, getSmartTimestamp } from "@/utils/date-time/format";
import { formatCurrency } from "@/utils/money/format";
import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

// paid           -> green
// partially_paid -> orange
// draft          -> gray
// overdue        -> red
// cancelled      -> red

function InvoiceHeroComponent() {
  const { invoice } = useInvoice();
  const {
    invoice_number,
    invoice_date,
    bill_to_name,
    grand_total,
    status,
    updated_at,
  } = invoice;

  return (
    <View style={styles.container}>
      {/* Top - Invoice Number & Invoice Date */}
      <View style={[globalStyles.flex_items_center_spaced_between]}>
        <Text style={styles.invNumTxt}>
          {invoice_number ?? "INV-ACME10-202609-908909"}
        </Text>
        <Text style={styles.dateTxt}>{formatDateString(invoice_date)}</Text>
      </View>

      {/* Middle - Customer Name & Grand Total */}
      <View style={globalStyles.flex_items_center_spaced_between}>
        <Text style={styles.customerTxt} numberOfLines={1}>
          {bill_to_name}
        </Text>
        <Text style={styles.grandTotalTxt}>{formatCurrency(grand_total)}</Text>
      </View>

      {/* Bottom - Invoice Status & Updated At */}
      <View
        style={[
          globalStyles.flex_items_center_spaced_between,
          { marginTop: 8 },
        ]}
      >
        <Text style={{ color: green[7], fontWeight: 600, fontSize: 14 }}>
          {status}
        </Text>
        <Text style={styles.updatedAtTxt}>{getSmartTimestamp(updated_at)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: gray[2],
    backgroundColor: "#fff",
  },
  invNumTxt: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: 600,
    color: gray[5],
  },
  dateTxt: {
    fontSize: 14,
    color: gray[5],
  },
  customerTxt: {
    fontWeight: 600,
    color: rose[7],
    fontFamily: "RajdhaniBold",
    fontSize: 18,
    flexShrink: 1,
  },
  grandTotalTxt: {
    color: gray[9],
    fontFamily: "RajdhaniSemiBold",
    fontSize: 18,
  },
  updatedAtTxt: {
    color: gray[4],
    fontSize: 14,
  },
});

export const InvoiceHero = memo(InvoiceHeroComponent);
