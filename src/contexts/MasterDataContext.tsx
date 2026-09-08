import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getMeasureUnitPickerOptions,
  getPlaceOfSupplyPickerOptions,
  getTaxRatePickerOptions,
} from "@/features/masters/services/sqlite";
import { Option } from "@/form/types";

export type MasterDataContextValue = {
  measureUnitOptions: Option[];
  placeOfSupplyOptions: Option[];
  taxRateOptions: Option[];
};

// Master Data Context
const MasterDataContext = createContext<MasterDataContextValue | null>(null);

// Master Data Provider
export function MasterDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [measureUnitOptions, setMeasureUnitOptions] = useState<Option[]>([]);
  const [placeOfSupplyOptions, setPlaceOfSupplyOptions] = useState<Option[]>(
    [],
  );
  const [taxRateOptions, setTaxRateOptions] = useState<Option[]>([]);

  const [measureUnitLoaded, setMeasureUnitLoaded] = useState(false);
  const [placeOfSupplyLoaded, setPlaceOfSupplyLoaded] = useState(false);
  const [taxRateLoaded, setTaxRateLoaded] = useState(false);

  const loadMeasureUnitData = useCallback(async () => {
    if (measureUnitLoaded) return;

    const options = await getMeasureUnitPickerOptions();

    setMeasureUnitOptions(options);
    setMeasureUnitLoaded(true);
  }, [measureUnitLoaded]);

  const loadPlaceOfSupplyData = useCallback(async () => {
    if (placeOfSupplyLoaded) return;

    const options = await getPlaceOfSupplyPickerOptions();

    setPlaceOfSupplyOptions(options);
    setPlaceOfSupplyLoaded(true);
  }, [placeOfSupplyLoaded]);

  const loadTaxRateData = useCallback(async () => {
    if (taxRateLoaded) return;

    const options = await getTaxRatePickerOptions();

    setTaxRateOptions(options);
    setTaxRateLoaded(true);
  }, [taxRateLoaded]);

  useEffect(() => {
    loadMeasureUnitData();
    loadPlaceOfSupplyData();
    loadTaxRateData();
  }, [loadMeasureUnitData, loadPlaceOfSupplyData, loadTaxRateData]);

  return (
    <MasterDataContext.Provider
      value={{
        measureUnitOptions,
        placeOfSupplyOptions,
        taxRateOptions,
      }}
    >
      {children}
    </MasterDataContext.Provider>
  );
}

// Use Master Data Hook
export function useMasterData() {
  const context = useContext(MasterDataContext);

  if (!context) {
    throw new Error("useMasterData must be used within MasterDataProvider");
  }

  return context;
}
