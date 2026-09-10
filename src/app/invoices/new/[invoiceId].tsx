import IconBtn from "@/components/IconBtn";
import ActionBtn from "@/components/ui/buttons/ActionBtn";
import { amber, gray, green, red, rose } from "@/constants/color-palettes";
import InvoiceCustomer from "@/features/invoices/components/invoice/Customer";
import InvoiceInfo from "@/features/invoices/components/invoice/Info";
import InvoiceItems from "@/features/invoices/components/invoice/Items";
import InvoiceMeta from "@/features/invoices/components/invoice/Meta";
import InvoiceSummaryComponent from "@/features/invoices/components/invoice/Summary";
import InvoiceCustomerFormComponent from "@/features/invoices/components/invoice/new/Customer";
import InvoiceDiscountComponent from "@/features/invoices/components/invoice/new/Discount";
import InvoiceItemComponent from "@/features/invoices/components/invoice/new/Item";
import InvoiceRoundOffComponent from "@/features/invoices/components/invoice/new/Roundoff";
import { INVOICE_TYPE_DETAILS } from "@/features/invoices/constants/invoice-types";
import { getInvoiceCustomer } from "@/features/invoices/services/sqlite/customer";
import {
  deleteInvoice,
  getInvoice,
  issueInvoice,
} from "@/features/invoices/services/sqlite/invoice";
import {
  deleteInvoiceItem,
  getInvoiceItems,
} from "@/features/invoices/services/sqlite/item";
import { InvoiceCustomerDisplay } from "@/features/invoices/types/customer";
import { Invoice } from "@/features/invoices/types/invoice";
import { InvoiceItem } from "@/features/invoices/types/item";
import { calculateInvoiceSummary } from "@/features/invoices/utils/calculators/invoiceSummary";
import {
  mapInvoiceToDiscount,
  mapInvoiceToInfo,
  mapInvoiceToRoundoff,
} from "@/features/invoices/utils/mappers/invoice-mapper";
import globalStyles from "@/styles/globalStyles";
import { confirmDelete, showError, showSuccess } from "@/utils/alerts";
import { Feather } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Check Invoice Id existence
// Check Invoice Status === 'draft'

// Draft invoice: Recalculate everything whenever the invoice changes.
// Issued invoice: Never recalculate; use the stored values.

/**
 * Where sync_queue might contain:
 *
 * id
 * entity_type (invoice, customer, etc.)
 * entity_id
 * operation (create, update, delete)
 * status (pending, syncing, failed)
 * retry_count
 * last_error
 * created_at
 * updated_at
 */

