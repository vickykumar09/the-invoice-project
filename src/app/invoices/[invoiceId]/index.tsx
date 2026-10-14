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
import { INVOICE_TYPE_DETAILS } from "@/features/invoices/constants/invoice-types";
import { getInvoiceCustomer } from "@/features/invoices/services/sqlite/customer";
import { getInvoice } from "@/features/invoices/services/sqlite/invoice";
import { InvoiceCustomerDisplay } from "@/features/invoices/types/customer";
import { Invoice } from "@/features/invoices/types/invoice";
import { mapInvoice, mapInvoiceToSummary } from "@/features/invoices/utils/mappers/invoice-mapper";
import DatePicker from "@/form/components/DatePicker";
import globalStyles from "@/styles/globalStyles";
import { formatDateString } from "@/utils/date-time/format";
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

  const [editInternalNote, setEditInternalNote] = useState<boolean>(false)

  
  const loadData = async () => {
    try {
      const data = await getInvoice(invoiceId as string);
      const custom = await getInvoiceCustomer(invoiceId as string);
      setInvoice(data);
      setCustomer(custom);
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

  const transactions = [
    {
      icon: "rupee-sign",
      title: "Payments",
      subtitle: "Review and record payments",
      path: "payments",
    },
    {
      icon: "file-minus",
      title: "Credit Notes",
      subtitle: "Issue and manage credits",
      path: "credit-notes",
    },
    {
      icon: "file-plus",
      title: "Debit Notes",
      subtitle: "Issue and manage debits",
      path: "debit-notes",
    },
    {
      icon: "undo",
      title: "Refunds",
      subtitle: "Process and issue refunds",
      path: "refunds",
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: `${INVOICE_TYPE_DETAILS[invoice?.invoice_type].title} Details`,
        }}
      />
      <SafeAreaView
        edges={["bottom", "left", "right"]}
        style={globalStyles.safeAreaView}
      >
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
            <View style={styles.container}>
              <View style={globalStyles.flex_items_center_spaced_between}>
                <Text style={{ fontFamily: "RajdhaniBold", fontSize: 20, letterSpacing: 0.5 }}>
                  Items
                </Text>
                <Text>
                  0
                </Text>
              </View>
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
            </View>

            {/* Invoice Summary */}
            <View style={styles.container}>
              <InvoiceSummaryComponent summary={summary} />
              <View style={{borderTopWidth: 1,  paddingTop: 10, gap: 10, borderStyle: 'dotted'}}>
                <View style={globalStyles.flex_items_center_spaced_between}>
                  <Text>Paid Total</Text>
                  <Text>0</Text>
                </View>

                <View style={globalStyles.flex_items_center_spaced_between}>
                  <Text>Balance Due</Text>
                  <Text>0</Text>
                </View>

              </View>
            </View>
            
            {/* Payment Due Date */}
            <View style={styles.section_two}>
              <InvoicePaymentDue/>
            </View>

            {/* Invoice Transactions - Payments, Credit Notes, Debit Notes & Refunds */}
            <View style={styles.container}>
              {transactions.map((each) => {
                const { icon, title, subtitle, path } = each;
                return (
                  <View
                    key={each.title}
                    style={[
                      globalStyles.flex_items_center_spaced_between,
                      {
                        paddingVertical: 14,
                      },
                    ]}
                  >
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
                        <Text style={{ color: gray[6] }}>{subtitle}</Text>
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

            {/* Internal Note */}
            <View style={styles.section_two}>
              <InvoiceInternalNote/>
            </View>

            {/* Invoice Transport Details */}
            <View style={styles.container}>
              <View style={[globalStyles.flex_items_center_spaced_between]}>
                <View style={globalStyles.flex_items_center}>
                  <View style={globalStyles.iconWrapper}>
                    <Feather color={gray[5]} name={"truck"} size={26} />
                  </View>
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: 600 }}>
                      Transport Details
                    </Text>
                    <Text style={{ color: gray[6] }}>getTotknow</Text>
                  </View>
                </View>
                <IconBtn
                  icon={Feather}
                  name="chevron-right"
                  onPress={() => {
                    router.push({
                      pathname: `/invoices/[invoiceId]/dispatch`,
                      params: {
                        invoiceId: invoiceId as string,
                      },
                    });
                  }}
                />
              </View>
            </View>

            {/* Invoice Feedback - make it conditional */}
            <View style={styles.section_two}>
              <InvoiceFeedback/>
            </View>

            {/* View Invoice History */}
            <View style={{ padding: 20, paddingHorizontal: 32, }}>

              <ActionBtn
                variant="filled"
                iconName="eye"
                btnLabel="View Invoice History"
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

            {/* Invoice Metadata */}
            <View style={styles.container}>
              <InvoiceMeta
                id={invoiceId as string}
                invoice_type={invoice?.invoice_type}
                created_at={invoice?.created_at}
                updated_at={invoice?.updated_at}
              />
            </View>

            {/* Download Invoice Btn */}
            <View style={{ padding: 20 }}>

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
  }
});
