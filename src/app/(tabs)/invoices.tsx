import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ItemSeparator from "@/components/flatlist/ItemSeparator";
import ListEmpty from "@/components/flatlist/ListEmpty";
import ListFooter from "@/components/flatlist/ListFooter";
import TabHeader from "@/components/headers/TabHeader";
import SearchModal from "@/components/SearchModal";
import { gray } from "@/constants/color-palettes";
import InvoiceTypeDialog from "@/features/invoices/components/InvoiceTypeDialog";
import { InvoiceRow } from "@/features/invoices/components/rows/Invoice";
import { getInvoices } from "@/features/invoices/services/sqlite/invoice";
import usePagination from "@/hooks/usePagination";
import globalStyles from "@/styles/globalStyles";
import { useRouter } from "expo-router";

export default function InvoicesScreen() {
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  const {
    data: recentInvoices,
    loading,
    hasMore,
    fetchData,
    loadMore,
    reset,
  } = usePagination(getInvoices);

  // Render Item
  const renderItem = useCallback(({ item }: { item: any }) => {
    return <InvoiceRow item={item} />;
  }, []);

  // Render Header
  const renderHeader = () => {
    return (
      <>
        <View
          style={[
            {
              padding: 20,
              backgroundColor: "white",
              gap: 20,
              borderBottomWidth: 1,
              borderBottomColor: gray[1],
            },
          ]}
        >
          <View style={{ flex: 1, gap: 8 }}>
            <Text style={{ color: gray[9], fontSize: 16 }}>This Month</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ color: gray[4] }}>Revenue</Text>
                <Text style={{ fontWeight: 600, fontSize: 18 }}>
                  ₹20000000000000.00
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: gray[4],
                  width: 2,
                  alignSelf: "stretch",
                }}
              ></View>
              <View style={{}}>
                <Text
                  style={{ textAlign: "right", fontSize: 14, color: gray[5] }}
                >
                  Invoices
                </Text>
                <Text
                  style={{ fontWeight: 600, textAlign: "right", fontSize: 18 }}
                >
                  8000
                </Text>
              </View>
            </View>
          </View>
          {/* <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8}}>
            <FontAwesome name="circle" size={8}/>
            <FontAwesome name="circle" size={8}/>
            <FontAwesome name="circle" size={8}/>
            <FontAwesome name="circle" size={8}/>
            <FontAwesome name="circle" size={8}/>
            <FontAwesome name="circle" size={8}/>
          </View> */}
        </View>

        <View
          style={[
            globalStyles.flex_items_center_spaced_between,
            styles.listHeader,
          ]}
        >
          <Text style={styles.listHeaderTxt}>Recent Invoices</Text>
        </View>
      </>
    );
  };

  // Render Footer
  const renderFooter = useCallback(() => {
    if (recentInvoices.length === 0) {
      return null;
    }

    if (loading) {
      return <ActivityIndicator />;
    }

    if (!hasMore) {
      return (
        <ListFooter
          text={`Showing ${recentInvoices.length} ${recentInvoices.length === 1 ? "item" : "items"}`}
        />
      );
    }

    return null;
  }, [recentInvoices.length, loading, hasMore]);

  // Render Empty
  const renderEmpty = () => {
    if (!loading) {
      return (
        <ListEmpty
          icon="inbox"
          title="No invoices yet."
          subtitle="Tap + in the top-right corner to create your first invoice."
        />
      );
    }

    return null;
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Pending Amount
  // Overdue Invoices
  // This Month Revenue
  // Last Month Revenue

  // Fetch Recent Invoices
  // Initial Load

  return (
    <>
      <SafeAreaView
        edges={["left", "right"]}
        style={[globalStyles.safeAreaView]}
      >
        <TabHeader
          label="Invoices"
          onPress={() => setVisible(true)}
          onSearchPress={() => setOpenSearch(true)}
        />
        <FlatList
          data={recentInvoices}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparator}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={{ gap: 0 }}
          onEndReached={hasMore ? loadMore : undefined}
          onEndReachedThreshold={0.5}
        />

        {/* Search Modal */}
        <SearchModal
          entity="invoices"
          visible={openSearch}
          onClose={() => setOpenSearch(false)}
          keyExtractor={(item: any) => item.id}
          renderItem={renderItem}
          searchFn={getInvoices}
        />
      </SafeAreaView>

      <InvoiceTypeDialog
        visible={visible}
        onClose={() => setVisible(false)}
        hasGSTIN={false}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: gray[1],
  },
  labelTxt: {
    fontSize: 20,
    fontWeight: 600,
    color: gray[7],
  },
  countTxt: {
    fontSize: 16,
    color: gray[5],
  },
  listHeader: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: gray[1],
    backgroundColor: gray[0],
  },
  listHeaderTxt: {
    fontSize: 18,
    fontWeight: 600,
  },
  listFooter: {
    paddingTop: 16,
    padding: 20,
    alignItems: "center",
  },
  listFooterTxt: {
    fontSize: 16,
    fontWeight: 600,
    color: gray[5],
  },
  listEmpty: {
    padding: 20,
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyIconWrapper: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: gray[1],
  },
  listEmptyTitleTxt: {
    fontSize: 18,
    fontWeight: 600,
    color: gray[7],
  },
  listEmptySubtitleTxt: {
    marginTop: 16,
    fontSize: 16,
    textAlign: "center",
    color: gray[5],
  },
});
