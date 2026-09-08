import { gray, green } from "@/constants/color-palettes";
import globalStyles from "@/styles/globalStyles";
import { formatDateString, getSmartTimestamp } from "@/utils/date-time/format";
import { formatCurrency } from "@/utils/money/format";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { INVOICE_TYPE_DETAILS } from "../../constants/invoice-types";

export const InvoiceRow = React.memo(function InvoiceRow({
  item,
}: {
  item: any;
}) {
  const router = useRouter();
  const itemStatus = item.status.toUpperCase();

  const date = new Date(item.created_at);

  const weekday = date
    .toLocaleDateString("en-US", { weekday: "short" })
    .toUpperCase();

  const pathname =
    item.status === "draft"
      ? "/invoices/new/[invoiceId]"
      : "/invoices/[invoiceId]";

  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: pathname,
          params: {
            invoiceId: item.id,
          },
        });
      }}
      android_ripple={{ color: gray[0] }}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
    >
      {/* Top */}
      <View style={styles.section}>
        <View style={[styles.dateBadge, { backgroundColor: gray[1] }]}>
          <Text style={styles.date}>{date.getDate()}</Text>
          <Text style={styles.day}>{weekday}</Text>
        </View>

        <View style={{ flex: 1, paddingBottom: 4 }}>
          <View style={[globalStyles.flex_items_center_spaced_between]}>
            <Text style={{ color: gray[5], fontSize: 13, lineHeight: 14 }}>
              {item.invoice_number ?? "- - - - - -"}
            </Text>
            <Text style={{ color: gray[5], fontSize: 13 }}>
              {formatDateString(item.invoice_date)}
            </Text>
          </View>

          <View style={globalStyles.flex_items_center_spaced_between}>
            <Text
              style={{ fontWeight: 600, fontSize: 16, flexShrink: 1 }}
              numberOfLines={1}
            >
              {item.bill_to_name ??
                INVOICE_TYPE_DETAILS[item?.invoice_type].title}
            </Text>
            <Text style={{ color: gray[9], fontSize: 16 }}>
              {formatCurrency(item.grand_total)}
            </Text>
          </View>
        </View>
      </View>

      {/* Bottom */}
      <View style={styles.section}>
        <View style={styles.dateBadge} />
        <View
          style={[globalStyles.flex_items_center_spaced_between, { flex: 1 }]}
        >
          <Text style={{ color: green[7], fontWeight: 600, fontSize: 12 }}>
            {itemStatus}
          </Text>
          <Text style={{ color: gray[4], fontSize: 13 }}>
            {getSmartTimestamp(item.updated_at)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
});

// Under 24 Hours: Use relative hours (e.g., "Updated 3 hours ago").
// Under 7 Days: Use relative days (e.g., "Updated 3 days ago")
// to emphasize recent weekly activity.Older than 7 Days:
// Switch to the full date (e.g., "Updated on 22 May 2026").

const styles = StyleSheet.create({
  pressable: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  pressed: {
    opacity: 0.7,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dateBadge: {
    width: 40,
    alignSelf: "stretch",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    fontSize: 15,
    lineHeight: 15,
    fontWeight: 600,
    color: gray[7],
  },
  day: {
    fontSize: 10,
    color: gray[5],
    letterSpacing: 0.5,
  },
});
