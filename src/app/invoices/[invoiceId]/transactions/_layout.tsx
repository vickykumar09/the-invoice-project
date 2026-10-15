import { rose } from "@/constants/color-palettes";
import globalStyles from "@/styles/globalStyles";
import { Stack } from "expo-router";

export default function TransactionsLayout() {
  return (
    <Stack
      screenOptions={{
        animation: "none",
        headerTitleAlign: "left",
        headerTitleStyle: globalStyles.headerTitleTwo,
        headerStyle: { backgroundColor: rose[2] },
        title: "Transactions",
      }}
    />
  );
}