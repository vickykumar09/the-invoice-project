import { gray } from "@/constants/color-palettes";
import globalStyles from "@/styles/globalStyles";
import { formatDateString } from "@/utils/date-time/format";
import { StyleSheet, Text, View } from "react-native";
import { InvoiceDetailsProps, InvoiceInfoProps } from "../../types/invoice";

export default function InvoiceDetails({
  data
}: { 
  data: InvoiceDetailsProps 
}) {

  const {
    is_igst,
    place_of_supply,
    sales_channel,
    handled_by,
    order_id,
    order_date,
  } = data;

  const details = [
    {
      title: "Place of Supply",
      value: place_of_supply,
    },
    {
      title: "Supply Type",
      value: Boolean(is_igst) ? "Inter-State" : "Intra-State",
    },
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
      {details.map((each) => {
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
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  titleTxt: {
    fontSize: 14,
    fontFamily: "NunitoBold",
    color:  gray[4]
  },
  valueTxt: {
    fontSize: 15,
  },
});
