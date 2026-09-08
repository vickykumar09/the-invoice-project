import { Alert } from "react-native";
import { supabase } from "../../../libs/api/supabase";
import { FormData } from "@/form/Form";

// Upload Catalog Item Image to AWS S3 bucket
// Download catalog item image from aws S3 and save locally then render

// Fetch All Catalog Items Of The Particular Businesses
export const fetchAllCatalogItems = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("catalog")
      .select("*")
      .eq("business_id", id);
  } catch (error) {}
};

// Fetch Details About a single Catalog Item
export const fetchCatalogItem = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("catalog")
      .select("*")
      .eq("id", id);
    console.log(data, error);

    // Check for error
    if (error) {
      Alert.alert("❌ Error", error.message);
      return;
    }

    // Check for data
    if (!data || data.length === 0) {
      Alert.alert("⚠️ Not Found", "No data found.");
      return;
    }

    Alert.alert("✅ Success");
    return;
  } catch (error) {
    console.log("error", error);
    Alert.alert("🚨 Something Error Occurred");
  }
};

// Add New Item To Catalog
export const addNewProduct = async (formData: FormData) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert([formData])
      .select();

    console.log(data, error);

    // Check for error
    if (error) {
      Alert.alert("❌ Error", error.message);
      return;
    }

    Alert.alert("✅ Success");
    return;
  } catch (error) {
    console.log("error", error);
    Alert.alert("🚨 Something Error Occurred");
  }
};

// Fetch All Stocks Of An Item (Product)
export const fetchStocks = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("item_stock")
      .select("*", { count: "exact" })
      .eq("product_id", id);
    console.log(data, error);

    // Check for error
    if (error) {
      Alert.alert("❌ Error", error.message);
      return;
    }

    // Check for data
    if (!data || data.length === 0) {
      Alert.alert("⚠️ Not Found", "No data found.");
      return;
    }

    Alert.alert("✅ Success");
    // setStocks((prev) => [...prev, ...data]);
    return;
  } catch (error) {
    console.log("error", error);
    Alert.alert("🚨 Something Error Occurred");
  }
};

// Add Stock to A Product
export const addNewStock = async (inputs: any) => {
  try {
    const { data, error } = await supabase
      .from("product_stock")
      .insert([inputs])
      .select();

    console.log(data, error);

    // Check for error
    if (error) {
      Alert.alert("❌ Error", error.message);
      return;
    }

    Alert.alert("✅ Success");
    return;
  } catch (error) {
    console.log("error", error);
    Alert.alert("🚨 Something Error Occurred");
  }
};
