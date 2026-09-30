import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
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
        <Text style={{fontSize: 14, fontFamily: "NunitoBold", color:  gray[5] }}>Invoice Number</Text>
        <Text>{invoice_number ?? '- - - - - -'}</Text>
      </View>
      <View>
        <Text style={{fontSize: 14, fontFamily: "NunitoBold", color:  gray[5] }}>Invoice Date</Text>
        <Text style={{textAlign: 'right', fontSize: 15}}>{formatDateString(invoice_date)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})