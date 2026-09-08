import { gray } from "@/constants/color-palettes";
import globalStyles from "@/styles/globalStyles";
import { getRoundOffSign } from "@/utils/helpers/getRoundOffSign";
import { fromPaise } from "@/utils/money/convert";
import { formatCurrency } from "@/utils/money/format";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { InvoiceSummary } from "../../types/invoice";

export default function InvoiceSummaryComponent({
  summary,
}: {
  summary: InvoiceSummary;
}) {
  const {
    is_igst,
    subtotal,
    item_discounts_total,
    coupon_discount_amount,
    invoice_discount_amount,
    discounts_total,
    taxable_amount,
    cgst_total,
    sgst_total,
    igst_total,
    cess_total,
    tax_total,
    round_off_mode,
    round_off_amount,
    grand_total,
  } = summary;

  const summaryItems = [
    {
      title: "Subtotal (Excl. GST)",
      amount: subtotal,
    },
    {
      title: "Discounts",
      amount: discounts_total, // total discount
      breakdown: [
        { title: "Item Discounts", amount: item_discounts_total },
        { title: "Coupon Discount", amount: coupon_discount_amount },
        { title: "Invoice Discount", amount: invoice_discount_amount },
      ],
    },
    {
      title: "Taxable Amount",
      amount: taxable_amount,
    },
    {
      title: "Taxes",
      amount: tax_total,
      breakdown: is_igst
        ? [
            { title: "IGST", amount: igst_total },
            { title: "CESS", amount: cess_total },
          ]
        : [
            { title: "CGST", amount: cgst_total },
            { title: "SGST", amount: sgst_total },
            { title: "CESS", amount: cess_total },
          ],
    },
    {
      title: "Round Off",
      amount: round_off_amount,
    },
  ];

  const [expanded, setExpanded] = useState<string[]>([]);
  const toggleSection = (title: string) => {
    setExpanded((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title],
    );
  };

  return (
    <View style={{ gap: 8 }}>
      <View style={globalStyles.flex_items_center_spaced_between}>
        <Text
          style={{
            fontFamily: "RajdhaniBold",
            fontSize: 20,
            letterSpacing: 0.5,
          }}
        >
          Summary
        </Text>
      </View>

      <View style={{ gap: 6 }}>
        {summaryItems.map((each) => {
          const { title, amount, breakdown } = each;
          return (
            <View key={title}>
              <View style={globalStyles.flex_items_center_spaced_between}>
                <Pressable
                  onPress={() => toggleSection(title)}
                  style={[globalStyles.flex_items_center, { gap: 2 }]}
                >
                  <Text style={styles.titleTxt}>{title}</Text>

                  {breakdown && (
                    <Feather
                      name={
                        expanded.includes(title) ? "chevron-up" : "chevron-down"
                      }
                      size={16}
                      style={{ marginTop: 4 }}
                    />
                  )}
                </Pressable>
                <Text style={styles.valueTxt}>
                  {title === "Round Off" && getRoundOffSign(round_off_mode)}
                  {formatCurrency(fromPaise(amount))}
                </Text>
              </View>

              <View style={{ gap: 6, marginLeft: 12, marginTop: 6 }}>
                {expanded.includes(title) &&
                  breakdown?.map((detail) => (
                    <View
                      key={detail.title}
                      style={globalStyles.flex_items_center_spaced_between}
                    >
                      <Text style={styles.titleTxt}>{detail.title}</Text>
                      <Text style={styles.valueTxt}>
                        {formatCurrency(fromPaise(detail.amount))}
                      </Text>
                    </View>
                  ))}
              </View>
            </View>
          );
        })}
      </View>

      {/* Grand Total */}
      <View
        style={[
          globalStyles.flex_items_center_spaced_between,
          { borderTopWidth: 1, borderStyle: "dotted", paddingVertical: 8 },
        ]}
      >
        <Text style={{ fontSize: 16, fontWeight: 600, color: gray[6] }}>
          Grand Total
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 600 }}>
          {formatCurrency(fromPaise(grand_total))}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleTxt: {
    fontSize: 15,
    color: gray[6],
  },
  valueTxt: {
    fontSize: 15,
  },
});
