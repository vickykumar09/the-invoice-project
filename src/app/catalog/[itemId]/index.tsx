import { gray, green, purple, rose } from "@/constants/color-palettes";
import {
  deleteCatalogItem,
  getCatalogItem,
  getCategoryPath,
} from "@/features/catalog/services/sqlite";
import { ViewItem } from "@/features/catalog/types";
import globalStyles from "@/styles/globalStyles";
import { formatDateString } from "@/utils/date-time/format";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import ActionBtn from '@/components/ui/buttons/ActionBtn'
import { confirmDelete } from "@/utils/alerts";
import { fromPaise } from "@/utils/money/convert";

//            Item
//              │
//              ▼
//   Is local image available?
//        /           \
//      YES            NO
//       │              │
//       ▼              ▼
//  Render local    Is remote path available?
//                    /          \
//                  YES           NO
//                   │             │
//                   ▼             ▼
//            Download image    No image
//                   │
//             ┌─────┴─────┐
//             │           │
//           Success      Error
//             │           │
//             ▼           ▼
//       Save locally    Show retry/
//             │         upload action
//             ▼
//        Render local

export default function ItemScreen() {
  const router = useRouter();
  const { width } = Dimensions.get("window");
  const { itemId } = useLocalSearchParams();

  const [data, setData] = useState<ViewItem>();
  const [path, setPath] = useState<string[]>();

  const [imgError, setImgError] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      const dt = await getCatalogItem(itemId as string);
      console.log("dt", dt);
      console.log("category id", dt.category_id);
      const path = await getCategoryPath(dt.categoryId);
      setData(dt);
      setPath(path);
    };

    loadData();
  }, []);

  if (!data) {
    return <ActivityIndicator />;
  }

  const {
    id,
    type,
    category_id,
    category_name,
    image_local_uri,
    image_remote_path,
    item_code,
    bar_code,
    name,
    description,
    measure_unit_id,
    measure_unit_name,
    measure_unit_symbol,
    rate,
    rate_type,
    hsn_sac_code,
    tax_rate,
    cess_type,
    cess_value,
    is_active,
    created_at,
    updated_at,
    is_synced,
  } = data;

  const pageSections = [
    {
      key: "identification",
      title: "Identification",
      section: [
        { title: "Bar Code", value: bar_code ? bar_code : "—" },
        { title: "Internal Code", value: item_code ? item_code : "—" },
      ],
    },
    {
      key: "tax-details",
      title: "Tax Details",
      section: [
        { title: "HSN / SAC Code", value: hsn_sac_code ? hsn_sac_code : "—" },
        {
          title: "Tax Rate",
          value: tax_rate ? `${tax_rate} %` : "Not Specified",
        }, // Only show when tax type is taxable
        { title: "CESS Type", value: cess_type || "Not Specified" },
        { title: "CESS Value", value: cess_value || "—" }, // only show  when cess type is not null
      ],
    },
    {
      key: "other-details",
      title: "Other Details",
      section: [
        { title: "Item Id", value: id },
        {
          title: "Created At",
          value: formatDateString(created_at, true, true),
        },
        {
          title: "Updated At",
          value: formatDateString(updated_at, true, true),
        },
        {
          title: "Sync Status",
          value: Boolean(is_synced) ? "Synced" : "Not Synced",
        },
      ],
    },
  ];

  console.log("path", path);

  // Handling Item Deletion - Only allowed if item isn't used in an invoice
  const handleItemDelete = () => {
    const deleteItem = async () => {
      if (!itemId) {
        Alert.alert("Delete failed", "Item ID is missing.");
        return;
      }

      const result = await deleteCatalogItem(itemId as string);

      if (!result.success) {
        Alert.alert("Delete failed", result.error?.message);
        return;
      }

      Alert.alert("Success", "Item deleted successfully", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    };

    confirmDelete("Item", deleteItem);
  };

  return (
    <>
      <SafeAreaView
        edges={["bottom", "left", "right"]}
        style={globalStyles.safeAreaView}
      >
        <ScrollView
          overScrollMode="never"
          bounces={false}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1, gap: 10 }}>
            <View>
              {/* Item Image */}
              {/* <View style={[styles.imgContainer, {width: width, height: width }]}>
                {!imgError ? (
                  <Image 
                    source={{uri: `${FileSystem.documentDirectory}item-images/${itemId}.jpg`}}
                    onError={() => setImgError(true)} 
                    style={{width: '100%', height: '100%', borderRadius: 0}} 
                  />
                ): (
                  <View style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <FontAwesome name='photo' size={60} color={rose[7]}/>
                    <Text style={{fontSize: 28, color: rose[6], fontWeight:600}}>Image Not Available</Text>
                    <AppCamera
                      itemId={itemId as string}
                      value=''
                      cameraMode='capture'
                    />
                  </View>
                )}
              </View> */}

              {/* Item Name & Description */}
              <View style={[styles.container, { gap: 4 }]}>
                <View style={globalStyles.flex_items_center_spaced_between}>
                  <Text
                    style={{
                      backgroundColor: gray[2],
                      paddingHorizontal: 8,
                      borderRadius: 4,
                      paddingBottom: 4,
                      paddingTop: 2,
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                  >
                    {type}
                  </Text>
                  {Boolean(is_active) ? (
                    <Text
                      style={{
                        fontFamily: "NunitoBold",
                        color: green[7],
                        textAlign: "center",
                        fontSize: 16,
                      }}
                    >
                      Active
                    </Text>
                  ) : (
                    <Text>Inactive</Text>
                  )}
                </View>
                {category_id ? (
                  <Text style={{ fontSize: 15, color: gray[5] }}>
                    {category_name}
                  </Text>
                ) : (
                  <Text style={{ fontSize: 15, color: gray[5] }}>
                    Uncategorized
                  </Text>
                )}
                <View style={{ marginVertical: 16 }}>
                  <Text style={{ fontSize: 18, fontFamily: "NunitoBold" }}>
                    {name}
                  </Text>
                  {description ? (
                    <Text style={{ fontSize: 15, color: gray[5] }}>
                      {description}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 15,
                        color: gray[5],
                        fontStyle: "italic",
                      }}
                    >
                      No description added
                    </Text>
                  )}
                </View>

                <View
                  style={[
                    globalStyles.flex_items_center,
                    { justifyContent: "flex-end", gap: 4 },
                  ]}
                >
                  <Text
                    style={{ fontSize: 15, color: gray[9], fontWeight: 600 }}
                  >
                    Measured In
                  </Text>
                  <Text
                    style={[
                      styles.valueTxt,
                      { color: purple[7], fontWeight: 600 },
                    ]}
                  >
                    {measure_unit_name} ({measure_unit_symbol})
                  </Text>
                </View>
              </View>
            </View>

            {/* Rate */}
            <View style={styles.container}>
              <Text style={styles.sectionHeader}>Rate</Text>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    gap: 4,
                  }}
                >
                  <Text
                    style={{ fontSize: 20, fontWeight: 600, color: rose[8] }}
                  >
                    ₹{fromPaise(rate)}
                  </Text>
                  <Text
                    style={{ color: gray[9], marginBottom: 1, fontWeight: 600 }}
                  >
                    per {measure_unit_symbol}
                  </Text>
                </View>
                <Text style={{ color: gray[4], fontStyle: "italic" }}>
                  {tax_rate === -1
                    ? "Tax exempt"
                    : rate_type === "inclusive"
                      ? "(including applicable taxes)"
                      : "(excluding applicable taxes)"}
                </Text>
              </View>
            </View>

            {/* Identification, Tax Details & Other Details */}
            {pageSections.map((each) => {
              const { key, title, section } = each;
              return (
                <View key={key} style={styles.container}>
                  <Text style={styles.sectionHeader}>{title}</Text>
                  {section.map((each) => {
                    const { title, value } = each;
                    return (
                      <View
                        key={title}
                        style={globalStyles.flex_items_center_spaced_between}
                      >
                        <Text style={styles.titleTxt}>{title}</Text>
                        <Text style={styles.valueTxt}>{value}</Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}

            {/* Delete Item Btn */}
            {/* <View style={styles.container}>
              <ActionBtn
                variant='filled'
                iconName={'delete'}
                btnLabel={'Delete Item'}
                rippleColor={red[6]}
                color={red[6]}
                onPress={handleItemDelete}
              />
            </View> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    padding: 0,
    backgroundColor: rose[0],
  },
  container: {
    gap: 12,
    padding: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: gray[1],
    backgroundColor: "white",
  },
  sectionHeader: {
    fontSize: 20,
    fontFamily: "RajdhaniBold",
    borderBottomWidth: 2,
    borderBottomColor: gray[1],
  },
  titleTxt: {
    fontSize: 15,
    color: gray[5],
  },
  valueTxt: {
    fontSize: 15,
  },
});
