import { StyleSheet, Text, TextInput, View } from 'react-native'
import { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { gray, green, red } from '@/constants/color-palettes'
import globalStyles from '@/styles/globalStyles'
import TextLink from '@/components/ui/TextLink'

export default function InvoiceInternalNote() {
  const [edit, setEdit] = useState<boolean>(false);

  // Handle Invoice Internal Note Update
  return (
    <View>
      <View style={globalStyles.flex_items_center_spaced_between}>
        <Text style={{fontFamily: 'NunitoBold', fontSize:16, letterSpacing: 0.3}}>Internal Note</Text>
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
      <View style={{flexDirection: 'row', alignItems: 'flex-start', gap: 12, justifyContent: 'space-between'}}>
        <View style={{alignItems: 'center'}}>
          <TextInput
            placeholder="HOlder"
          />
        </View>
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