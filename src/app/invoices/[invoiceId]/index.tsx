import IconBtn from "@/components/IconBtn";
import ActionBtn from "@/components/ui/buttons/ActionBtn";
import TextLink from "@/components/ui/TextLink";
import { blue, gray, orange, rose } from "@/constants/color-palettes";
import InvoiceCustomer from "@/features/invoices/components/invoice/Customer";
import InvoiceDetails from "@/features/invoices/components/invoice/Details";
import InvoiceInfo from "@/features/invoices/components/invoice/Info";
import InvoiceMeta from "@/features/invoices/components/invoice/Meta";
import InvoiceSummaryComponent from "@/features/invoices/components/invoice/Summary";
import { INVOICE_TYPE_DETAILS } from "@/features/invoices/constants/invoice-types";
import { getInvoiceCustomer } from "@/features/invoices/services/sqlite/customer";
import { getInvoice } from "@/features/invoices/services/sqlite/invoice";
import { InvoiceCustomerDisplay } from "@/features/invoices/types/customer";
import { Invoice } from "@/features/invoices/types/invoice";
import {
  mapInvoice,
  mapInvoiceToInfo,
  mapInvoiceToSummary,
} from "@/features/invoices/utils/mappers/invoice-mapper";
import { INVOICE_PAYMENT_SCHEMA } from "@/libs/db/schemas/invoice";
import globalStyles from "@/styles/globalStyles";
import { createTable } from "@/utils/system/storage";
import { Feather, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InvoiceScreen() {
  const router = useRouter();
  const { invoiceId } = useLocalSearchParams();

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [customer, setCustomer] = useState<InvoiceCustomerDisplay | null>(null);
  
  const loadData = async () => {
    try {
      const data = await getInvoice(invoiceId as string);
      const custom = await getInvoiceCustomer(invoiceId as string);
      setInvoice(data);
      setCustomer(custom)
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
            {/* <View
              style={[
                styles.container,
                globalStyles.flex_items_center_spaced_between,
                
              ]}
            >
              <Text
                style={{
                  fontFamily: "RajdhaniBold",
                  fontSize: 20,
                  letterSpacing: 0.5,
                }}
              >
                Items (0)
              </Text>
              <IconBtn
                icon={Feather}
                name="chevron-right"
                onPress={() => {
                  router.push({
                    pathname: "/invoices/[invoiceId]/items",
                    params: {
                      invoiceId: invoiceId as string,
                    },
                  });
                }}
              />
            </View> */}

            {/* Invoice Summary */}
            <View style={styles.container}>
              <InvoiceSummaryComponent summary={summary} />
            </View>

            <View style={{padding: 20}}>
              <Text style={{textAlign: 'center', color: rose[5]}}>This is the invoice you created now to add other details pleasse visit below.</Text>
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

            {/* Internal Note */}
            <View style={{ padding: 0 , paddingTop: 20 }}>
              <View style={[globalStyles.flex_items_center_spaced_between, {paddingHorizontal: 20}]}>
                <Text style={{ fontFamily: "NunitoBold", fontSize: 16 }}>
                  Note
                </Text>
                <Text>Edit</Text>
              </View>
              <View
                style={{
                  padding: 20,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: gray[1],
                  backgroundColor: "white",
                }}
              >
                {invoice?.internal_note ? (
                  <Text style={{ color: gray[5] }}>
                    This invoice must be treated as null since the transaction
                    was duplicated yes but needss to be studied and therefore
                    to be made compulsorey
                  </Text>
                ) : (
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8}}>
                    <FontAwesome6 name="plus" color={blue[7]} size={18} />
                    <TextLink
                      text="Add Internal Note"
                      onPress={() => createTable(false, 'invoice_payments', INVOICE_PAYMENT_SCHEMA)}
                      size={16}
                      color={blue[7]}
                    />
                  </View>
                )}
              </View>
            </View>

            {/* Invoice Feedback */}
            <View style={{}}>
              <Text style={{ fontFamily: "NunitoBold", fontSize: 16, paddingHorizontal: 20, paddingTop: 20 }}>
                Customer Feedback
              </Text>
              <View
                style={{
                  padding: 20,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: gray[1],
                  backgroundColor: "white",
                }}
              >
                <Text>No Feedback Yet</Text>
                <Text>Rating</Text>
                <Text>Comment</Text>
                <Text>Submitted at</Text>
              </View>
            </View>

            {/* View Invoice History */}
            <View style={{ padding: 20, gap: 34 }}>

              <ActionBtn
                variant="outlined"
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
});
