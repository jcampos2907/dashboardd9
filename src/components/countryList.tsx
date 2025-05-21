import { useData } from "@/hooks/use-data";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";

export default function CountryList() {
    const dataPerYear = useData()
    const sampleData = dataPerYear[Object.keys(dataPerYear)[0]]
    const [searchValue, setSearchValue] = useState('')
    const [selectedCountries, setSelectedCountries] = useState<string[]>([])
    const filteredData = sampleData.filteredData.filter((item) => item["Country Name"].toLowerCase().includes(searchValue.toLowerCase()))
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
                <Checkbox
                    id={`selectall-checkbox`}
                    checked={selectedCountries.length === filteredData.length}
                    onCheckedChange={(checked) => {
                        return checked
                            ? setSelectedCountries(filteredData.map((item) => item["Country Name"]))
                            : setSelectedCountries(
                                []
                            )
                    }}
                />
                <label
                    htmlFor={`selectall-checkbox`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Paises
                </label>
            </div>
            {/* <Input placeholder="Buscar pais" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} /> */}


            <ScrollArea className="h-[25vh] w-full rounded-sm px-4">
                <div className="flex flex-col gap-2">
                    {filteredData.map((item) => {
                        return (
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id={`${item["Country Name"]}-checkbox`}
                                    checked={selectedCountries.includes(item["Country Name"])}
                                    onCheckedChange={(checked) => {
                                        return checked
                                            ? setSelectedCountries([...selectedCountries, item["Country Name"]])
                                            : setSelectedCountries(
                                                selectedCountries.filter(
                                                    (value) => value !== item["Country Name"]
                                                )
                                            )
                                    }}
                                />
                                <label
                                    htmlFor={`${item["Country Name"]}-checkbox`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {item["Country Name"]}
                                </label>
                            </div>
                        )
                    })}
                </div>
            </ScrollArea>
        </div>
    )

}