import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import globalStyles from '@/styles/globalStyles'
import { Feather, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { gray } from '@/constants/color-palettes'

export default function InvoiceFeedback() {
  const [show, setShow] = useState<boolean>(false);
  // Get Invoice Feedback
  const getFeedback = () => {
    
  }

  return (
    <View>
      <View style={globalStyles.flex_items_center}>
        <View style={[globalStyles.iconWrapper, {backgroundColor: 'white', borderWidth: 1, borderColor: gray[1]}]}>
          <Ionicons name="chatbox-ellipses-outline" size={26} color={gray[5]}/>
        </View>
        <View style={{ flex: 1}}>
          <View style={globalStyles.flex_items_center_spaced_between}>
            <Text style={{ fontSize: 16, flex: 1, fontWeight: 600 }}>
              Customer Feedback
            </Text>
            {!show &&
              <View style={globalStyles.flex_items_center}>
                <Text>Show</Text>
                <FontAwesome
                  name="pencil"
                  size={14}
                  color={gray[5]}
                  onPress={() => setShow(true)}
                  style={{marginTop: 3}}
                />
              </View>
            }
          </View>
          <Text style={{color: gray[6], fontWeight: 400}}>Get to know the customer replay</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})