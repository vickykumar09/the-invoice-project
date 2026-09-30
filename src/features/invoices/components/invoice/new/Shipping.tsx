import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { gray } from '@/constants/color-palettes'

export default function InvoiceShipping() {
  return (
    <View>
      {/* Ship To */}
      <View>
        <Text style={styles.headerTxt}>Ship To :</Text>
        {/* {Boolean(is_shipping_same_as_billing) ? (
          <View style={globalStyles.flex_items_center}>
            <FontAwesome6 name="check-square" color={blue[7]} size={16}/>
            <Text style={styles.detailTxt}>
              Same as billing address
            </Text>
          </View>
        ) : (
          <View>
            {ship_to_name && (
              <Text style={styles.nameTxt}>{ship_to_name}</Text>
            )}
            {ship_to_phone && (
              <Text style={styles.detailTxt}>{ship_to_phone}</Text>
            )}
            {shippingAddress && (
              <Text style={styles.detailTxt}>{shippingAddress}</Text>
            )}
            {ship_to_email && (
              <Text style={styles.detailTxt}>{ship_to_email}</Text>
            )}
            {ship_to_gstin && (
              <Text style={styles.gstinTxt}>GSTIN: {ship_to_gstin}</Text>
            )}
          </View>
        )} */}
      </View>
      <Text>Shipping</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  headerTxt: {
    fontFamily: "RajdhaniBold",
    fontSize: 20,
    letterSpacing: 0.5,
  },
  nameTxt: {
    fontSize: 16,
    fontWeight: 600,
    color: gray[7],
    marginBottom: 4
  },
  detailTxt: {
    fontSize: 14,
    color: gray[5],
    marginBottom: 1,
  },
  gstinTxt: {
    marginTop: 8,
    fontFamily: "RajdhaniSemiBold",
    fontSize: 16,
    color: gray[7]
  },
})