import { MasterDataProvider } from "@/contexts/MasterDataContext";
import { getDB } from "@/libs/db/database";
import { runMigrations } from "@/libs/db/migrations";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";

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
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </MasterDataProvider>
  );
}
