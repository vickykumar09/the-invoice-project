import { gray } from "@/constants/color-palettes";
import globalStyles from "@/styles/globalStyles";
import { getStateLabel } from "@/utils/helpers/getStateLabel";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { InvoiceCustomerData } from "../../types/customer";

// Address Formatter
const formatAddress = (
  line1?: string | null,
  line2?: string | null,
  city?: string | null,
  state?: string | null,
  pincode?: string | null,
) => {
  const address = [
    line1,
    line2,
    city,
    state && pincode ? `${state} - ${pincode}` : state || pincode,
  ]
    .filter(Boolean)
    .join(", ");

  return address || null;
};

export default function InvoiceCustomer({
  data,
}: {
  data: InvoiceCustomerData | null;
}) {
  if (!data) return;
  const {
    customer_id,
    bill_to_name,
    bill_to_address_line1,
    bill_to_address_line2,
    bill_to_city,
    bill_to_state_code,
    bill_to_pincode,
    bill_to_phone,
    bill_to_email,
    bill_to_gstin,
    is_shipping_same_as_billing,
    ship_to_name,
    ship_to_address_line1,
    ship_to_address_line2,
    ship_to_city,
    ship_to_state_code,
    ship_to_pincode,
    ship_to_phone,
    ship_to_email,
    ship_to_gstin,
  } = data;

  // Billing Address
  const billToState = getStateLabel(bill_to_state_code);
  const billingAddress = formatAddress(
    bill_to_address_line1,
    bill_to_address_line2,
    bill_to_city,
    billToState,
    bill_to_pincode,
  );

  // Shipping Address
  const shipToState = getStateLabel(ship_to_state_code ?? "");
  const shippingAddress = formatAddress(
    ship_to_address_line1,
    ship_to_address_line2,
    ship_to_city,
    shipToState,
    ship_to_pincode,
  );

  return (
    <View style={styles.container}>
      {/* Bill To */}
      <View>
        <View style={globalStyles.flex_items_center_spaced_between}>
          <Text style={styles.headerTxt}>Bill To :</Text>
          {customer_id && <Feather name="chevron-right" size={20} />}
        </View>
        <View>
          {bill_to_name && (
            <Text style={[{ color: gray[7], fontSize: 16 }]}>
              {bill_to_name}
            </Text>
          )}
          {bill_to_phone && (
            <Text style={{ color: gray[6] }}>{bill_to_phone}</Text>
          )}
          {billingAddress && <Text>{billingAddress}</Text>}
          {bill_to_email && (
            <Text style={{ color: gray[6] }}>{bill_to_email}</Text>
          )}
          {bill_to_gstin && (
            <Text style={styles.gstinTxt}>GSTIN: {bill_to_gstin}</Text>
          )}
        </View>
      </View>

      {/* Ship To */}
      <View>
        <Text style={styles.headerTxt}>Ship To :</Text>
        {Boolean(is_shipping_same_as_billing) ? (
          <View style={globalStyles.flex_items_center}>
            <FontAwesome6 name="check-square" color="blue" size={18} />
            <Text style={{ fontSize: 16, color: gray[6] }}>
              Same as billing address
            </Text>
          </View>
        ) : (
          <View>
            {ship_to_name && (
              <Text style={{ color: gray[7], fontSize: 16, fontWeight: "600" }}>
                {ship_to_name}
              </Text>
            )}
            {ship_to_phone && (
              <Text style={{ color: gray[6], letterSpacing: 0.5 }}>
                {ship_to_phone}
              </Text>
            )}
            {shippingAddress && <Text>{shippingAddress}</Text>}
            {ship_to_email && (
              <Text style={{ color: gray[6] }}>{ship_to_email}</Text>
            )}
            {ship_to_gstin && (
              <Text style={styles.gstinTxt}>GSTIN: {ship_to_gstin}</Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  headerTxt: {
    fontFamily: "RajdhaniBold",
    fontSize: 20,
    letterSpacing: 0.5,
  },
  gstinTxt: {
    marginTop: 12,
    fontFamily: "RajdhaniSemiBold",
    fontSize: 16,
  },
});
