import ItemSeparator from "@/components/flatlist/ItemSeparator";
import ListEmpty from "@/components/flatlist/ListEmpty";
import ListFooter from "@/components/flatlist/ListFooter";
import TabHeader from "@/components/headers/TabHeader";
import { amber, gray, purple } from "@/constants/color-palettes";
import ItemRow from "@/features/catalog/components/ItemRow";
import {
  getCatalogItemCounts,
  getCatalogItems,
} from "@/features/catalog/services/sqlite";
import { ItemCounts, ItemRowData } from "@/features/catalog/types";
import usePagination from "@/hooks/usePagination";
import globalStyles from "@/styles/globalStyles";
import { readDb } from "@/utils/system/storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CatalogScreen() {
  const router = useRouter();
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  const [itemCounts, setItemCounts] = useState<ItemCounts>({
    productCount: 0,
    serviceCount: 0,
  });

  const {
    data: recentItems,
    fetchData,
    loading,
    hasMore,
    loadMore,
  } = usePagination<ItemRowData>(getCatalogItems);

  // Render Item
  const renderItem = useCallback(({ item }: { item: ItemRowData }) => {
    return (
      <ItemRow item={item} onPress={(id) => router.push(`/catalog/${id}`)} />
    );
  }, []);

  // Render Header
  const renderHeader = () => {
    return (
      <>
        <View
          style={[globalStyles.flex_items_center_spaced_between, styles.header]}
        >
          <View style={styles.headerSection}>
            <MaterialCommunityIcons
              name="package-variant"
              size={30}
              color={purple[7]}
              style={styles.productIconWrapper}
              onPress={readDb}
            />
            <Text style={styles.labelTxt}>Products</Text>
            <Text style={styles.countTxt}>{itemCounts.productCount}</Text>
          </View>

          <View style={styles.headerSection}>
            <MaterialCommunityIcons
              name="tools"
              size={28}
              color={amber[7]}
              style={styles.serviceIconWrapper}
            />
            <Text style={styles.labelTxt}>Services</Text>
            <Text style={styles.countTxt}>{itemCounts.serviceCount}</Text>
          </View>
        </View>

        <View
          style={[
            globalStyles.flex_items_center_spaced_between,
            styles.listHeader,
          ]}
        >
          <Text style={styles.listHeaderTxt}>Recent Items</Text>
        </View>
      </>
    );
  };

  // Render Footer
  const renderFooter = () => {
    if (recentItems.length === 0) return null;

    if (loading) return <ActivityIndicator />;

    if (!hasMore) {
      return (
        <ListFooter
          text={`Showing ${recentItems.length} ${recentItems.length === 1 ? "item" : "items"}`}
        />
      );
    }

    return null;
  };

  // Render Empty
  const renderEmpty = () => {
    if (!loading) {
      return (
        <ListEmpty
          icon="inbox"
          title="No items in your catalog yet"
          subtitle="Tap + in the top-right corner to create your first item."
        />
      );
    }

    return null;
  };

  useEffect(() => {
    getCatalogItemCounts().then(setItemCounts);
    fetchData();
  }, []);

  return (
    <>
      <SafeAreaView edges={["left", "right"]} style={globalStyles.safeAreaView}>
        <TabHeader
          label="Catalog"
          onPress={() => router.push("/catalog/new")}
          onSearchPress={() => setOpenSearch(true)}
        />
        <FlatList
          data={recentItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparator}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={
            recentItems.length <= 0 && { flex: 1, backgroundColor: "white" }
          }
          onEndReached={hasMore ? loadMore : undefined}
          onEndReachedThreshold={0.5}
        />
      </SafeAreaView>

      {/* Search Modal */}
      {/* <SearchModal
        entity="items"
        visible={openSearch}
        onClose={() => setOpenSearch(false)}
        keyExtractor={(item: ItemRowData) => item.id}
        renderItem={renderItem}
        searchFn={getCatalogItems}
      /> */}
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
  headerSection: {
    flex: 1,
    alignItems: "center",
  },
  productIconWrapper: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: purple[1],
  },
  serviceIconWrapper: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: amber[1],
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
});
