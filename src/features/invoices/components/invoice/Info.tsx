import { gray } from "@/constants/color-palettes";
import globalStyles from "@/styles/globalStyles";
import { formatDateString } from "@/utils/date-time/format";
import { StyleSheet, Text, View } from "react-native";
import { InvoiceInfoProps } from "../../types/invoice";

export default function InvoiceInfo({
  data
}: { data: InvoiceInfoProps }) {
  const {
    is_igst,
    invoice_number,
    invoice_date,
    place_of_supply,
    sales_channel,
    handled_by,
    order_id,
    order_date,
  } = data;

  const top = [
    {
      title: "Invoice No.",
      value: invoice_number ?? "- - - - - -",
    },
    {
      title: "Invoice Date",
      value: formatDateString(invoice_date),
    },
    {
      title: "Place of Supply",
      value: place_of_supply,
    },
    {
      title: "Supply Type",
      value: Boolean(is_igst) ? "Inter-State" : "Intra-State",
    },
  ];

  const bottom = [
    {
      title: "Sales Channel",
      value: sales_channel,
    },
    {
      title: "Handled By",
      value: handled_by,
    },
    {
      title: "Order No.",
      value: order_id,
    },
    {
      title: "Order Date",
      value: order_date && formatDateString(order_date),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        {top.map((each) => {
          const { title, value } = each;
          return (
            <View
              key={title}
              style={globalStyles.flex_items_center_spaced_between}
            >
              <Text style={styles.titleTxt}>{title}</Text>
              <Text style={styles.valueTxt}>{value}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.section}>
        {bottom.map((each) => {
          const { title, value } = each;
          return (
            <View
              key={title}
              style={globalStyles.flex_items_center_spaced_between}
            >
              <Text style={styles.titleTxt}>{title}</Text>
              <Text style={styles.valueTxt}>{value}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 30,
  },
  section: {
    gap: 8,
  },
  titleTxt: {
    fontSize: 15,
    color: gray[5],
  },
  valueTxt: {
    fontSize: 15,
  },
});
