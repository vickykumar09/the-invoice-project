import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import globalStyles from '@/styles/globalStyles'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { blue, gray, green, red } from '@/constants/color-palettes'
import { formatDateString } from '@/utils/date-time/format'
import DatePicker from '@/form/components/DatePicker'
import TextLink from '@/components/ui/TextLink'

export default function InvoicePaymentDue() {
  const [edit, setEdit] = useState<boolean>(false);
  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'flex-start', gap: 12, justifyContent: 'space-between'}}>
        <View style={globalStyles.flex_items_center}>
          <Text style={{fontFamily: 'NunitoBold', fontSize:16, letterSpacing: 0.3}}>Payment Due On</Text>
        </View>
        
        {!edit &&
          <View style={globalStyles.flex_items_center}>
            <Text>Edit</Text>
            <FontAwesome
              name="pencil"
              size={14}
              color={gray[5]}
              onPress={() => setEdit(true)}
              style={{marginTop: 3}}
            />
          </View>
        }
      </View>

      <View >
        {!edit ?
        <View style={globalStyles.flex_items_center}>
          <Ionicons name="calendar-outline" size={14} color={gray[6]} style={{marginTop: 2}}/>
          <Text style={{fontSize: 14, color: gray[6], fontWeight: 400}}>{formatDateString('22-09-2026')}</Text>
        </View> : 
        <DatePicker
          value={'invoice.payment_due_date'}
          minimumDate={new Date()}
          maximumDate={new Date()}
          onChange={(val => console.log(val))}
        />
        }
      </View>

      {edit &&
        <View style={globalStyles.flex_items_center_spaced_between}>
          <TextLink
            text='Cancel'
            color={red[5]}
            size={16}
            onPress={() => setEdit(false)}
          />
          <TextLink
            text='Save'
            color={green[7]}
            size={16}
            onPress={() => setEdit(false)}
          />
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({})