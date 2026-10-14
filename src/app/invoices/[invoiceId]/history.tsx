import globalStyles from "@/styles/globalStyles";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { InvoiceHero } from "@/features/invoices/components/InvoiceHero";
import { ActivityRow } from "@/features/invoices/components/rows/Activity";
import {
  getInvoiceActivity,
  getInvoiceReview,
} from "@/features/invoices/services/sqlite/analytics";
import { InvoiceActivity, InvoiceReview } from "@/features/invoices/types";
import usePagination from "@/hooks/usePagination";
import { useLocalSearchParams } from "expo-router";

export default function InvoiceHistoryScreen() {
  const { invoiceId } = useLocalSearchParams();
  const [review, setReview] = useState<InvoiceReview>({});

  const { data, loading, hasMore, reset, fetchData, loadMore } = usePagination(
    (params) => getInvoiceActivity(invoiceId as string),
  );
  useEffect(() => {
    async function loadData() {
      const review = await getInvoiceReview(invoiceId as string);
      setReview(review);
    }
    loadData();
    fetchData();
  }, []);

  // Render Item
  const renderItem = useCallback(
    ({ item, index }: { item: InvoiceActivity; index: number }) => {
      return <ActivityRow item={item} index={index} totalItems={data.length} />;
    },
    [data.length],
  );

  // Render Header
  const renderHeader = () => {
    return (
      <View style={{ gap: 30, marginBottom: 0 }}>
        <View style={globalStyles.flex_items_center_spaced_between}>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>Timeline</Text>
          <Text>In Future add tracking to this</Text>
        </View>
      </View>
    );
  };

  // Empty Component
  const emptyComponent = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>No Invoice Activity Found</Text>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView
        edges={["bottom", "left", "right"]}
        style={globalStyles.safeAreaView}
      >
        <View style={styles.container}>
          <InvoiceHero />
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={emptyComponent}
            contentContainerStyle={styles.flatlistContainer}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  flatlistContainer: {
    padding: 20,
    backgroundColor: "white",
  },
});

/**
 * Invoice Drafted
 * Invoice Cancelled
 * Invoice Issued
 * Payment CREATED PROCESSED FAILED CANCELLED
 * Credit Note Issued
 * Debit Note Issued
 * Refund CREATED PROCESSED FAILED CANCELLED
 */
