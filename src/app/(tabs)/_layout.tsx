import { gray, rose } from "@/constants/color-palettes";
import {
  Feather,
  FontAwesome,
  FontAwesome6,
  Fontisto,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: rose[6],
        tabBarInactiveTintColor: gray[5],
        headerStyle: { backgroundColor: rose[2] },
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
        tabBarLabelStyle: { fontSize: 12, fontFamily: "NunitoBold" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Feather size={22} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="catalog"
        options={{
          headerShown: false,
          title: "Catalog",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={22} name="book" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="invoices"
        options={{
          headerShown: false,
          title: "Invoices",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={22} name="file-invoice" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="customers"
        options={{
          headerShown: false,
          title: "Customers",
          tabBarIcon: ({ color }) => (
            <Fontisto size={22} name="person" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
