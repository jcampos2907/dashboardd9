import { data } from "@/data";
import { useMemo } from "react";
import useStore from "./useStore";

export function useData() {
    const indicator = useStore((state) => state.indicator)
    const selectedCountries = useStore((state) => state.selectedCountries)
    // const data = useStore((state) => state.data)
    const dataPerYear = useMemo(() => {
        return data.reduce((acc, item) => {
            const year = item.Year;
            const isGDP = item.Indicator === 'GDP ($)';
            const isIndicator = item.Indicator === indicator;

            if (!acc[year]) {
                acc[year] = {
                    filteredData: [],
                    filteredDataGDP: []
                };
            }

            if (isIndicator) {
                acc[year].filteredData.push({ ...item, 'is_active': selectedCountries.includes(item["Country Name"]) });
            }

            if (isGDP) {
                acc[year].filteredDataGDP.push({ ...item, 'is_active': selectedCountries.includes(item["Country Name"]) });

            }

            return acc;
        }, {} as Record<string, { filteredData: Array<(typeof data)[number] & { 'is_active': boolean }>; filteredDataGDP: Array<(typeof data)[number] & { 'is_active': boolean }> }>);
    }, [data, indicator, selectedCountries]);

    return dataPerYear
}