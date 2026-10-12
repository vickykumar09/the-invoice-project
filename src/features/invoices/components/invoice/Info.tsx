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
    invoice_date
  } = data;

  return (
    <View style={globalStyles.flex_items_center_spaced_between}>
      <View>
        <Text style={styles.titleTxt}>Invoice Number</Text>
        <Text style={styles.valueTxt}>{invoice_number ?? '- - - - - -'}</Text>
      </View>
      <View>
        <Text style={styles.titleTxt}>Invoice Date</Text>
        <Text style={[styles.valueTxt, { textAlign: 'right' }]}>{formatDateString(invoice_date)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  titleTxt: {
    fontFamily: 'NunitoBold',
    fontSize: 15,
    color: gray[5]
  },
  valueTxt: {
    fontSize: 15,
  }
})