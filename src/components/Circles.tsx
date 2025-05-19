import { useCountryColors } from "@/hooks/use-countrycolors";
import { useData } from "@/hooks/use-data";
import useStore from "@/hooks/useStore";
import Circle from "./circle";

export default function Circles() {
    const selectedYear = useStore((state) => state.year)
    const dataPerYear = useData()
    const CountryColors = useCountryColors(dataPerYear['2014'].filteredData.map((d) => d["Country Name"]));

    return (
        <>
            {Object.keys(dataPerYear).map((year) => {
                const data = dataPerYear[year]
                const { filteredData, filteredDataGDP } = data

                if (selectedYear < parseInt(year)) return null
                return (
                    <>
                        {
                            filteredData.map((dataItem, i) => {
                                const gdpValue = filteredDataGDP.find((item) => item["Country Name"] === dataItem["Country Name"] && item.Year === dataItem.Year);
                                const color = CountryColors[dataItem["Country Name"]]
                                return (
                                    <Circle
                                        gdpData={gdpValue}
                                        data={dataItem}
                                        key={i + year + 'key_circle'}
                                        color={color}
                                        year={year} />
                                );
                            })
                        }
                    </>

                )
            })}



        </>


    )
}