import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import TabSelector from '@/form/components/TabSelector'
import { InvoiceRoundOffMode, InvoiceRoundOffProps } from '@/features/invoices/types/invoice'

type Props = {
  data: InvoiceRoundOffProps;
  onChange: (value: string) => void;
}

export default function InvoiceRoundOff({
  data,
  onChange
}: Props) {
  const { round_off_mode } = data;

  return (
    <View>
      <Text style={styles.headerTxt}>Round Off</Text>
      <View style={{ marginTop: 4 }}>
        <TabSelector
          value={round_off_mode}
          options={[
            { id: 1, label: 'None', value: 'none' },
            { id: 2, label: 'Up (+)', value: 'up' },
            { id: 3, label: 'Down (-)', value: 'down' },
          ]}
          onChange={(value) => onChange(value)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerTxt: {
    fontSize: 15,
    fontFamily: "NunitoBold"
  }
})