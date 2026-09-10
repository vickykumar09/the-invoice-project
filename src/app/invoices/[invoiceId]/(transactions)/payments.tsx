import { useCallback, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Expo
import { useLocalSearchParams, useRouter } from "expo-router";

// Components
import Separator from "@/components/flatlist/ItemSeparator";

// Invoice
import { InvoiceHero } from "@/features/invoices/components/InvoiceHero";
import { PaymentRow } from "@/features/invoices/components/rows/Payment";
import { InvoicePayment } from "@/features/invoices/types";

import ListEmpty from "@/components/flatlist/ListEmpty";
import { gray, rose } from "@/constants/color-palettes";
import { getInvoicePayments } from "@/features/invoices/services/sqlite/actions/payment";
import usePagination from "@/hooks/usePagination";
import globalStyles from "@/styles/globalStyles";

export default function InvoicePaymentsScreen() {
  const router = useRouter();
  const { invoiceId } = useLocalSearchParams();

  const { data, loading, hasMore, reset, fetchData, loadMore } = usePagination(
    (params) => getInvoicePayments(invoiceId as string),
  );

  useEffect(() => {
    fetchData();
  }, []);

  // Render Item
  const renderItem = useCallback(({ item }: { item: InvoicePayment }) => {
    return <PaymentRow item={item} />;
  }, []);

  // Render Footer
  // const renderFooter = () => {
  //   return (
  //     <View style={styles.invoiceItemComponentContainer}>
  //       <NewPaymentComponent invoiceId={invoiceId as string} />
  //     </View>
  //   );
  // };

  // Render Empty
  const renderEmpty = () => {
    return (
      <ListEmpty
        icon="money"
        title="No payments for this invoice yet"
        subtitle="Payments recorded against this invoice will appear here."
      />
    );
  };

  return (
    <>
      <SafeAreaView
        edges={["bottom", "left", "right"]}
        style={globalStyles.safeAreaView}
      >
        <View style={{ flex: 1, gap: 10 }}>
          <InvoiceHero />
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={Separator}
            // ListFooterComponent={renderFooter}
            ListEmptyComponent={!loading ? renderEmpty : null}
            contentContainerStyle={
              data.length <= 0 && { flex: 1, backgroundColor: "white" }
            }
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    gap: 0,
    backgroundColor: "white",
  },
  sectionHeaderTxt: {
    fontFamily: "RajdhaniBold",
    fontSize: 20,
    letterSpacing: 0.5,
  },
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: gray[1],
    backgroundColor: "white",
  },
  titleTxt: {
    fontSize: 15,
    color: gray[6],
  },
  valueTxt: {
    fontSize: 15,
  },
  metaContainer: {
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: gray[1],
  },
  invoiceItemComponentContainer: {
    zIndex: 99,
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 20,
    padding: 12,
    borderRadius: 12,
    backgroundColor: rose[2],
  },
});
