import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { gray } from '@/constants/color-palettes';
import { FontAwesome } from '@expo/vector-icons';
import { Toggle } from '@/form/components/Toggle';
import { ValueType } from '@/types/shared';
import globalStyles from '@/styles/globalStyles';
import { InvoiceDiscountProps } from '@/features/invoices/types/invoice';

type Props = {
  data: InvoiceDiscountProps;
  onChange: (key: string, value: string) => void;
}

export default function InvoiceDiscount({
  data,
  onChange
}: Props) {
  const {
    invoice_discount_type,
    invoice_discount_value,
  } = data;
  
  const [discountType, setDiscountType] = useState('percentage');
  return (
    <View>
      <Text style={styles.headerTxt}>Invoice Discount</Text>
      <View style={globalStyles.flex_items_center_spaced_between}>
        <View style={[globalStyles.flex_items_center, styles.valueContainer]}>
          {invoice_discount_type === 'fixed' && <FontAwesome name="rupee" /> }
          <TextInput
            placeholder={"Value"}
            keyboardType="numeric"
            defaultValue={String(invoice_discount_value)}
            editable={invoice_discount_type !== null}
            onChangeText={(text) => onChange('invoice_discount_value', text)}
            style={{
              flex: 1,
              backgroundColor: gray[0],
              
            }}
          
          />
          {invoice_discount_type === 'percentage' && <FontAwesome name="percent" />}
        </View>
        <Toggle
          value={discountType}
          options={[
            { label: 'None', value: 'none' },
            { label: 'Percentage', value: 'percentage' },
            { label: 'Fixed', value: 'fixed' },
          ]}
          onChange={(value) => onChange('invoice_discount_type', value)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerTxt: {
    fontSize: 15,
    fontFamily: "NunitoBold" 
  },
  valueContainer: {
    flex: 1, 
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: gray[2],
    backgroundColor: gray[0],
  }
})