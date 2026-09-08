// useDisableSystemBack.ts
import { useFocusEffect, useNavigation } from "expo-router";
import { useCallback } from "react";

export function useDisableBack() {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener("beforeRemove", (e) => {
        const action = e.data.action;

        // Header back button always provides a 'source'
        const isHeaderBack = !!action?.source;

        if (isHeaderBack) {
          // Allow default header back behavior
          return;
        }

        // Block hardware/system back button
        e.preventDefault();
      });

      return unsubscribe;
    }, [navigation]),
  );
}
