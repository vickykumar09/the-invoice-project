import { generateInvoiceNumber } from "@/features/invoices/utils/generators/invoice";
import globalStyles from "@/styles/globalStyles";
import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

import { businessInfo } from "@/constants/business";
import { gray } from "@/constants/color-palettes";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { generateInvoicePdf } from "@/features/invoices/utils/generators/generateInvoicePdf";
import { formatDateString } from "@/utils/date-time/format";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export default function InvoicePreviewScreen() {
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [loadingPdf, setLoadingPdf] = useState(false);

  useEffect(() => {
    const handleGeneratePdf = async () => {
      try {
        setLoadingPdf(true);

        const uri = await generateInvoicePdf();

        setPdfUri(uri);
      } finally {
        setLoadingPdf(false);
      }
    };
    handleGeneratePdf();
  }, []);

  const handleShare = async () => {
    await Sharing.shareAsync(pdfUri as string);
  };

  const handlePrint = async () => {
    await Print.printAsync({ uri: pdfUri as string });
  };

  return (
    <>
      <SafeAreaView
        edges={["bottom", "left", "right"]}
        style={globalStyles.safeAreaView}
      >
        <Button title="Print" onPress={handlePrint} />

        <Button title="Share" onPress={handleShare} />
        <ScrollView>
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderBottomWidth: 1,
              borderBottomColor: gray[2],
            }}
          >
            {/* Supplier Details */}
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ddd",
                backgroundColor: "white",
              }}
            >
              <View style={globalStyles.flex_items_center}>
                <View style={globalStyles.iconWrapper}></View>
                <Text style={{ fontWeight: 600, fontSize: 16 }}>
                  MODERN CLOTHING For womens, mens, girls and boys
                </Text>
              </View>
              <Text style={{ textAlign: "left" }}>
                C-29, East Ram Krishna Nagar, Near NH-30, Ram Lakhan Path Patna,
                Bihar - 8044653
              </Text>
              <Text style={{ textAlign: "left", marginTop: 6 }}>
                CIN No: 99999999999(only for registered companies)
              </Text>
              <Text>GSTIN No: 678976869797987979</Text>
            </View>

            {/* Header */}
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: 800,
                  marginBottom: 12,
                }}
              >
                TAX INVOICE
              </Text>
              <Text>Invoice Number: {generateInvoiceNumber(90)}</Text>
              <Text>
                Invoice Date :{" "}
                {formatDateString(new Date().toISOString(), true)}
              </Text>
              <Text>Status (Paid / Due / Cancelled)</Text>
            </View>

            {/* Invoice Details */}
            <View style={{ backgroundColor: "white" }}>
              <Text>Counter No. :</Text>
              <Text>Cashier ID :</Text>
              <Text>Purchase Type : </Text>
              <Text>
                Place Of Supply - Depends on Buyer : {businessInfo.address.city}
                , {businessInfo.address.state}
              </Text>
            </View>

            {/* Customer - Billing & Shipping Info */}
            <View style={{ backgroundColor: "white", gap: 16 }}>
              {/* Bill To */}
              <View>
                <Text style={{ fontSize: 16, fontWeight: 700 }}>Bill To:</Text>
                <Text>Vicky Kumar</Text>
                <Text>
                  Near Sector 47, Towars Mid Point, East Ram Krishna Nagar,
                  Patna - 804453
                </Text>
                <Text>GSTIN(if available)</Text>
              </View>

              {/* Ship To */}
              <View>
                <Text style={{ fontSize: 16, fontWeight: 700 }}>Ship To:</Text>
                <Text>Name</Text>
                <Text>Address</Text>
                <Text>GSTIN(if available)</Text>
              </View>
            </View>

            {/* Items Purchsed or service used INfo */}
            <View
              style={{
                paddingVertical: 8,
                paddingHorizontal: 0,
                borderTopWidth: 2,
                borderBottomWidth: 2,
              }}
            >
              <View>
                <Text style={{ fontFamily: "Norwester", fontSize: 18 }}>
                  Items
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: 800 }}>
                    S.No. Product Name (HSN)
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>Rate</Text>
                  <Text>Quantity</Text>
                  <Text>Amount</Text>
                  <Text>Discount</Text>
                  <Text>Net Amt.</Text>
                </View>
                {/* <View
                  style={{
                    flex: 1,
                    padding: 2,
                    borderRadius: 4,
                    flexDirection: "row",
                    borderTopWidth: 1,
                    marginTop: 2,
                    borderTopColor: "rgba(0,0,0,0.1)",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>Taxable Amt.</Text>
                  <Text>CGST </Text>
                  <Text>SGST</Text>
                  <Text>IGST</Text>
                  <Text>CESS</Text>
                </View> */}
              </View>
            </View>
            {/* Sub Total  */}
            <View style={{ padding: 20, backgroundColor: "white" }}>
              <Text style={{ fontFamily: "Norwester", fontSize: 18 }}>
                SUB TOTALS
              </Text>
              <Text>Total Base Amount</Text>
              <Text>Items Discount</Text>
              <Text>Coupon Discount</Text>
              <Text>Invoice Discount</Text>
              <Text>Total Taxable Amount</Text>
              <Text>GRoss Total</Text>
            </View>
            {/* Discounts */}
            {/* Gross Total */}

            {/* Tax Details */}
            <View>
              <Text style={{ fontFamily: "Norwester", fontSize: 18 }}>
                Tax Details
              </Text>
              <Text>Items Taxable Value CGST SGST IGST CESS Total Amount</Text>
              <Text>10 Mar UPI TXN123 ₹2000</Text>
              <Text>12 Mar Cash ₹500</Text>
              <Text>Total</Text>
            </View>

            {/* Payment Details */}
            <View>
              <Text style={{ fontFamily: "Norwester", fontSize: 18 }}>
                Payment Details
              </Text>
              <Text>Date Method Reference Amount</Text>
              <Text>10 Mar UPI TXN123 ₹2000</Text>
              <Text>12 Mar Cash ₹500</Text>
            </View>

            {/* Credit Note Details If Issued */}
            {/* Balance Summary */}
            {/* Other Details */}
            {/* Share & Preview */}
          </View>

          {/* Share, Print & Download */}
          <View
            style={[
              globalStyles.flex_items_center_spaced_between,
              { padding: 20, gap: 20 },
            ]}
          >
            <View
              style={{
                gap: 4,
                flex: 1,
                justifyContent: "center",
                backgroundColor: "white",
                alignItems: "center",
                padding: 12,
                paddingHorizontal: 20,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: gray[2],
              }}
            >
              <Feather name="share" size={28} />
              <Text>Share</Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                padding: 12,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: gray[2],
              }}
            >
              <Feather name="printer" size={28} />
              <Text>Print</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "white",
                alignItems: "center",
                padding: 12,
                paddingHorizontal: 20,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: gray[2],
              }}
            >
              <Feather name="download" size={28} />
              <Text>Download</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({});
