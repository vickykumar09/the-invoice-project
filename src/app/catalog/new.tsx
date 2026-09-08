import PageMessage from "@/components/common/PageMessage";
import ActionBtn from "@/components/ui/buttons/ActionBtn";
import { gray, rose } from "@/constants/color-palettes";
import {
  ITEM_FORM_FIELDS,
  ITEM_TAX_FORM_FIELDS,
} from "@/features/catalog/constants/form-fields/item";

import { INITIAL_ITEM_STATE } from "@/features/catalog/constants/initial-states/item";
import { itemFieldRenderer } from "@/features/catalog/constants/ItemFormRenderer";
import { createCatalogItem } from "@/features/catalog/services/sqlite";
import { ItemForm } from "@/features/catalog/types";
import { toItemInsert } from "@/features/catalog/utils/mappers";
import Form from "@/form/Form";
import {
  FormController,
  FormErrors,
  FormSection,
  FormValues,
} from "@/form/types";
import { validateForm } from "@/form/validators/form";
import globalStyles from "@/styles/globalStyles";
import { showSuccess } from "@/utils/alerts";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewCatalogItemScreen() {
  const router = useRouter();

  // Form Sections
  const formSections: FormSection<ItemForm>[] = [
    { title: "Basic Details", fields: ITEM_FORM_FIELDS },
    { title: "Tax Details", fields: ITEM_TAX_FORM_FIELDS },
  ];

  // Handle Item Addition
  const handleAddItem = async (
    data: FormValues<ItemForm>,
    setErrors: React.Dispatch<React.SetStateAction<FormErrors<ItemForm>>>,
  ) => {
    const ITEM_FIELDS = [...ITEM_FORM_FIELDS, ...ITEM_TAX_FORM_FIELDS];

    // 1. Validate form values
    const formErrors = validateForm<ItemForm>(data, ITEM_FIELDS);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // 2. Convert form values to database insert values
    const insertData = toItemInsert(data);
    console.log("insertData", insertData);

    // 3. Send database-ready data to SQLite
    try {
      const res = await createCatalogItem(insertData);
      if (!res.success) {
        if (res.error.code === "VALIDATION_ERROR") {
          setErrors(res.error.fields ?? {});
        }

        Alert.alert(res.error.message);
        return;
      }

      showSuccess("Item created successfully.", () =>
        router.replace(`/catalog/${res.data.id}`),
      );
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Unexpected Error",
        "Something went wrong. Please try again.",
      );
    }
  };

  // Render Footer
  const renderFooter = ({ data, setErrors }: FormController<ItemForm>) => {
    return (
      <View style={{ paddingHorizontal: 32, paddingVertical: 20 }}>
        <ActionBtn
          variant="filled"
          iconName="plus"
          btnLabel="Add Item"
          rippleColor={rose[0]}
          color={rose[8]}
          onPress={() => handleAddItem(data, setErrors)}
        />
      </View>
    );
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
          <View style={styles.container}>
            <PageMessage
              message="Add the details below to create a new item in your catalog."
              withQuotes={true}
            />

            <Form<ItemForm>
              sections={formSections}
              initialData={INITIAL_ITEM_STATE}
              fieldRenderer={itemFieldRenderer}
              renderFooter={renderFooter}
            />

            {/* Form Guidelines */}
            {/* <View style={styles.section}>
              <ImportantPoints
                header='Guidelines'
                points={[
                  "Select the type that best describes your item.",
                  "Enter a clear name for the item, using 2-120 characters.",
                  "Add a short description of the item, using up to 500 characters.",
                  "Select the unit used to measure this item.",
                  "Select the rate type only if you know it. Otherwise, leave the field unselected.",
                  "Select the tax rate if you know it. Otherwise, leave the field unselected.",
                  "Select the cess type if you know it. Otherwise, leave it unselected."
                ]}
              />
            </View> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
  },
  section: {
    gap: 20,
    padding: 20,
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: gray[1],
    backgroundColor: "white",
  },
  formWrapper: {
    paddingHorizontal: 12,
  },
});
