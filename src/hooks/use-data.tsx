import { data } from "@/data";
import { useMemo } from "react";
import useStore from "./useStore";

export function useData() {
    const indicator = useStore((state) => state.indicator)
    const selectedCountries = useStore((state) => state.selectedCountries)
    const indicatorRange = useStore((state) => state.indicatorRange)
    const gdpRange = useStore((state) => state.gdpRange)
    // const data = useStore((state) => state.data)
    const dataPerYear = useMemo(() => {
        return data.reduce((acc, item) => {
            const year = item.Year;
            const isGDP = item.Indicator === 'PIB ($)';
            const isIndicator = item.Indicator === indicator;

            if (!acc[year]) {
                acc[year] = {
                    filteredData: [],
                    filteredDataGDP: []
                };
            }

            if (isIndicator) {
                if (indicatorRange.length === 0) {
                    acc[year].filteredData.push({ ...item, 'is_active': selectedCountries.includes(item["Country Name"]) });
                } else {
                    acc[year].filteredData.push({ ...item, 'is_active': selectedCountries.includes(item["Country Name"]) && item.Value >= indicatorRange[0] && item.Value <= indicatorRange[1] });
                }
            }

            if (isGDP) {
                acc[year].filteredDataGDP.push({ ...item, 'is_active': selectedCountries.includes(item["Country Name"]) && item.Value >= gdpRange[0] && item.Value <= gdpRange[1] });

            }

            return acc;
        }, {} as Record<string, { filteredData: Array<(typeof data)[number] & { 'is_active': boolean }>; filteredDataGDP: Array<(typeof data)[number] & { 'is_active': boolean }> }>);
    }, [data, indicator, selectedCountries, indicatorRange, gdpRange]);

    return dataPerYear
}