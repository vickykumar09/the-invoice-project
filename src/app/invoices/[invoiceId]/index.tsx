import IconBtn from "@/components/IconBtn";
import ActionBtn from "@/components/ui/buttons/ActionBtn";
import TextLink from "@/components/ui/TextLink";
import { blue, gray, orange, red, rose } from "@/constants/color-palettes";
import InvoiceCustomer from "@/features/invoices/components/invoice/Customer";
import InvoiceDetails from "@/features/invoices/components/invoice/Details";
import InvoiceFeedback from "@/features/invoices/components/invoice/Feedback";
import InvoiceInfo from "@/features/invoices/components/invoice/Info";
import InvoiceInternalNote from "@/features/invoices/components/invoice/InternalNote";
import InvoiceMeta from "@/features/invoices/components/invoice/Meta";
import InvoicePaymentDue from "@/features/invoices/components/invoice/PaymentDue";
import InvoiceSummaryComponent from "@/features/invoices/components/invoice/Summary";
import { InvoiceItemRow } from "@/features/invoices/components/rows/InvoiceItem";
import { INVOICE_TYPE_DETAILS } from "@/features/invoices/constants/invoice-types";
import { getInvoiceCustomer } from "@/features/invoices/services/sqlite/customer";
import { getInvoice } from "@/features/invoices/services/sqlite/invoice";
import { getFirstFiveInvoiceItems } from "@/features/invoices/services/sqlite/item";
import { InvoiceCustomerDisplay } from "@/features/invoices/types/customer";
import { Invoice } from "@/features/invoices/types/invoice";
import { InvoiceItem } from "@/features/invoices/types/item";
import { mapInvoice, mapInvoiceToSummary } from "@/features/invoices/utils/mappers/invoice-mapper";
import DatePicker from "@/form/components/DatePicker";
import globalStyles from "@/styles/globalStyles";
import { formatDateString } from "@/utils/date-time/format";
import { fromPaise } from "@/utils/money/convert";
import { formatCurrency } from "@/utils/money/format";
import { Feather, FontAwesome, FontAwesome5, FontAwesome6, Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InvoiceScreen() {
  const router = useRouter();
  const { invoiceId } = useLocalSearchParams();

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [customer, setCustomer] = useState<InvoiceCustomerDisplay | null>(null);
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([])

  
  const loadData = async () => {
    try {
      const [invoiceData, customerData, itemsData] = await Promise.all([
        getInvoice(invoiceId as string),
        getInvoiceCustomer(invoiceId as string),
        getFirstFiveInvoiceItems(invoiceId as string),
      ]);

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

  const { info, details } = mapInvoice(invoice)
  const summary = mapInvoiceToSummary(invoice);

  const sections = [
    {
      icon: "repeat",
      title: "Transactions",
      subtitle: "Payments, Credit Notes, Debit Notes, Refunds",
      path: "transactions",
    },
    {
      icon: "truck",
      title: "Dispatch Details",
      subtitle: "Track dispatch status and delivery details",
      path: "dispatch",
    },
    {
      icon: "list",
      title: "History",
      subtitle: "Track changes and updates to this invoice",
      path: "history",
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: `${INVOICE_TYPE_DETAILS[invoice?.invoice_type].title} Details`,
        }}
      />
      <SafeAreaView edges={["bottom", "left", "right"]} style={globalStyles.safeAreaView}>
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

            {/* Invoice Details */}
            <View style={styles.container}>
              <InvoiceDetails data={details} />
            </View>

            {/* Invoice Customer */}
            <View style={styles.container}>
               <InvoiceCustomer
                  data={customer}
                />
            </View>

            {/* Invoice Items */}
            <View style={[styles.container, {paddingHorizontal: 0}]}>
              <View style={[globalStyles.flex_items_center_spaced_between, {paddingHorizontal: 20}]}>
                <Text style={{ fontFamily: "RajdhaniBold", fontSize: 20, letterSpacing: 0.5 }}>
                  Items
                </Text>
                <Text>
                  0
                </Text>
              </View>
              {invoiceItems.map((each) => {
                return (
                  <InvoiceItemRow
                    key={each.id}
                    invoice_id={invoice.id}
                    invoice_status={invoice.status}
                    invoice_type={invoice.invoice_type}
                    is_igst={invoice.is_igst}
                    item={each}
                    onDeleteItem={() => console.log('dedd')}
                  />
                )
              })}

              {invoiceItems.length === 5 &&
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <TextLink
                    text='View All'
                    size={18}
                    onPress={() => {
                    router.push({
                        pathname: "/invoices/[invoiceId]/items",
                        params: {
                          invoiceId: invoiceId as string,
                        },
                      });
                    }}
                    color={blue[7]}
                  />
                </View>
              }
            </View>

            {/* Invoice Summary */}
            <View style={styles.container}>
              <InvoiceSummaryComponent summary={summary} />
              <View style={{borderTopWidth: 1,  paddingTop: 10, gap: 10, borderStyle: 'dotted'}}>
                <View style={globalStyles.flex_items_center_spaced_between}>
                  <Text style={styles.titleTxt}>Paid Total</Text>
                  <Text style={styles.valueTxt}>{formatCurrency(fromPaise(invoice.paid_total))}</Text>
                </View>

                <View style={globalStyles.flex_items_center_spaced_between}>
                  <Text style={styles.titleTxt}>Balance Due</Text>
                  <Text style={styles.valueTxt}>{formatCurrency(fromPaise(invoice.grand_total - invoice.paid_total))}</Text>
                </View>

              </View>
            </View>
            
            {/* End message */}
            <View style={styles.section_two}>
              <Text style={{textAlign: 'center', color: rose[6]}}>This is the invoice now below are the invoice actions</Text>
            </View>

            {/* Invoice Transactions, Invoice Dispatch Details, Invoice History */}
            <View style={styles.container}>
              {sections.map((each) => {
                const { icon, title, subtitle, path } = each;
                return (
                  <View key={each.title} style={[globalStyles.flex_items_center_spaced_between, { paddingVertical: 14 }]}>
                    <View style={globalStyles.flex_items_center}>
                      <View style={globalStyles.iconWrapper}>
                        {["rupee-sign", "undo"].includes(icon) ? (
                          <FontAwesome5 color={gray[5]} name={icon} size={24} />
                        ) : (
                          <Feather
                            color={gray[5]}
                            name={icon as keyof typeof Feather.glyphMap}
                            size={26}
                          />
                        )}
                      </View>
                      <View>
                        <Text style={{ fontSize: 16, fontWeight: 600 }}>
                          {title}
                        </Text>
                        <Text style={{ color: gray[6], flexShrink: 1, flex: 1 }} numberOfLines={1} ellipsizeMode="tail">{subtitle}</Text>
                      </View>
                    </View>
                    <IconBtn
                      icon={Feather}
                      name="chevron-right"
                      onPress={() => {
                        router.push({
                          pathname: `/invoices/[invoiceId]/${path}`,
                          params: {
                            invoiceId: invoiceId as string,
                          },
                        });
                      }}
                    />
                  </View>
                );
              })}
            </View>

            {/*Invoice Payment Due Date */}
            <View style={[styles.section_two,]}>
              <InvoicePaymentDue
                issue_date={invoice.invoice_date}
                payment_due_date={invoice.payment_due_date}
              />
            </View>

            {/* Invoice Internal Note */}
            <View style={styles.section_two}>
              <InvoiceInternalNote
                internal_note={invoice.internal_note}
              />
            </View>

            {/* Invoice Feedback */}
            <View style={styles.section_two}>
              <InvoiceFeedback/>
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

            {/* Cancel Invoice */}
            <View style={styles.section_two}>
              <ActionBtn
                variant="filled"
                iconName="eye"
                btnLabel="Cancel Invoice"
                rippleColor={rose[1]}
                color={rose[7]}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  router.push({
                    pathname: "/invoices/[invoiceId]/history",
                    params: {
                      invoiceId: invoiceId as string,
                    },
                  });
                }}
              />
            </View>

            {/* Download Invoice*/}
            <View style={styles.section_two}>

              <ActionBtn
                variant="filled"
                iconName="download"
                btnLabel="Download Invoice"
                rippleColor={rose[1]}
                color={rose[7]}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  router.push({
                    pathname: "/invoices/[invoiceId]/preview",
                    params: {
                      invoiceId: invoiceId as string,
                    },
                  });
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: gray[1],
    backgroundColor: "white",
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: gray[1],
    backgroundColor: "white",
  },
  section_two: {
    padding: 12,
    paddingHorizontal: 20
  },
  titleTxt: {
    fontSize: 15,
    color: gray[6],
  },
  valueTxt: {
    fontSize: 15,
  },
});
