import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useIndicator } from "@/hooks/use-indicator";

export default function IndicatorSelector() {
    const { indicator, updateIndicator } = useIndicator();
    // const [indicator, setIndicator] = useState("Women in Parliament (%)");

    return (
        <Select onValueChange={updateIndicator} value={indicator}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Indicator" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Women in Parliament (%)">Women in Parliament (%)</SelectItem>
                <SelectItem value="Women in Managerial Positions (%)">Women in Managerial Positions (%)</SelectItem>
            </SelectContent>
        </Select>
    )
}