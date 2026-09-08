import globalStyles from "@/styles/globalStyles";
import { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Separator from "@/components/flatlist/ItemSeparator";
import ListEmpty from "@/components/flatlist/ListEmpty";
import ActionBtn from "@/components/ui/buttons/ActionBtn";
import { green } from "@/constants/color-palettes";
import { InvoiceHero } from "@/features/invoices/components/InvoiceHero";
import { InvoicePayment } from "@/features/invoices/types";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function InvoiceCreditNotesScreen() {
  const router = useRouter();
  const { invoiceId } = useLocalSearchParams();

  const renderItem = useCallback(({ item }: { item: InvoicePayment }) => {
    return <PaymentCard props={item} />;
  }, []);

  const renderFooter = () => {
    return (
      <View style={{ padding: 20 }}>
        <ActionBtn
          variant="outlined"
          iconName="plus"
          btnLabel="New Credit Note"
          rippleColor={green[2]}
          color={green[7]}
          onPress={() => {
            router.push({
              pathname: "/invoices/[invoiceId]/credit-notes/[creditNoteId]",
              params: {
                invoiceId: invoiceId as string,
                creditNoteId: "8080",
              },
            });
          }}
        />
      </View>
    );
  };

  // credit notes status : draft, issued, applied, cancelled, unapplied

  // Render Empty
  const renderEmpty = () => {
    return (
      <ListEmpty
        icon="file-text-o"
        title="No credit notes for this invoice yet"
        subtitle="Credit notes issued against this invoice will appear here."
      />
    );
  };

  return (
    <>
      <SafeAreaView
        edges={["bottom", "left", "right"]}
        style={globalStyles.safeAreaView}
      >
        <View style={{ flex: 1, gap: 20 }}>
          <InvoiceHero />
          <FlatList
            data={[]}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={Separator}
            ListEmptyComponent={renderEmpty}
            ListFooterComponent={renderFooter}
            contentContainerStyle={{ flex: 1, backgroundColor: "white" }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({});
