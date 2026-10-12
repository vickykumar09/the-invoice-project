import { InvoiceHero } from "@/features/invoices/components/InvoiceHero";
import { StyleSheet, Text, View } from "react-native";

export default function InvoiceRefundsScreen() {
  return (
    <View>
      <InvoiceHero />
      <View>
        <Text>Hello</Text>
        <Text>Payment Summary</Text>
        <Text>Invoice Amount</Text>
        <Text>Amount Received</Text>
        <Text>Balance Due</Text>
        <Text>Payment Status : Partially Paid</Text>
        <Text>Mark as Paid</Text>
      </View>
      <Text>refunds</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
