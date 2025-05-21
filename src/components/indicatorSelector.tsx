import { useIndicator } from "@/hooks/use-indicator";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";


export default function IndicatorSelector() {
    const { indicator, updateIndicator } = useIndicator();
    // const [indicator, setIndicator] = useState("Women in Parliament (%)");

    return (
        <Tabs defaultValue={indicator} className="w-[400px]" onValueChange={updateIndicator} value={indicator}>
            <TabsList>
                <TabsTrigger value='Women in Parliament (%)'>Women in Parliament (%)</TabsTrigger>
                <TabsTrigger value="Women in Managerial Positions (%)">Women in Managerial Positions (%)</TabsTrigger>
            </TabsList>
            {/* <TabsContent value='Women in Parliament (%)'>Women in Parliament (%)</TabsContent>
            <TabsContent value="Women in Managerial Positions (%)">Women in Managerial Positions (%)</TabsContent> */}
        </Tabs>
    )
}