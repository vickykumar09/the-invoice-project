import { MasterDataProvider } from "@/contexts/MasterDataContext";
import { getDB } from "@/libs/db/database";
import { runMigrations } from "@/libs/db/migrations";
import { useFonts } from "expo-font";
import {
  DarkTheme,
  DefaultTheme,
  SplashScreen,
  Stack,
  ThemeProvider,
} from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Prevent Splash Screen from hiding automtically
SplashScreen.preventAutoHideAsync();

function Layout() {
  // const { session } = useAuthContext()
  // console.log('session', session)

  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    NunitoBold: require("@/assets/fonts/Nunito-Bold.ttf"),
    NunitoExtraBold: require("@/assets/fonts/Nunito-ExtraBold.ttf"),
    RajdhaniBold: require("@/assets/fonts/Rajdhani-Bold.ttf"),
    RajdhaniSemiBold: require("@/assets/fonts/Rajdhani-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initializeApp = async () => {
      try {
        const db = await getDB();
        await runMigrations(db);

        if (mounted) {
          setIsReady(true);
        }
      } catch (error) {
        console.error("[App] Initialization failed:", error);
      }
    };

    initializeApp();

    return () => {
      mounted = false;
    };
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <MasterDataProvider>
      <Layout />
    </MasterDataProvider>
  );
}

// import { MasterDataProvider } from "@/contexts/MasterDataContext";
// import { getDB } from "@/libs/db/database";
// import { runMigrations } from "@/libs/db/migrations";
// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
// import { SplashScreen, Stack } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import { useEffect, useState } from "react";
// import { useColorScheme } from "react-native";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { useFonts } from "expo-font";

// Prevent Expo Router from hiding the splash screen automatically.
// SplashScreen.preventAutoHideAsync().catch(() => {
//   // Splash screen may already be prevented from hiding.
// });

// function Layout() {
//   const colorScheme = useColorScheme();

//   const [fontsLoaded] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//     Norwester: require("../assets/fonts/norwester.otf"),
//     NunitoExtraBold: require("../assets/fonts/Nunito-ExtraBold.ttf"),
//     NunitoBold: require("../assets/fonts/Nunito-Bold.ttf"),
//     RajdhaniBold: require("../assets/fonts/Rajdhani-Bold.ttf"),
//     RajdhaniSemiBold: require("../assets/fonts/Rajdhani-SemiBold.ttf"),
//   });

//   useEffect(() => {
//     if (!fontsLoaded) return;

//     SplashScreen.hideAsync().catch((error) => {
//       console.error("[App] Failed to hide splash screen:", error);
//     });
//   }, [fontsLoaded]);

//   if (!fontsLoaded) {
//     return null;
//   }

//   return (
//     <SafeAreaProvider>
//       <ThemeProvider
//         value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
//       >
//         <Stack screenOptions={{ headerShown: false }}>
//           {/* Protected Routes */}
//           <Stack.Protected guard={!!session}>
//             <Stack.Screen name="(tabs)" />
//             <Stack.Screen
//               name="account"
//               options={{ animation: "slide_from_right" }}
//             />
//             <Stack.Screen name="catalog" />
//             <Stack.Screen name="invoices" />
//             <Stack.Screen
//               name="menu"
//               options={{ animation: "slide_from_left" }}
//             />
//           </Stack.Protected>

//           {/* Public Routes */}
//           <Stack.Screen name="(auth)/sign-in" />
//           <Stack.Screen name="+not-found" />
//         </Stack>

//         <StatusBar style="auto" />
//       </ThemeProvider>
//     </SafeAreaProvider>
//   );
// }

// export default function RootLayout() {
//   const [isInitialized, setIsInitialized] = useState(false);
//   const [initializationError, setInitializationError] = useState<Error | null>(null);

//   useEffect(() => {
//     let cancelled = false;

//     async function initializeApp() {
//       try {
//         const db = await getDB();

//         await runMigrations(db);

//         if (!cancelled) {
//           setIsInitialized(true);
//         }
//       } catch (error) {
//         console.error("[App] Initialization failed:", error);

//         if (!cancelled) {
//           setInitializationError(
//             error instanceof Error
//               ? error
//               : new Error("Failed to initialize application"),
//           );
//         }
//       }
//     }

//     initializeApp();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   if (initializationError) {
//     // Replace this with your production error screen.
//     return null;
//   }

//   if (!isInitialized) {
//     return null;
//   }

//   return (
//     <MasterDataProvider>
//       <Layout />
//     </MasterDataProvider>
//   );
// }
