import { useYear } from "@/hooks/use-year";
import { Slider } from "./ui/slider";

export default function YearSelector() {
    const { year, updateYear } = useYear();
    // const [indicator, setIndicator] = useState("Women in Parliament (%)");

    return (
        <Slider defaultValue={[year]} min={2012} max={2022} step={1} onValueChange={(e) => updateYear(e[0])} />
    )
}