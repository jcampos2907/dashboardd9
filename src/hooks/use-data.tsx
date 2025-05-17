import { useEffect } from "react";
import useStore from "./useStore";

export function useData() {
    const { year, indicator, data, updateData } = useStore()

    useEffect(() => {
        fetch("/parsed_data_normalized_log.json")
            .then((response) => response.json())
            .then((jsonData) => updateData(jsonData));
    }, []);


    // const filteredData = data.filter(
    //     (item) => item.Indicator === indicator && (item.Year === year || item.Year === String(parseInt(year) - 1))
    // );

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


    return { currentData: { data: filteredDataCurrent, gdp: gdpDataCurrent }, lastYearData: { data: filteredDataLastYear, gdp: gdpDataLastYear } }
}