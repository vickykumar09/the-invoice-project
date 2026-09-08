import Separator from "@/components/flatlist/ItemSeparator";
import ListEmpty from "@/components/flatlist/ListEmpty";
import ActionBtn from "@/components/ui/buttons/ActionBtn";
import { green } from "@/constants/color-palettes";
import { InvoiceHero } from "@/features/invoices/components/InvoiceHero";
import { InvoicePayment } from "@/features/invoices/types";
import globalStyles from "@/styles/globalStyles";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 *
 * Here are the most common scenarios where a seller issues a debit note:
 * - Undercharging: You accidentally billed a customer $100 instead of $150. You issue a debit note for $50 to collect the difference.
 * - Extra Goods/Services Sent: The customer decides to add more items to an order after the tax invoice has already been finalized and closed.
 * - Rate Revision: The price of a good increases retroactively due to a contract change, requiring the buyer to pay more for past deliveries.
 *
 *
 * If you want ERP-level design, your debit note feature should support:
 * - Item-wise adjustment (preferred)
 * - Invoice-level adjustment (fallback)
 *
 * Reason codes:
 * - undercharge
 * - extra items
 * - tax correction
 * - freight adjustment
 *
 */

export default function InvoiceDebitNotesScreen() {
  const { invoiceId } = useLocalSearchParams();
  const router = useRouter();

  const renderItem = useCallback(({ item }: { item: InvoicePayment }) => {
    return <PaymentCard props={item} />;
  }, []);

  const renderFooter = () => {
    return (
      <View style={{ padding: 20 }}>
        <ActionBtn
          variant="outlined"
          iconName="plus"
          btnLabel="New Debit Note"
          rippleColor={green[2]}
          color={green[7]}
          onPress={() => {
            router.push({
              pathname: "/invoices/[invoiceId]/debit-notes/[debitNoteId]",
              params: {
                invoiceId: invoiceId as string,
                debitNoteId: "8080",
              },
            });
          }}
        />
      </View>
    );
  };

  // Render Empty
  const renderEmpty = () => {
    return (
      <ListEmpty
        icon="file-text-o"
        title="No debit notes for this invoice yet"
        subtitle="Debit notes created for this invoice will appear here.."
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

//     <View>
//       <Text>index</Text>
//       <Text>Debit/Credit Note Schema</Text>
//       <Text>Record additional charges or corrections that increase an invoice amount</Text>
//       <View style={{padding: 20}}>
//
//       </View>
//       id
// invoice_item_id
// type (DEBIT / CREDIT)

// qty_adjustment (nullable)
// rate_adjustment (nullable)
// amount_adjustment (required)

// reason_code
// reason_text (optional free text)
//     </View>
