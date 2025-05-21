import { data } from "@/data";
import { useData } from "@/hooks/use-data";
import useStore from "@/hooks/useStore";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";

export default function CountryList() {
    const countries = Array.from(new Set(data.map((item) => item["Country Name"])))
    const selectedCountries = useStore((state) => state.selectedCountries)
    const setSelectedCountries = useStore((state) => state.setSelectedCountries)
    const dataPerYear = useData();
    const year = useStore((state) => state.year)
    const filteredData = dataPerYear[year]?.filteredData ?? []
    const filteredDataGDP = dataPerYear[year]?.filteredDataGDP ?? []
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
                <Checkbox
                    id={`selectall-checkbox`}
                    disabled={filteredData.filter((item) => !item.is_active).length > 0 || filteredDataGDP.filter((item) => !item.is_active).length > 0}
                    checked={selectedCountries.length === countries.length && !filteredData.filter((item) => !item.is_active).length && !filteredDataGDP.filter((item) => !item.is_active).length}
                    onCheckedChange={(checked) => {
                        return checked
                            ? setSelectedCountries(countries)
                            : setSelectedCountries(
                                []
                            )
                    }}
                />
                <label
                    htmlFor={`selectall-checkbox`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Todos los paises
                </label>
            </div>
            {/* <Input placeholder="Buscar pais" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} /> */}


            <ScrollArea className="h-[25vh] w-full rounded-sm px-4">
                <div className="flex flex-col gap-2">
                    {countries.map((item) => {
                        const isActive = filteredData.find((data) => data["Country Name"] === item)?.is_active
                        const isActiveGDP = filteredDataGDP.find((data) => data["Country Name"] === item)?.is_active
                        return (
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id={`${item}-checkbox`}
                                    disabled={!isActive || !isActiveGDP}
                                    checked={selectedCountries.includes(item) && isActive && isActiveGDP}
                                    onCheckedChange={(checked) => {
                                        return checked
                                            ? setSelectedCountries([...selectedCountries, item])
                                            : setSelectedCountries(
                                                selectedCountries.filter(
                                                    (value) => value !== item
                                                )
                                            )
                                    }}
                                />
                                <label
                                    htmlFor={`${item}-checkbox`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {item}
                                </label>
                            </div>
                        )
                    })}
                </div>
            </ScrollArea>
        </div>
    )

}