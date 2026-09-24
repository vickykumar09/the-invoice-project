import { StyleSheet, Text, View } from 'react-native'
import { InvoiceType } from '../../types/invoice';
import { InvoiceItem } from '../../types/item';
import globalStyles from '@/styles/globalStyles';
import { formatCurrency } from '@/utils/money/format';
import { fromPaise } from '@/utils/money/convert';
import { gray, rose } from '@/constants/color-palettes';

type Props = {
  invoiceType: InvoiceType;
  isIgst: boolean,
  summary: any
}

export default function InvoiceItemSummary({
  invoiceType,
  isIgst,
  summary
}: Props) {
  const {
    rate_type,
    amount,
    amountExcludingTax,
    discount_amount,
    taxable_amount,
    cgst_rate,
    sgst_rate,
    igst_rate,
    cgst_amount,
    sgst_amount,
    igst_amount,
    cess_amount,
    total_amount,
  } = summary

  const getItemSummary = () => {
    if (invoiceType === 'none') {
      return [
        { label: 'Amount', value: amount },
        { label: 'Discount', value: discount_amount }
      ];
    }

    if (invoiceType === 'exempt') {
      return [
        { label: 'Amount', value: amount },
        { label: 'Discount', value: discount_amount },
        { label: 'Exempt Value', value: amount }
      ];
    }

    return [
      { label: 'Amount', value: amount },

      ...(rate_type === 'inclusive'
        ? [{ label: 'Amount (Excl. Tax)', value: amountExcludingTax }]
        : []),

      { label: 'Discount', value: discount_amount },
      { label: 'Taxable Value', value: taxable_amount },

      ...(isIgst
        ? [{ label: `IGST @ ${igst_rate}%`, value: igst_amount }]
        : [
            { label: `CGST @ ${cgst_rate}%`, value: cgst_amount },
            { label: `SGST @ ${sgst_rate}%`, value: sgst_amount },
          ]),

      ...(cess_amount > 0
        ? [{ label: 'Cess', value: cess_amount }]
        : []),
    ];
  };
  
  return (
    <View style={styles.container}>
      {getItemSummary().map((each) => {
        const { label, value } = each;
        return (
          <View key={label}>
            <View style={globalStyles.flex_items_center_spaced_between}>
              <Text style={styles.titleTxt}>{label}</Text>
              <Text style={styles.valueTxt}>{formatCurrency(fromPaise(value))}</Text>
            </View>
          </View>
        );
      })}

      {/* Item Total */}
      <View style={[
          globalStyles.flex_items_center_spaced_between,
          { borderTopWidth: 1, borderStyle: "dotted", paddingVertical: 10,},
        ]}
      >
        <Text style={{ fontSize: 16, fontWeight: 600, color: gray[7] }}>
          Item Total
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 600, color: rose[9] }}>
          {formatCurrency(fromPaise(total_amount))}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10
  },
  titleTxt: {
    fontSize: 15,
    color: gray[6],
  },
  valueTxt: {
    fontSize: 16,
    fontFamily: "RajdhaniSemiBold",
  },
})



{/* <View style={{ }}>
  {Object.entries(item).map(([key, value]) => {
    return (
      <View
        key={key}
        style={globalStyles.flex_items_center_spaced_between}
      >
        <Text>{key}</Text>
        <Text>
          {typeof value} {value}
        </Text>
      </View>
    );
  })}
</View> */}