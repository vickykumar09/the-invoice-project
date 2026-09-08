import { gray, rose } from "@/constants/color-palettes";
import usePagination, { FetchFnParams } from "@/hooks/usePagination";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Modal,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IconBtn from "./IconBtn";
import ListEmpty from "./flatlist/ListEmpty";

type Props<T> = {
  entity: string;
  visible: boolean;
  onClose: () => void;
  keyExtractor: (item: T) => string;
  renderItem: ListRenderItem<T>;
  searchFn: (params: FetchFnParams) => Promise<T[]>;
};

export default function SearchModal<T>({
  entity,
  visible,
  onClose,
  keyExtractor,
  renderItem,
  searchFn,
}: Props<T>) {
  const { top } = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);

  const [query, setQuery] = useState("");
  const searchQuery = query.trim();

  // Pagination hook (core engine)
  const { data, loading, hasMore, fetchData, reset } =
    usePagination<T>(searchFn);

  // Reset when modal opens
  useEffect(() => {
    if (!visible) return;

    setQuery("");
    reset();

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, [visible, reset]);

  // Debounced search - means you wait for the user to stop typing for a short period before performing the search.
  useEffect(() => {
    if (!visible) return;

    if (!searchQuery) {
      reset();
      return;
    }

    const timer = setTimeout(() => {
      fetchData({
        reset: true,
        query: searchQuery,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [visible, searchQuery, fetchData, reset]);

  // Load more (infinite scroll)
  const handleLoadMore = useCallback(() => {
    if (!searchQuery || loading || !hasMore) {
      return;
    }

    fetchData({ query: searchQuery });
  }, [searchQuery, hasMore, loading, fetchData]);

  // Render Empty
  const renderEmpty = () => {
    if (loading) return null;

    if (!searchQuery) {
      return (
        <ListEmpty
          icon="search"
          title={`Search ${entity}`}
          subtitle={`Start typing to search for ${entity}.`}
        />
      );
    }

    return (
      <ListEmpty
        icon="search"
        title={`No ${entity} found`}
        subtitle="Try a different search term."
      />
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="none"
      statusBarTranslucent
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={[styles.searchBar, { paddingTop: top + 20 }]}>
          <IconBtn icon={Feather} name={"arrow-left"} onPress={onClose} />

          <View style={styles.inputContainer}>
            <Feather name={"search"} size={20} color={gray[6]} />
            <TextInput
              ref={inputRef}
              placeholder={`Search ${entity}`}
              value={query}
              onChangeText={setQuery}
              style={{ flex: 1 }}
            />
            {searchQuery && (
              <IconBtn
                icon={Ionicons}
                name={"close"}
                size={20}
                color={gray[6]}
                onPress={() => setQuery("")}
              />
            )}
          </View>
        </View>

        {/* Results */}
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListFooterComponent={loading ? <ActivityIndicator /> : null}
          ListEmptyComponent={renderEmpty}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: gray[1],
    backgroundColor: rose[2],
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: rose[9],
    borderRadius: 99,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});
