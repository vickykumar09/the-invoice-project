import { useCallback, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
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
import { blue, gray, rose } from "@/constants/color-palettes";
import { getInvoicePayments } from "@/features/invoices/services/sqlite/actions/payment";
import usePagination from "@/hooks/usePagination";
import globalStyles from "@/styles/globalStyles";
import NewPaymentComponent from "@/features/invoices/components/invoice/transactions/Payment";
import TextLink from "@/components/ui/TextLink";
import { Feather, FontAwesome } from "@expo/vector-icons";

export default function InvoicePaymentsScreen() {
  const router = useRouter();
  const { invoiceId } = useLocalSearchParams();

  const { data, loading, hasMore, reset, fetchData, loadMore } = usePagination(
    (params) => getInvoicePayments(invoiceId as string),
  );

  useEffect(() => {
    fetchData();
  }, []);


  // Handle Setting Invoice Payment Status to Paid Manually
  const handleMarkAsPaid = () => {
    return
  }

  // Render Item
  const renderItem = useCallback(({ item }: { item: InvoicePayment }) => {
    return <PaymentRow item={item} />;
  }, []);

  // Render Header
  const renderHeader = () => {
    const paymentSummaryItems = [
      { label: "Invoice Amount", value: 890 },
      { label: "Amount Received", value: 800 },
    ];

    return (
      <View style={{gap: 40}}>
        <View>
          <Text style={{ fontFamily: "RajdhaniBold", fontSize: 18 }}>Summary</Text>
          <View style={{gap: 8, marginLeft: 12,  marginVertical: 10}}>
            {paymentSummaryItems.map((each) => {
              const { label, value } = each;
              return (
                <View
                  key={label}
                  style={{flexDirection: 'row', alignItems: 'flex-start'}}
                >
                  <Text style={styles.titleTxt}>{label}</Text>
                  <Text style={styles.valueTxt}>{value}</Text>
                </View>
              );
            })}
            <View style={{flexDirection: 'row', alignItems: 'flex-start', borderBottomWidth: 1.5, borderTopWidth: 1.5,  borderStyle: 'dotted', paddingVertical: 6}}>
              <Text style={styles.titleTxt}>Balance Due</Text>
              <Text style={styles.valueTxt}>90</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'flex-start' }}>
              <Text style={styles.titleTxt}>Payment Status</Text>
              <Text style={styles.valueTxt}>partially paid</Text>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <TextLink
              text="Mark As Paid"
              onPress={() => console.log('paid')}
              size={18}
              color={blue[7]}
            />
          </View>
        </View>
        <Text style={{ fontFamily: "RajdhaniBold", fontSize: 18 }}>History</Text>
      </View>
    )
  }

  // Render Footer
  const renderFooter = () => {
    return (
      <View style={styles.invoiceItemComponentContainer}>
        <NewPaymentComponent invoiceId={invoiceId as string} />
      </View>
    );
  };

  // Render Empty
  const renderEmpty = () => {
    return (
      <ListEmpty
        icon="money"
        title="No payment history found for this invoice yet."
        subtitle="Payments recorded against this invoice will appear here."
      />
    );
  };

  return (
    <>
      <SafeAreaView edges={["bottom", "left", "right"]} style={globalStyles.safeAreaView}>
        <View style={{ flex: 1, gap: 16 }}>
          <InvoiceHero />
          <Text style={{ fontFamily: "RajdhaniBold", fontSize: 20, paddingHorizontal: 20}}>Payments</Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={Separator}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={!loading ? renderEmpty : null}
            contentContainerStyle={
              data.length <= 0 && { flex: 1, backgroundColor: "white", padding: 20 }
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
    flex: 1,
    fontSize: 15,
    fontFamily: "NunitoBold",
    color: gray[5]
  },
  valueTxt: {
    flex: 1,
    flexShrink: 1,
    textAlign: 'right',
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
