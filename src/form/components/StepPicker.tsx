import IconBtn from "@/components/IconBtn";
import ModalHeader from "@/components/headers/ModalHeader";
import { gray } from "@/constants/color-palettes";
import modalStyle from "@/styles/modalStyles";
import { Feather } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Option } from "../types";

type Props = {
  label: string;
  value: string;
  options: readonly Option[];
  onSelect: (val: string) => void;
};

export default function StepPicker({ label, value, options, onSelect }: Props) {
  const { height } = Dimensions.get("window");
  const [modalVisible, setModalVisible] = useState(false);

  const [visibleOptions, setVisibleOptions] = useState<Option[]>(
    options.filter((cat) => cat.parent_id === null),
  );
  const [path, setPath] = useState<Option[]>([]);
  const [finalSelection, setFinalSelection] = useState<Option | null>(null);
  const [finalPath, setFinalPath] = useState<Option[]>([]);

  const handleSelect = (category: Option) => {
    const subcategories = options.filter(
      (cat) => cat.parent_id === category.id,
    );

    if (subcategories.length > 0) {
      // go deeper
      setPath((prev) => [...prev, category]);
      setVisibleOptions(subcategories);
    } else {
      // final selection
      onSelect(category.value);
      setFinalSelection(category);
      setFinalPath([...path, category]);
      setModalVisible(false);
    }
  };

  const handleBack = () => {
    if (path.length === 0) return;

    const newPath = [...path];
    newPath.pop();

    const parent = newPath[newPath.length - 1];
    const newVisible = parent
      ? options.filter((cat) => cat.parent_id === parent.id)
      : options.filter((cat) => cat.parent_id === null);

    setPath(newPath);
    setVisibleOptions(newVisible);
  };

  const openPicker = () => {
    setPath([]);
    setVisibleOptions(options.filter((cat) => cat.parent_id === null));
    setModalVisible(true);
  };

  const fullPathText = finalPath.map((p) => p.label).join(" › ");

  return (
    <>
      <View style={styles.container}>
        {finalSelection ? (
          <View style={{ padding: 16, paddingVertical: 8, flex: 1 }}>
            <Text style={styles.path}>{finalSelection.label}</Text>
            {finalPath.length !== 1 && (
              <Text
                style={{ color: gray[4], flexShrink: 1 }}
                numberOfLines={1}
                ellipsizeMode="middle"
              >
                {fullPathText}
              </Text>
            )}
          </View>
        ) : (
          <Text style={styles.pathHint} numberOfLines={1} ellipsizeMode="tail">
            Select {label}
          </Text>
        )}
        <View style={styles.iconWrapper}>
          <IconBtn
            icon={Feather}
            name="chevron-down"
            size={28}
            onPress={openPicker}
          />
        </View>
      </View>

      {/* Modal - contains options to select from */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        statusBarTranslucent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyle.overlay}>
          <View style={[modalStyle.container, { height: height * 0.8 }]}>
            {/* Header */}
            <ModalHeader
              header={`Select ${label}`}
              onPress={() => setModalVisible(false)}
            />

            {/* Selected Path */}
            {path.length > 0 && (
              <View style={modalStyle.pathContainer}>
                <TouchableOpacity onPress={handleBack}>
                  <Ionicons
                    name="chevron-back"
                    size={16}
                    style={{ marginTop: 3, marginRight: 8 }}
                    color="#007AFF"
                  />
                </TouchableOpacity>

                <Text style={modalStyle.pathText}>
                  {path.map((p) => p.label).join(" › ")}
                </Text>
              </View>
            )}

            {/* Options */}
            <View style={{ padding: 20 }}>
              <FlatList
                data={visibleOptions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                  const hasChildren = options.some(
                    (cat) => cat.parent_id === item.id,
                  );
                  return (
                    <TouchableOpacity
                      style={styles.item}
                      onPress={() => handleSelect(item)}
                    >
                      <Text style={styles.itemText}>{item.label}</Text>
                      {hasChildren && (
                        <Ionicons
                          name="chevron-forward"
                          size={18}
                          color="#999"
                        />
                      )}
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
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
  path: {
    fontSize: 16,
    color: "#333",
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1.5,
    borderBottomColor: gray[2],
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  iconWrapper: {
    width: 50,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    backgroundColor: gray[1],
    borderLeftWidth: 1.5,
    borderLeftColor: gray[2],
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  pathHint: {
    color: gray[4],
    flexShrink: 1,
    fontSize: 15,
    padding: 12,
  },
  itemText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
  closeText: {
    color: "red",
    fontSize: 16,
  },
});
