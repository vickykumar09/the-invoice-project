/**
 * Utility function to check if the device has an active internet connection.
 * Uses Expo's Network API to fetch current network state.
 *
 * Usage: const isConnected = await isConnectedToInternet();
 *
 * Notes:
 *   - Returns `true` if connected or connecting to internet, else `false`.
 *   - Works for one-time checks (e.g. before sync, create, update, delete).
 *   - Not a React Hook, so it can be used anywhere including utilities and services.
 */

import * as Network from "expo-network";

export async function isConnectedToInternet(): Promise<boolean> {
  try {
    const state = await Network.getNetworkStateAsync();
    return state.isInternetReachable ?? false;
  } catch (error) {
    console.warn("Failed to check internet connectivity:", error);
    return false;
  }
}
