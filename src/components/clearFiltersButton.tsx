import { useData } from "@/hooks/use-data";
import useStore from "@/hooks/useStore";
import { FilterXIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function ClearFiltersButton() {
    const clearFilters = useStore((state) => state.clearFilters);
    const [dataPerYear, minVal, maxVal] = useData()
    return (
        <Button variant="outline" size={"icon"} onClick={() => clearFilters([minVal, maxVal])}>
            <FilterXIcon />
        </Button>
    )
}