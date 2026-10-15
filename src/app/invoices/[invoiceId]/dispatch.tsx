import { InvoiceHero } from "@/features/invoices/components/InvoiceHero";
import { StyleSheet, Text, View } from "react-native";

export default function InvoiceDispatchScreen() {
  const dispatch = [
    { label: 'dispatch_date', value: '' },
    { label: 'dispatch_document_number', value: '' },
    { label: 'dispatch_document_date', value: '' },
    { label: 'dispatch_from', value: '' },
    { label: 'transporter_name', value: '' },
    { label: 'transporter_gstin', value: '' },
    { label: 'transporter_document_number', value: '' },
    { label: 'transporter_document_date', value: '' },
    { label: 'vehicle_number', value: '' },
    { label: 'transport_mode', value: '' },
    { label: 'distance_km', value: '' },
  ]
  
  return (
    <View>
      <InvoiceHero/>
      <Text>Dispatch</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
