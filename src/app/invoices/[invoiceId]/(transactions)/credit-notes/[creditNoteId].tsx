import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'

export default function CreditNoteScreen() {
  const router = useRouter();
  const { invoiceId, creditNoteId } = useLocalSearchParams();

  return (
    <View>
      <Text>[creditNoteId]{creditNoteId}</Text>
      <Button
        title='Issue Refund' 
        onPress={() => {
          router.push({
            pathname: '/invoices/[invoiceId]/refunds/new',
            params: {
              invoiceId: invoiceId as string,
              credit_note_id: creditNoteId,
              remaining_amount: 8980,
            }
          })
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({})