import { rose } from "@/constants/color-palettes";
import globalStyles from "@/styles/globalStyles";
import { Stack } from "expo-router";

export default function CatalogLayout() {
  return (
    <Stack
      screenOptions={{
        animation: "none",
        headerTitleAlign: "left",
        headerTitleStyle: [globalStyles.headerTitleTwo],
        headerStyle: { backgroundColor: rose[2] },
      }}
    >
      <Stack.Screen
        name="new"
        options={{
          headerTitle: "New Item",
        }}
      />

      <Stack.Screen
        name="[itemId]/index"
        options={{
          headerTitle: "Item Details",
        }}
      />
    </Stack>
  );
}
