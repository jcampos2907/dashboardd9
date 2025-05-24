import { useIndicator } from "@/hooks/use-indicator";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";


export default function IndicatorSelector() {
    const { indicator, updateIndicator } = useIndicator();
    // const [indicator, setIndicator] = useState("Mujeres en el Parlamento (%)");

    return (
        <Tabs defaultValue={indicator} className="w-auto" onValueChange={updateIndicator} value={indicator}>
            <TabsList>
                <TabsTrigger value='Mujeres en el Parlamento (%)'>Mujeres en el Parlamento (%)</TabsTrigger>
                <TabsTrigger value="Mujeres en puestos directivos (%)">Mujeres en puestos directivos (%)</TabsTrigger>
            </TabsList>
            {/* <TabsContent value='Mujeres en el Parlamento (%)'>Mujeres en el Parlamento (%)</TabsContent>
            <TabsContent value="Mujeres en puestos directivos (%)">Mujeres en puestos directivos (%)</TabsContent> */}
        </Tabs>
    )
}