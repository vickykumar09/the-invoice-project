import { InvoiceHero } from "@/features/invoices/components/InvoiceHero";
import { StyleSheet, Text, View } from "react-native";

export default function InvoiceRefundsScreen() {
  return (
    <View>
      <InvoiceHero />
      <Text>refunds</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