export default function InvoiceIssueScreen() {
  const router = useRouter();
  const { invoiceId } = useLocalSearchParams();
  const [view, setView] = useState<"review" | "items">("review");

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [customer, setCustomer] = useState<InvoiceCustomerDisplay | null>(null);
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);

  const loadData = async () => {
    try {
      const [invoiceData, customerData, itemsData] = await Promise.all([
        getInvoice(invoiceId as string),
        getInvoiceCustomer(invoiceId as string),
        getInvoiceItems(invoiceId as string),
      ]);
      console.log(customerData);

      setInvoice(invoiceData);
      setCustomer(customerData);
      setInvoiceItems(itemsData);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch & Set Invoice Data
  useEffect(() => {
    loadData();
  }, [invoiceId]);

  if (!invoice) {
    return <ActivityIndicator />;
  }

  const info = mapInvoiceToInfo(invoice);
  const discount = mapInvoiceToDiscount(invoice);
  const roundOff = mapInvoiceToRoundoff(invoice);

  // Invoice Summary
  const summary = calculateInvoiceSummary(invoiceItems, invoice);

  // Handles adding a new invoice item to the current draft invoice.
  const handleAddInvoiceItem = (item: InvoiceItem) => {
    setInvoiceItems((prev) => [item, ...prev]);
  };

  // Handle Invoice Item Deletion
  const handleDeleteInvoiceItem = async (itemId: string) => {
    await deleteInvoiceItem(itemId, invoiceId as string);
    setInvoiceItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Handles issuing the current draft invoice.
  const handleIssueInvoice = async () => {
    if (!invoiceId) {
      Alert.alert("Delete failed!", "Invoice ID is missing.");
      return;
    }

    if (invoiceItems.length === 0) {
      Alert.alert(
        "Cannot issue invoice",
        "Add at least one item before issuing the invoice.",
      );
      return;
    }

    try {
      const result = await issueInvoice(invoiceId as string, invoice);
      if (!result.success) {
        Alert.alert(result.error.message);
        return;
      }

      showSuccess("Invoice issued successfully.", () =>
        router.replace(`/invoices/${result.data.id}`),
      );
    } catch (e) {
      console.log(e);
      showError("Something went wrong. Please try again.");
    }
  };

  // Handle deleting an invoice when in draft stage
  const handleInvoiceDelete = () => {
    const deleteFn = async () => {
      if (!invoiceId) {
        Alert.alert("Delete failed!", "Invoice ID is missing.");
        return;
      }

      try {
        const result = await deleteInvoice(invoiceId as string);

        if (!result.success) {
          Alert.alert("Delete failed!", result.error?.message);
          return;
        }

        showSuccess("Invoice deleted successfully.", () => router.back());
      } catch (e) {
        console.log(e);
        showError("Something went wrong. Please try again.");
      }
    };

    confirmDelete("Invoice", deleteFn);
  };

  const formData = customer
    ? (({ invoice_id, created_at, updated_at, bill_to_state, ship_to_state, ...data }) => data)(customer)
    : null;
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: `${INVOICE_TYPE_DETAILS[invoice?.invoice_type].title} (${invoice?.status})`,
        }}
      />
      <SafeAreaView edges={["bottom", "left", "right"]} style={globalStyles.safeAreaView}>
        {/* Screen View - Invoice Review */}
        {view === "review" && (
          <View style={[styles.section, { backgroundColor: gray[0] }]}>
            <ScrollView
              overScrollMode="never"
              bounces={false}
              alwaysBounceVertical={false}
              showsVerticalScrollIndicator={false}
            >
              <View style={{ flex: 1, gap: 10 }}>
                {/* Invoice Info */}
                <View style={styles.container}>
                  <InvoiceInfo data={info} />
                </View>

                {/* Invoice Customer */}
                <View style={styles.container}>
                  <InvoiceCustomer data={customer} />
                  <InvoiceCustomerFormComponent
                    invoiceId={invoice.id}
                    initialData={formData}
                    onChange={loadData}
                  />
                </View>

                {/* Invoice Items */}
                <View style={[styles.container, globalStyles.flex_items_center_spaced_between]}>
                  <Text style={styles.sectionHeaderTxt}>Items [{invoiceItems.length}]</Text>
                  <IconBtn
                    icon={Feather}
                    name="chevron-right"
                    color={gray[7]}
                    onPress={() => setView("items")}
                  />
                </View>

                {/* Invoice Actions */}
                <View style={[styles.container, { gap: 16 }]}>
                  <InvoiceDiscountComponent
                    invoiceId={invoice.id}
                    initialData={discount}
                    onChange={loadData}
                  />
                  <InvoiceRoundOffComponent
                    invoiceId={invoice.id}
                    initialData={roundOff}
                    preRoundOffTotalInPaise={200090}
                    onChange={loadData}
                  />
                </View>

                {/* Invoice Summary */}
                <View style={styles.container}>
                  <InvoiceSummaryComponent
                    summary={summary}
                  />
                </View>

                {/* Btn - Generate Invoice */}
                <View style={{ padding: 20, gap: 10 }}>
                  <ActionBtn
                    variant="filled"
                    iconName="file-plus"
                    btnLabel="Issue Invoice"
                    rippleColor={green[1]}
                    color={green[7]}
                    onPress={handleIssueInvoice}
                  />
                  <Text style={{ textAlign: "center", color: amber[7] }}>
                    Please review all invoice details carefully. Once generated,
                    the invoice cannot be edited.
                  </Text>
                </View>

                {/* Invoice Metadata */}
                <View style={styles.container}>
                  <InvoiceMeta
                    id={invoiceId as string}
                    invoice_type={invoice?.invoice_type}
                    created_at={invoice?.created_at}
                    updated_at={invoice?.updated_at}
                  />
                </View>

                {/* Delete Invoice */}
                <View style={{ padding: 20 }}>
                  <ActionBtn
                    variant="outlined"
                    iconName="file-plus"
                    btnLabel="Delete Invoice"
                    rippleColor={red[1]}
                    color={red[7]}
                    onPress={handleInvoiceDelete}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        )}

        {/* Screen View - Invoice Items */}
        {view === "items" && (
          <View style={[styles.section]}>
            <InvoiceItems
              items={invoiceItems}
              onDeleteItem={(itemId) => handleDeleteInvoiceItem(itemId)}
            />
            <View style={styles.invoiceItemComponentContainer}>
              <InvoiceItemComponent
                invoice_id={invoice?.id}
                invoice_type={invoice?.invoice_type}
                is_igst={invoice?.is_igst}
                onAddItem={(item) => handleAddInvoiceItem(item)}
              />
            </View>
            <Button
              title="Back to Review"
              onPress={() => setView("review")}
            />
          </View>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
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
