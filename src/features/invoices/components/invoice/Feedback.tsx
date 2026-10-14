import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import globalStyles from '@/styles/globalStyles'
import { Feather } from '@expo/vector-icons'

export default function InvoiceFeedback() {

  return (
    <View>
      <View style={globalStyles.flex_items_center_spaced_between}>
        <Text style={{fontFamily: 'NunitoBold', fontSize:16, letterSpacing: 0.3 , textAlign: 'center'}}>Customer Feedback</Text>
        <View style={globalStyles.flex_items_center}>
          <Text>Show</Text>
          <Feather name='eye'/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})