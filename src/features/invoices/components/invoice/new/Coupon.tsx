import ModalHeader from "@/components/headers/ModalHeader";
import TextLink from "@/components/ui/TextLink";
import { gray } from "@/constants/color-palettes";
import globalStyles from "@/styles/globalStyles";
import modalStyle from "@/styles/modalStyles";
import { useState } from "react";
import { Modal, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  invoiceId: string;
};

export default function InvoiceCouponComponent({ invoiceId }: Props) {
  const [visible, setVisible] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <View>
      <View style={globalStyles.flex_items_center_spaced_between}>
        <Text style={{ fontSize: 16 }}>Coupon</Text>
        <TextLink text="Apply" size={16} onPress={() => setVisible(true)} />
      </View>
      <Text style={{ color: gray[5] }}>No Coupon Applied</Text>

      <Modal
        visible={visible}
        transparent
        statusBarTranslucent
        onRequestClose={() => setVisible(false)}
      >
        <View style={modalStyle.overlay}>
          <View style={modalStyle.container}>
            <ModalHeader
              header="Apply Coupon"
              onPress={() => setVisible(false)}
            />
            <View style={modalStyle.body}>
              <View>
                <Text style={{}}>Enter Coupon Code</Text>
                <TextInput
                  placeholder="Enter Coupon Code"
                  style={{ backgroundColor: gray[1] }}
                  onFocus={() => setFocused(true)}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({});
