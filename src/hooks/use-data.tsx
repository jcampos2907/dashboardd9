import { data } from "@/data";
import { useMemo } from "react";
import useStore from "./useStore";

export function useData() {
    const indicator = useStore((state) => state.indicator)
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
                acc[year].filteredData.push(item);
            }

            if (isGDP) {
                acc[year].filteredDataGDP.push(item);
            }

            return acc;
        }, {} as Record<string, { filteredData: typeof data; filteredDataGDP: typeof data }>);
    }, [data, indicator]);

    return dataPerYear
}