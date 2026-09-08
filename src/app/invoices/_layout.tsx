import { rose } from "@/constants/color-palettes";
import globalStyles from "@/styles/globalStyles";
import { Stack, useLocalSearchParams } from "expo-router";

export default function InvoiceLayout() {
  const { monthLabel, invoiceId } = useLocalSearchParams();

  return (
    <Stack
      screenOptions={{
        animation: "none",
        headerTitleAlign: "left",
        headerTitleStyle: globalStyles.headerTitleTwo,
        headerStyle: { backgroundColor: rose[2] },
      }}
    >
      {/* New Invoice Creation */}
      <Stack.Screen name="new/index" />
      <Stack.Screen
        name="new/[invoiceId]"
        options={{
          headerTitle: "",
        }}
      />

      {/* Invoice Screens */}
      <Stack.Screen
        name="[invoiceId]"
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen 
        name='[invoiceId]/index'
        options={{
          headerTitle: `Invoice Details`,
        }} 
      />
      <Stack.Screen 
        name='[invoiceId]/items'
        options={{
          headerTitle: `Invoice Items`,
        }} 
      />
      <Stack.Screen 
        name='[invoiceId]/payments'
        options={{
          headerTitle: 'Payment Details',
        }} 
      />
      <Stack.Screen 
        name='[invoiceId]/credit-notes'
        options={{
          headerTitle: 'Credit Notes',
        }} 
      />
      <Stack.Screen 
        name='[invoiceId]/preview'
        options={{
          headerTitle: 'Invoice Preview',
        }} 
      />
      <Stack.Screen 
        name='[invoiceId]/review'
        options={{
          headerTitle: 'Invoice Review',
        }} 
      />
      <Stack.Screen 
        name='[invoiceId]/activity'
        options={{
          headerTitle: 'Invoice Activity',
        }} 
      /> */}
    </Stack>
  );
}
