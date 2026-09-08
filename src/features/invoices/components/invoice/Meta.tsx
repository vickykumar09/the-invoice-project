import { gray, rose } from "@/constants/color-palettes";
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
    <>
      <View style={styles.metaContainer}>
        <Text
          style={{
            fontFamily: "RajdhaniBold",
            fontSize: 15,
            textTransform: "uppercase",
          }}
        >
          {INVOICE_TYPE_DETAILS[invoice_type].title} id
        </Text>
        <Text style={{ color: gray[5] }}>{id}</Text>
      </View>
      <View
        style={[
          globalStyles.flex_items_center_spaced_between,
          {
            borderBottomWidth: 1.5,
            borderBottomColor: gray[1],
            paddingVertical: 10,
          },
        ]}
      >
        <Text style={styles.titleTxt}>Created On</Text>
        <Text style={styles.valueTxt}>
          {formatDateString(created_at, true)}
        </Text>
      </View>
      <View
        style={[
          globalStyles.flex_items_center_spaced_between,
          {
            borderBottomWidth: 1.5,
            borderBottomColor: gray[1],
            paddingVertical: 10,
          },
        ]}
      >
        <Text style={styles.titleTxt}>Last Updated On</Text>
        <Text style={styles.valueTxt}>
          {formatDateString(updated_at, true)}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleTxt: {
    fontSize: 15,
    color: gray[6],
  },
  valueTxt: {
    fontSize: 15,
  },
  metaContainer: {
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: gray[1],
  },
  invoiceItemComponentContainer: {
    zIndex: 99,
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 20,
    padding: 12,
    borderRadius: 12,
    backgroundColor: rose[2],
  },
});
