// features/masters/utils/picker-options.ts

import { Option } from "@/form/types";
import { getPlacesOfSupply, PlaceOfSupply } from "../services/sqlite";

export async function getPlaceOfSupplyOptions(): Promise<Option[]> {
  const places = await getPlacesOfSupply();

  return places.map((place) => ({
    id: Number(place.code),
    label: place.name,
    value: place.code,
  }));
}

export function getPlaceOfSupplyValues(places: PlaceOfSupply[]): string[] {
  return places.map((place) => place.code);
}
