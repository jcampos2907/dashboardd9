import { useMemo } from "react";
import useStore from "./useStore";

export function useData() {
    const { year, indicator, data } = useStore()

    // const filteredData = data.filter(
    //     (item) => item.Indicator === indicator && (item.Year === year || item.Year === String(parseInt(year) - 1))
    // );

    const [filteredDataCurrent, gdpDataCurrent, filteredDataLastYear, gdpDataLastYear] = useMemo(() => {

        const filteredDataCurrent = [...data.filter((item) =>
            item.Year == year && item.Indicator === indicator

        )]
        const gdpDataCurrent = [...data.filter((item) =>
            item.Year == year && item.Indicator === "GDP ($)"
        )]

        const filteredDataLastYear = [...data.filter((item) =>
            item.Year == (year - 1) && item.Indicator === indicator

        )]
        const gdpDataLastYear = [...data.filter((item) =>
            item.Year == (year - 1) && item.Indicator === "GDP ($)"
        )]
        return [filteredDataCurrent, gdpDataCurrent, filteredDataLastYear, gdpDataLastYear]

    }, [data, year, indicator])




    return { currentData: { data: filteredDataCurrent, gdp: gdpDataCurrent }, lastYearData: { data: filteredDataLastYear, gdp: gdpDataLastYear } }
}