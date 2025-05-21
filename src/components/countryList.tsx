import { data } from "@/data";
import useStore from "@/hooks/useStore";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";

export default function CountryList() {
    const countries = Array.from(new Set(data.map((item) => item["Country Name"])))
    const selectedCountries = useStore((state) => state.selectedCountries)
    const setSelectedCountries = useStore((state) => state.setSelectedCountries)
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
                <Checkbox
                    id={`selectall-checkbox`}
                    checked={selectedCountries.length === countries.length}
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
                        return (
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id={`${item}-checkbox`}
                                    checked={selectedCountries.includes(item)}
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