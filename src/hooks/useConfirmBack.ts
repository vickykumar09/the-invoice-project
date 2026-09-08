import { useFocusEffect, useNavigation } from "expo-router";
import { useCallback } from "react";
import { Alert } from "react-native";

// REMEMBER To Remove Console Logs
// Gets Triggered on Refresh Also -- To Solve
export function useConfirmBack() {
  const navigation = useNavigation();
  console.log("[useConfirmBack] hook called");

  useFocusEffect(
    useCallback(() => {
      console.log("[useConfirmBack] Screen focused - setting back handler");

      const unsubscribe = navigation.addListener("beforeRemove", (e) => {
        console.log("[useConfirmBack] Back action detected");
        const type = e.data.action.type;

        // Only block back actions (not forward navigations)
        if (type !== "GO_BACK" && type !== "POP") {
          console.log("Not Back");
          return;
        }

        // Block Default Behaviour
        e.preventDefault();

        Alert.alert(
          "Go Back?",
          "Your entered details will be lost if you go back. Are you sure you want to go back?",
          [
            { text: "Stay", style: "cancel" },
            {
              text: "Leave",
              onPress: () => navigation.dispatch(e.data.action),
            },
          ],
        );
      });

      return () => {
        console.log("[useConfirmBack] Screen unfocused - cleanup back handler");
        unsubscribe();
      };
      //return unsubscribe;
    }, [navigation]),
  );
}
