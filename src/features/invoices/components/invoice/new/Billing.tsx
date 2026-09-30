import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { blue, gray } from '@/constants/color-palettes'
import globalStyles from '@/styles/globalStyles'
import { Feather } from '@expo/vector-icons'
import TextLink from '@/components/ui/TextLink'
import { useModal } from '@/hooks/useModal'
import { InvoiceCustomerData } from '@/features/invoices/types/customer'

type Props = {
  data: InvoiceCustomerData;
}

export default function InvoiceBilling() {
  const { visible, openModal, closeModal } = useModal();
  const initialData = [];
  return (
    <View>
      <View style={globalStyles.flex_items_center_spaced_between}>
        <Text style={styles.headerTxt}>Bill To :</Text>
        {/* {customer_id && (
          <IconBtn
            icon={Feather}
            name="chevron-right"
            color={gray[7]}
            onPress={() => console.log('hello')} // route to the customer page
          />
        )} */}
        <View>
          <View style={globalStyles.flex_items_center}>
            <TextLink
              text={initialData ? "Edit" : "Add"}
              size={16}
              onPress={openModal}
            />
            {initialData ?
              <Feather name="edit" size={16} color={blue[7]} /> :
              <Feather name="plus" size={16} color={blue[7]} /> 
            }
          </View>
        </View>
      </View>
      {/* <View>
        {bill_to_name && (
          <Text style={styles.nameTxt}>{bill_to_name}</Text>
        )}
        {bill_to_phone && (
          <Text style={styles.detailTxt}>{bill_to_phone}</Text>
        )}
        {billingAddress && (
          <Text style={styles.detailTxt}>{billingAddress}</Text>
        )}
        {bill_to_email && (
          <Text style={styles.detailTxt}>{bill_to_email}</Text>
        )}
        {bill_to_gstin && (
          <Text style={styles.gstinTxt}>GSTIN: {bill_to_gstin}</Text>
        )}
      </View> */}
      
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