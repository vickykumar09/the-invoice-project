import usePagination from "@/hooks/usePagination";
import globalStyles from "@/styles/globalStyles";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect } from "react";
import {
  StyleSheet,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { InvoiceHero } from "@/features/invoices/components/InvoiceHero";

import InvoiceItems from "@/features/invoices/components/invoice/Items";
import { InvoiceItemRow } from "@/features/invoices/components/rows/InvoiceItem";
import { getInvoiceItems } from "@/features/invoices/services/sqlite/item";

export default function InvoiceItemsScreen() {
  const { invoiceId } = useLocalSearchParams();

  const {
    data: invoiceItems,
    loading,
    hasMore,
    fetchData,
    loadMore,
    reset,
  } = usePagination((params) => getInvoiceItems(invoiceId as string));

  // Render Item
  const renderItem = useCallback(({ item }: { item: any }) => {
    return <InvoiceItemRow item={item} />;
  }, []);

  // Initial Load
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <SafeAreaView
        edges={["bottom", "left", "right"]}
        style={globalStyles.safeAreaView}
      >
        <View style={{ flex: 1, gap: 20 }}>
          <InvoiceHero />
          <InvoiceItems items={invoiceItems} />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({});
