import { BreadCrumb } from "@/types/shared";
import { useFocusEffect, useNavigation } from "expo-router";
import { useCallback } from "react";

type Props = {
  segments: BreadCrumb[];
  onGoBackSegment: (prev: BreadCrumb) => void;
};

export function useBreadcrumbBack({ segments, onGoBackSegment }: Props) {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener("beforeRemove", (e) => {
        const action = e.data.action;

        // 1️⃣ Detect header back (allow normal)
        const isHeaderBack = !!action?.source;
        console.log(isHeaderBack);
        if (isHeaderBack) return;

        // 2️⃣ Block hardware/system back
        e.preventDefault();

        // 3️⃣ Pop breadcrumb (your custom logic)
        if (segments.length > 1) {
          const previous = segments[segments.length - 2];
          onGoBackSegment(previous);
          return;
        }

        // 4️⃣ If at root, allow leaving screen normally
        navigation.dispatch(action);
      });

      return unsubscribe;
    }, [navigation, segments, onGoBackSegment]),
  );
}

/**
 * Modified Production Grade Version
 * 
 * import { BreadCrumb } from "@/types/catalog";
import {
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { useCallback } from "react";
import { BackHandler } from "react-native";

type Props = {
  segments: BreadCrumb[];
  onGoBackSegment: (prev: BreadCrumb) => void;
};

export function useBreadcrumbBack({
  segments,
  onGoBackSegment,
}: Props) {
  const navigation = useNavigation();

  const handleBackAction = useCallback(() => {
    if (segments.length > 1) {
      const previous =
        segments[segments.length - 2];

      onGoBackSegment(previous);

      return true; // we handled back
    }

    return false; // allow default behavior
  }, [segments, onGoBackSegment]);

  useFocusEffect(
    useCallback(() => {
      // 🔵 1. Handle Android hardware back
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackAction
      );

      // 🔵 2. Handle navigation back (header / gesture)
      const unsubscribe =
        navigation.addListener(
          "beforeRemove",
          (e) => {
            const action = e.data.action;

            // Only intercept actual back actions
            if (action.type !== "GO_BACK") {
              return;
            }

            const handled =
              handleBackAction();

            if (handled) {
              e.preventDefault();
            }
          }
        );

      return () => {
        backHandler.remove();
        unsubscribe();
      };
    }, [navigation, handleBackAction])
  );
}
 */
