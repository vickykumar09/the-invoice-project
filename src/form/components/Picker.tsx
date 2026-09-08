import ModalHeader from "@/components/headers/ModalHeader";
import IconBtn from "@/components/IconBtn";
import { gray } from "@/constants/color-palettes";
import inputStyles from "@/styles/inputStyles";
import modalStyle from "@/styles/modalStyles";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Option } from "../types";

type Props = {
  label: string;
  value: string;
  options: readonly Option[];
  onSelect: (value: string) => void;
  clearable?: boolean;
};

export default function Picker({
  label,
  value,
  options,
  onSelect,
  clearable,
}: Props) {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const handleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <View style={styles.container}>
        {value ? (
          <Text style={styles.valueTxt}>
            {options.find((option) => option.value === value)?.label ?? ""}
          </Text>
        ) : (
          <Text style={styles.placeholderTxt}>Select {label}</Text>
        )}
        <View style={inputStyles.iconWrapper}>
          <IconBtn
            icon={Feather}
            name="chevron-down"
            size={28}
            onPress={handleModal}
          />
        </View>
      </View>

      {/* Modal - contains options to select from */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        statusBarTranslucent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyle.overlay}>
          <View style={modalStyle.container}>
            <ModalHeader header={`Select ${label}`} onPress={handleModal} />
            {/* Options */}
            <ScrollView style={{ paddingHorizontal: 20 }}>
              {options.map((each) => {
                const { label, value } = each;
                return (
                  <View key={label}>
                    <Text
                      style={styles.itemText}
                      onPress={() => {
                        onSelect(value);
                        handleModal();
                      }}
                    >
                      {label}
                    </Text>
                  </View>
                );
              })}
              <Button
                title="Clear"
                onPress={() => {
                  onSelect("");
                  handleModal();
                }}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: gray[2],
    backgroundColor: gray[0],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  valueTxt: {
    fontSize: 15,
    padding: 12,
  },
  placeholderTxt: {
    fontSize: 15,
    padding: 12,
    color: gray[5],
  },
  optionText: {
    paddingVertical: 14,
    borderBottomWidth: 1.5,
    borderBottomColor: "#eee",
    fontSize: 18,
  },
  itemText: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    fontSize: 16,
  },
});
