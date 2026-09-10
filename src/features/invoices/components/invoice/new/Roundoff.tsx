import ModalHeader from "@/components/headers/ModalHeader";
import ActionBtn from "@/components/ui/buttons/ActionBtn";
import TextLink from "@/components/ui/TextLink";
import { blue, gray, green, red, rose } from "@/constants/color-palettes";
import { ROUND_OFF_MODES } from "@/features/invoices/constants/options/round-off-modes";
import { updateInvoiceRoundOff } from "@/features/invoices/services/sqlite/adjustments";
import {
  InvoiceRoundOff,
  InvoiceRoundOffMode,
} from "@/features/invoices/types/invoice";
import { calculateInvoiceRoundOff } from "@/features/invoices/utils/calculators/invoiceRoundOff";
import SegmentedSelector from "@/form/components/Selector";
import { useModal } from "@/hooks/useModal";
import globalStyles from "@/styles/globalStyles";
import modalStyle from "@/styles/modalStyles";
import { getRoundOffSign } from "@/utils/helpers/getRoundOffSign";
import { fromPaise } from "@/utils/money/convert";
import { formatCurrency } from "@/utils/money/format";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

type Props = {
  invoiceId: string;
  initialData: InvoiceRoundOff;
  preRoundOffTotalInPaise: number;
  onChange: () => Promise<void>;
};

export default function InvoiceRoundOffComponent({
  invoiceId,
  initialData,
  preRoundOffTotalInPaise,
  onChange,
}: Props) {
  const { visible, openModal, closeModal } = useModal();

  const { round_off_mode, round_off_amount } = initialData;

  const [mode, setMode] = useState<InvoiceRoundOffMode>(round_off_mode);

  const [roundOffAmount, setRoundOffAmount] = useState<number>(0);
  const [roundedOffTo, setRoundedOffTo] = useState<number>(0);

  useEffect(() => {
    const { grandTotalPaise, roundOffAmountPaise } = calculateInvoiceRoundOff(
      preRoundOffTotalInPaise,
      mode,
    );
    setRoundedOffTo(grandTotalPaise);
    setRoundOffAmount(roundOffAmountPaise);
  }, [mode]);

  // Handle Update to Invoice Round Off
  const handleUpdate = async () => {
    if (mode !== round_off_mode) {
      await updateInvoiceRoundOff(invoiceId, mode);
      await onChange();
    }
    closeModal();
  };

  const showClearBtn = initialData.round_off_mode;
  return (
    <View>
      {/* Label & Value */}
      <View style={globalStyles.flex_items_center_spaced_between}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600"
          }}
        >
          Roundoff
        </Text>
        <TextLink text="Apply" size={16} onPress={openModal} />
      </View>

      <View style={globalStyles.flex_items_center}>
        <Text style={{ color: gray[5], textTransform: "capitalize" }}>
          {round_off_mode}
        </Text>
        <FontAwesome
          name="circle"
          size={5}
          color={gray[6]}
          style={{ marginTop: 4 }}
        />
        <Text style={{ color: gray[5] }}>
          {getRoundOffSign(round_off_mode)}
          {formatCurrency(fromPaise(round_off_amount))}
        </Text>
      </View>

      {/* Modal - To set invoice discount value */}
      <Modal visible={visible} transparent statusBarTranslucent>
        <View style={modalStyle.overlay}>
          <View style={modalStyle.container}>
            <ModalHeader header="Round Off" onPress={closeModal} />

            <View style={modalStyle.body}>
              <View style={{ gap: 12 }}>
                <SegmentedSelector
                  options={ROUND_OFF_MODES}
                  value={mode}
                  onChange={(value) => setMode(value as InvoiceRoundOffMode)}
                />
                <View style={globalStyles.flex_items_center_spaced_between}>
                  <Text style={{ fontSize: 15, color: gray[5] }}>
                    Round Off Amount
                  </Text>
                  <Text>
                    {getRoundOffSign(mode)}
                    {formatCurrency(fromPaise(roundOffAmount))}
                  </Text>
                </View>

                <View style={globalStyles.flex_items_center_spaced_between}>
                  <Text style={{ fontSize: 15, color: gray[5] }}>
                    Rounded Off 
                  </Text>
                  <Text>{formatCurrency(fromPaise(roundedOffTo))}</Text>
                </View>
              <Text>fsadfd</Text>
              </View>

              <View style={[styles.footerContainer, { justifyContent: showClearBtn ? "space-between" : "center" }]}>
                {!showClearBtn &&
                  <TextLink
                    text="Clear"
                    size={18}
                    color={red[6]}
                    onPress={() => {
                      const dt = {
                        round_off_mode: '',
                        round_off_amoutn: ''
                      }
        
                      handleUpdate()
                    }}
                  />
                }
                <Text style={styles.btn} onPress={handleUpdate}>
                  Apply
                </Text>
              </View>

              <ActionBtn
                iconName="file-plus"
                btnLabel="Apply"
                rippleColor={blue[1]}
                color={rose[7]}
                onPress={handleUpdate}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: green[0],
    borderWidth: 1.5,
    borderColor: green[9],
    fontFamily: "NunitoExtraBold",
    color: green[9],
    paddingHorizontal: 20,
    paddingBottom: 8,
    fontSize: 15,
    paddingVertical: 6,
    borderRadius: 99,
  },
  footerContainer: {
    paddingBottom: 20,
    paddingTop: 8,
    paddingHorizontal: 32, 
    flexDirection: 'row',
    alignItems: 'center',
  }
});
