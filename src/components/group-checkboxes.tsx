import { data } from "@/data";
import useStore from "@/hooks/useStore";
import { useMemo } from "react";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";

export default function GroupCheckboxes() {

    const selectedCountries = useStore((state) => state.selectedCountries)
    const setSelectedCountries = useStore((state) => state.setSelectedCountries)

    const groupA = useMemo(() => {
        return Array.from(new Set(data.filter((item) => item.Group === 'A').map((item) => item['Country Name'])))
    }, [])
    const groupB = useMemo(() => {
        return Array.from(new Set(data.filter((item) => item.Group === 'B').map((item) => item['Country Name'])))
    }, [])

    const isGroupASelected = useMemo(() => {
        return groupA.every((item) => selectedCountries.includes(item))
    }, [selectedCountries, groupA])
    const isGroupBSelected = useMemo(() => {
        return groupB.every((item) => selectedCountries.includes(item))
    }, [selectedCountries, groupB])



    return (

        <>
            <div className="flex items-center space-x-2">
                <Checkbox checked={isGroupASelected} defaultChecked={isGroupASelected} id="terms2" value={'A'} onCheckedChange={(checked) => {
                    return checked ?
                        setSelectedCountries([...selectedCountries, ...groupA])
                        :
                        setSelectedCountries(
                            selectedCountries.filter((value) => !groupA.includes(value))
                        )
                }} />
                <label
                    htmlFor="terms2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Países de alto y mediano ingreso
                </label>
            </div>
            <Separator className="w-full my-4" />
            <div className="flex items-center space-x-2">
                <Checkbox checked={isGroupBSelected} defaultChecked={isGroupBSelected} id="terms2" value={'A'} onCheckedChange={(checked) => {
                    return checked ?
                        setSelectedCountries([...selectedCountries, ...groupB])
                        :
                        setSelectedCountries(
                            selectedCountries.filter((value) => !groupB.includes(value))
                        )
                }} />
                <label
                    htmlFor="terms22"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Países de mediano y bajo ingreso
                </label>
            </div>
        </>
    )
}