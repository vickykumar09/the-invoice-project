import React, { useEffect, useRef } from "react";
import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BreadCrumb } from "@/types/shared";

type Props = {
  segments: BreadCrumb[];
  onPress: (index: number, id: number) => void;
}

export default function Breadcrumb({ segments, onPress }: Props) {
  const scrollRef = useRef<ScrollView>(null);

  // Auto-scroll to the rightmost end when segments update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true });
    }
  }, [segments]);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      overScrollMode="never"
      contentContainerStyle={styles.container}
    >
      {segments.map((item, index) => {
        const { id, label } = item
        const isFirst = index === 0
        const isLast = index === segments.length - 1;

        return (
          <View key={label} style={styles.segmentWrapper}>
            <Pressable disabled={isLast} onPress={() => onPress(index, id)}>
              <Text style={[styles.text, isLast && styles.activeText, isFirst && {paddingLeft: 20}]}>
                {label} category is here  
              </Text>
            </Pressable>

            {!isLast && (
              <MaterialIcons
                name="chevron-right"
                size={18}
                color="#999"
                style={styles.icon}
              />
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 4,
  },
  segmentWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#777",
  },
  activeText: {
    color: "#FF7A00",
    fontWeight: "600",
    paddingRight: 20,
  },
  icon: {
    marginHorizontal: 2,
  },
});
