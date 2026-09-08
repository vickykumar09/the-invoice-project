import HomeHeader from "@/components/headers/HomeHeader";
import globalStyles from "@/styles/globalStyles";
import {
  fetchTableColumnsInfo
} from "@/utils/system/storage";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <>
      <SafeAreaView edges={["left", "right"]} style={globalStyles.safeAreaView}>
        <HomeHeader />
        <View style={styles.container}>
          <Button
            title="Clikc"
            onPress={() => fetchTableColumnsInfo("items")}
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
