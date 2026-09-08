import globalStyles from "@/styles/globalStyles";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { gray, orange } from "@/constants/color-palettes";
import type { MonthlyAnalyticsCardProps } from "@/features/invoices/types";
import { formatCurrency } from "@/utils/money/format";

export function MonthlyAnalyticsCard({
  monthKey,
  monthLabel,
  totalAmount,
  totalInvoices,
}: MonthlyAnalyticsCardProps) {
  const router = useRouter();

  function getMonthParts(monthKey: string) {
    const [year, month] = monthKey.split("-");

    return {
      year,
      shortMonth: new Date(Number(year), Number(month) - 1).toLocaleString(
        "en-US",
        {
          month: "short",
        },
      ),
    };
  }

  const { shortMonth, year } = getMonthParts(monthKey);

  return (
    <Pressable
      key={monthKey}
      android_ripple={{ color: gray[2] }}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
      onPress={() => {
        router.push({
          pathname: `/invoices/analytics/[monthKey]`,
          params: {
            monthKey: monthKey,
            monthLabel: monthLabel,
          },
        });
      }}
    >
      <View style={styles.monthBadge}>
        <Text style={styles.month}>{shortMonth.toUpperCase()}</Text>
        <Text style={styles.year}>{year}</Text>
      </View>

      <View style={styles.detailsContainer}>
        {/* Top Row - Total Revenue */}
        <Text style={styles.amount}>{formatCurrency(totalAmount)}</Text>

        {/* Bottom Row - Total Invoices & Balance Due */}
        <View style={globalStyles.flex_items_center_spaced_between}>
          <Text style={{ color: gray[5] }}>{totalInvoices} invoices</Text>
          <Text style={{ color: orange[7] }}>Due:{monthKey}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  pressed: {
    backgroundColor: gray[0],
  },
  monthBadge: {
    padding: 6,
    paddingHorizontal: 8,
    backgroundColor: gray[1],
    borderRadius: 8,
    alignItems: "center",
  },
  month: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: 600,
    color: gray[7],
  },
  year: {
    fontSize: 11,
    color: gray[5],
    letterSpacing: 0.5,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  amount: {
    fontSize: 16,
    fontWeight: 600,
  },
});
