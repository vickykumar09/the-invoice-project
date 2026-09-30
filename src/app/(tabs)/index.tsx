import HomeHeader from "@/components/headers/HomeHeader";
import { INVOICE_ITEM_SCHEMA, INVOICE_SCHEMA } from "@/libs/db/schemas/invoice";
import globalStyles from "@/styles/globalStyles";
import { createTable, fetchTableData, getTablesList, readDb } from "@/utils/system/storage";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <>
      <SafeAreaView edges={["left", "right"]} style={globalStyles.safeAreaView}>
        <HomeHeader />
        <View style={styles.container}>
          <Button
            title="Click Me"
            onPress={() => createTable(true, 'invoice_items', INVOICE_ITEM_SCHEMA)}
          />
          <Text>Edit src/app/index.tsx to edit this screen.</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
