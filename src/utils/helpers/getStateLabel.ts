/**
 * 
 * @param stateCode 
 * @returns The state label for the given state code if found or returns undefinded;
 */

import { PLACE_OF_SUPPLY } from "@/constants/options/place-of-supply";

export const getStateLabel = (stateCode: string) => {
  const stateLabel = PLACE_OF_SUPPLY.find(
    state => state.value === stateCode
  )?.label;

  return stateLabel;
};
