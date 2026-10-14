import { StyleSheet, Text, View } from 'react-native'
import globalStyles from '@/styles/globalStyles'
import { gray } from '@/constants/color-palettes'
import { formatDateString } from '@/utils/date-time/format'
import { InvoiceInfoProps } from '../../types/invoice'

export default function InvoiceInfo({
  data
}: {
  data: InvoiceInfoProps
}) {
  const {
    invoice_number,
    invoice_date,
    status,
    payment_status
  } = data;

  const infos = [
    {
      title: "Invoice Number",
      value: invoice_number ?? '- - - - - -',
    },
    {
      title: "Invoice Date",
      value: formatDateString(invoice_date),
    },
    {
      title: "Invoice Status",
      value: status,
    },
    {
      title: "Payment Status",
      value: payment_status,
    },
  ];

  return (
    <View style={styles.container}>
      {infos.map((each) => {
        const { title, value } = each;
        return (
          <View
            key={title}
            style={{flexDirection: 'row', alignItems: 'flex-start'}}
          >
            <Text style={styles.titleTxt}>{title}</Text>
            <Text style={styles.valueTxt}>{value}</Text>
          </View>
        );
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  titleTxt: {
    flex: 1,
    fontSize: 15,
    fontFamily: "NunitoBold",
    color: gray[5]
  },
  valueTxt: {
    flex: 1.5,
    flexShrink: 1.5,
    textAlign: 'right',
    fontSize: 15,
  },
});