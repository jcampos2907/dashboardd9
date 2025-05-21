import { useCountryColors } from "@/hooks/use-countrycolors";
import { useData } from "@/hooks/use-data";
import useStore from "@/hooks/useStore";
import D3Arrow from "./Arrow";

export default function Arrows() {
    const selectedYear = useStore((state) => state.year)
    const dataPerYear = useData()
    const CountryColors = useCountryColors(dataPerYear['2014'].filteredData.map((d) => d["Country Name"]));
    const yScale = useStore((state) => state.yScale)();
    const xScale = useStore((state) => state.xScale)();

    if (!xScale || !yScale) {
        return null;
    }
    return (
        <>
            {Object.keys(dataPerYear).map((year) => {
                const data = dataPerYear[year]
                const lastYearData = dataPerYear[(Number(year) - 1).toString()]
                const { filteredData, filteredDataGDP } = data

                if (selectedYear < parseInt(year)) return null
                return (
                    <>
                        {
                            filteredData.map((dataItem, i) => {
                                const country = dataItem["Country Name"]
                                const gdpValue = filteredDataGDP.find((item) => item["Country Name"] === country);
                                const color = CountryColors[country]
                                const prevYearGdpValue = lastYearData?.filteredDataGDP.find((item) => item["Country Name"] === country);
                                const prevYearData = lastYearData?.filteredData.find((item) => item["Country Name"] === country);
                                if (!prevYearGdpValue || !prevYearData) {
                                    return null
                                }
                                if (dataItem.is_active == false) {
                                    return null
                                }
                                return (
                                    <D3Arrow key={i + 'key_arrow'} x1={xScale(prevYearData.Value)} x2={xScale(dataItem.Value)} y1={yScale(prevYearGdpValue["Value"] ?? 0)} y2={yScale(gdpValue?.["Value"] ?? 0)} color={color} year={year} country={country} />
                                );
                            })
                        }
                    </>

                )
            })}


        </>


    )
}