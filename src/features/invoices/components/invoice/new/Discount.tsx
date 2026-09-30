import { StyleSheet, Text, TextInput, View } from 'react-native';
import { gray } from '@/constants/color-palettes';
import { FontAwesome } from '@expo/vector-icons';
import { Toggle } from '@/form/components/Toggle';
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
  
  return (
    <View>
      <Text style={styles.headerTxt}>Discount</Text>
      <View style={[globalStyles.flex_items_center_spaced_between]}>
        {/* Left Container */}
        <View style={styles.leftContainer}>
          {invoice_discount_type === 'fixed' &&
            <FontAwesome
              name="rupee"
              size={16}
              style={{marginTop: 3}}
            />
          }

          <TextInput
            placeholder={"Value"}
            keyboardType="numeric"
            defaultValue={String(invoice_discount_value)}
            editable={invoice_discount_type !== 'none'}
            onChangeText={(text) => onChange('invoice_discount_value', text)}
            style={{
              flex: 1,
              backgroundColor: gray[0],
              fontSize: 15
              
            }}
            maxLength={invoice_discount_type === 'percentage' ? 5 : undefined}
          
          />

          {invoice_discount_type === 'percentage' &&
            <FontAwesome
              name="percent"
              style={{marginTop: 3}}
            />
          }
        </View>

        {/* Right Container */}
        <View style={styles.rightContainer}>
          <Toggle
            value={invoice_discount_type}
            options={[
              { label: 'None', value: 'none' },
              { label: 'Percentage', value: 'percentage' },
              { label: 'Fixed', value: 'fixed' },
            ]}
            onChange={(value) => onChange('invoice_discount_type', value)}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerTxt: {
    fontSize: 15,
    fontFamily: "NunitoBold" 
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: gray[2],
    backgroundColor: gray[0],
  },
  rightContainer: {
    flex: 1
  }
})