import { MARGIN } from "@/constants";
import { data } from "@/data";
import { useCountryColors } from "@/hooks/use-countrycolors";
import { useData } from "@/hooks/use-data";
import useStore from "@/hooks/useStore";
import { scaleLinear } from "d3";
import { useState } from "react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

export default function CountryList() {
    const { currentData } = useData()
    const [searchValue, setSearchValue] = useState('')
    const { setInteractionData, dimensions } = useStore()
    const CountryColors = useCountryColors(currentData.data.map((d) => d["Country Name"]));
    const { width, height } = dimensions
    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;
    const yScale = scaleLinear().domain([Math.min(...data.filter(item => item.Indicator == 'GDP ($)').map(v => v["Log Value"])) - 0.5, Math.max(...data.filter(item => item.Indicator == 'GDP ($)').map(v => v["Log Value"])) + 0.5]).range([boundsHeight, 0]);
    const xScale = scaleLinear().domain([Math.min(...data.filter(item => item.Indicator != 'GDP ($)').map(v => v["Value"])) - 1, Math.max(...data.filter(item => item.Indicator != 'GDP ($)').map(v => v["Value"])) + 1]).range([0, boundsWidth]);
    const filteredData = currentData.data.filter((item) => item["Country Name"].toLowerCase().includes(searchValue.toLowerCase()))
    return (
        <div className="flex flex-col gap-2">
            <Input placeholder="Buscar pais" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <ScrollArea className="h-[50vh] w-full rounded-sm border p-4">
                <div className="flex flex-col gap-2 py-4">
                    {filteredData.map((item) => {
                        const gdpValue = currentData.gdp.find((gdpItem) => gdpItem["Country Name"] === item["Country Name"]);
                        const color = CountryColors[item["Country Name"]]
                        return (
                            <div
                                onMouseEnter={() => // Each time the circle is hovered hover...
                                    setInteractionData({ // ... update the interactionData state with the circle information
                                        xPos: xScale(item.Value),
                                        yPos: yScale(gdpValue?.["Log Value"] ?? 0),
                                        gdp: gdpValue?.["Value"] ?? 0,
                                        color,
                                        ...item
                                    })
                                }
                                onMouseLeave={() => setInteractionData(null)} // ... and remove the interactionData when the mouse leaves
                                className="cursor-pointer text-sm text-gray-700 hover:text-gray-900"
                                key={item["Country Name"]}>
                                <div className='border-l-4 pl-2 pt-0 mb-2' style={{ borderColor: color }}>
                                    <b className='text-md'>{item["Country Name"]}</b>
                                </div>
                            </div>

                        )
                    })}
                </div>
            </ScrollArea>
        </div>
    )

}