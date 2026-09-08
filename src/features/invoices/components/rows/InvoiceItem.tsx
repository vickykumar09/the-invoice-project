import { blue, gray, green, lime, purple } from "@/constants/color-palettes";
import globalStyles from "@/styles/globalStyles";
import { fromPaise } from "@/utils/money/convert";
import { StyleSheet, Text, View } from "react-native";
import { InvoiceItem } from "../../types/item";

type InvoiceItemRowProps = {
  item: InvoiceItem;
  selected?: boolean;
};

export function InvoiceItemRow({ item, selected }: InvoiceItemRowProps) {
  return (
    <View
      style={[
        globalStyles.cardContainer,
        globalStyles.flex_items_center,
        selected && { backgroundColor: blue[0] },
      ]}
    >
      <View style={{ flex: 1, gap: 0 }}>
        {Object.entries(item).map(([key, value]) => {
          return (
            <View
              key={key}
              style={globalStyles.flex_items_center_spaced_between}
            >
              <Text>{key}</Text>
              <Text>
                {typeof value} {value}
              </Text>
            </View>
          );
        })}
        {/* Top Row */}
        <View style={[globalStyles.flex_items_center_spaced_between]}>
          <Text
            style={{ fontWeight: 600, fontSize: 16, flexShrink: 1 }}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text style={{ color: purple[9], fontWeight: 600, fontSize: 16 }}>
            ₹{fromPaise(item.total_amount).toFixed(2)}
          </Text>
        </View>

        {/* Bottom Row */}
        <View style={[globalStyles.flex_items_center_spaced_between]}>
          <Text style={{ color: gray[5] }}>
            {item.quantity} {item.measure_unit}
          </Text>
          <Text style={{ color: gray[7] }}>
            ₹{fromPaise(item.rate).toFixed(2)}
          </Text>
        </View>

        {/* Bottom Row */}
        <View
          style={[
            globalStyles.flex_items_center_spaced_between,
            { marginTop: 8 },
          ]}
        >
          <Text
            style={{
              color: green[7],
              paddingHorizontal: 8,
              borderRadius: 8,
              fontWeight: 600,
              backgroundColor: lime[0],
            }}
          >
            {fromPaise(item.discount_amount).toFixed(2)}
            {item.discount_type === "fixed"}
            {item.discount_type === "percentage" && "%"} off
          </Text>
          <Text style={{ color: blue[9] }}>{item.tax_rate}% GST (Incl.)</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
