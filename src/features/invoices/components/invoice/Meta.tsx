import { gray } from "@/constants/color-palettes";
import globalStyles from "@/styles/globalStyles";
import { formatDateString } from "@/utils/date-time/format";
import { StyleSheet, Text, View } from "react-native";
import { INVOICE_TYPE_DETAILS } from "../../constants/invoice-types";
import { InvoiceType } from "../../types/invoice";

type Props = {
  id: string;
  invoice_type: InvoiceType;
  created_at: string;
  updated_at: string;
};

export default function InvoiceMeta({
  id,
  invoice_type,
  created_at,
  updated_at,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.idContainer}>
        <Text style={styles.idLabelTxt}>
          {INVOICE_TYPE_DETAILS[invoice_type].title} id
        </Text>
        <Text style={styles.idTxt}>{id}</Text>
      </View>
      
      <View style={globalStyles.flex_items_center_spaced_between}>
        <Text style={styles.titleTxt}>Created On</Text>
        <Text style={styles.valueTxt}>
          {formatDateString(created_at, true)}
        </Text>
      </View>

      <View style={globalStyles.flex_items_center_spaced_between}>
        <Text style={styles.titleTxt}>Last Updated On</Text>
        <Text style={styles.valueTxt}>
          {formatDateString(updated_at, true)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10
  },
  idContainer: {
    alignItems: "center",
    marginBottom: 6
  },
  idLabelTxt: {
    fontFamily: "NunitoExtraBold",
    fontSize: 15,
    textTransform: "uppercase",
  },
  idTxt: {
    color: gray[5]
  },
  titleTxt: {
    fontFamily: "NunitoBold",
    fontSize: 14,
    color: gray[5],
  },
  valueTxt: {
    fontSize: 15,
  },
});
